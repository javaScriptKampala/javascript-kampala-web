import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import {Resend} from 'resend';
import {CONTACT_EMAIL, SOCIAL_URLS} from './src/constants';

const DEFAULT_FROM_EMAIL =
  'JavaScript Kampala <noreply@mail.javascriptkampala.org>';

/** Default CC when `RESEND_CC_EMAILS` is not set (comma-separated). */
const DEFAULT_CC_EMAILS = [
  'javascriptkampala@gmail.com',
  'kayondoedward13@gmail.com',
  'pujeremy27@gmail.com',
  'mukisageofrey@koodeyo.com',
];

function parseCcList(raw: string | undefined): string[] {
  if (!raw?.trim()) {
    return [...DEFAULT_CC_EMAILS];
  }
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function socialLinksBlock(): string {
  return [
    'Find us online:',
    `X: ${SOCIAL_URLS.twitter}`,
    `LinkedIn: ${SOCIAL_URLS.linkedin}`,
    `GitHub: ${SOCIAL_URLS.github}`,
    `YouTube: ${SOCIAL_URLS.youtube}`,
    `Email: ${CONTACT_EMAIL}`,
  ].join('\n');
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'resend-contact-api',
        configureServer(server) {
          server.middlewares.use('/api/contact', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({error: 'Method not allowed'}));
              return;
            }

            try {
              const chunks: Buffer[] = [];
              for await (const chunk of req) {
                chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
              }
              const body = JSON.parse(Buffer.concat(chunks).toString('utf8')) as {
                type?: 'speaker' | 'sponsor';
                payload?: Record<string, string>;
              };

              const apiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
              const toEmail = env.RESEND_TO_EMAIL || process.env.RESEND_TO_EMAIL;
              const fromEmail =
                env.RESEND_FROM_EMAIL ||
                process.env.RESEND_FROM_EMAIL ||
                DEFAULT_FROM_EMAIL;

              const ccRaw =
                env.RESEND_CC_EMAILS || process.env.RESEND_CC_EMAILS;
              const ccList = parseCcList(ccRaw);
              const toLower = (e: string) => e.toLowerCase();
              const cc = ccList.filter((addr) => toLower(addr) !== toLower(toEmail || ''));

              if (!apiKey || !toEmail) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({error: 'Resend is not configured'}));
                return;
              }

              const payload = body.payload || {};
              const submitterEmail =
                typeof payload.email === 'string' ? payload.email.trim() : '';
              if (!submitterEmail) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({error: 'Missing email in submission'}));
                return;
              }

              const resend = new Resend(apiKey);
              const typeLabel =
                body.type === 'sponsor' ? 'Sponsor Inquiry' : 'Speaker Proposal';
              const lines = Object.entries(payload).map(
                ([key, value]) => `${key}: ${value}`,
              );
              const teamBody = [lines.join('\n'), '', socialLinksBlock()].join(
                '\n',
              );

              await resend.emails.send({
                from: fromEmail,
                to: [toEmail],
                cc: cc.length > 0 ? cc : undefined,
                subject: `[${typeLabel}] JavaScript Kampala Website`,
                replyTo: submitterEmail,
                text: teamBody,
              });

              const isSponsor = body.type === 'sponsor';
              const confirmationSubject = isSponsor
                ? 'We received your sponsor inquiry — JavaScript Kampala'
                : 'We received your speaker proposal — JavaScript Kampala';
              const kind = isSponsor ? 'sponsorship inquiry' : 'speaker proposal';
              const confirmationText = [
                'Hi,',
                '',
                `Thanks for contacting JavaScript Kampala. We've received your ${kind} and will get back to you shortly.`,
                '',
                `This address is not monitored for replies. If you need to add anything else, email ${CONTACT_EMAIL}.`,
                '',
                socialLinksBlock(),
                '',
                '— JavaScript Kampala',
              ].join('\n');

              await resend.emails.send({
                from: fromEmail,
                to: [submitterEmail],
                subject: confirmationSubject,
                text: confirmationText,
              });

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ok: true}));
            } catch (_error) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({error: 'Failed to send email'}));
            }
          });
        },
      },
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
