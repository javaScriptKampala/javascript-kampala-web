/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type {Handler} from '@netlify/functions';
import {Resend} from 'resend';

const CONTACT_EMAIL = 'javascriptkampala@gmail.com';

const SOCIAL_URLS = {
  twitter: 'https://x.com/JsKampala',
  linkedin:
    'https://www.linkedin.com/company/javascript-community-uganda/?viewAsMember=true',
  github: 'https://github.com/javaScriptKampala',
  youtube: 'https://www.youtube.com/@JavascriptKampala',
} as const;

const DEFAULT_FROM_EMAIL =
  'JavaScript Kampala <noreply@mail.javascriptkampala.org>';

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

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {statusCode: 405, body: JSON.stringify({error: 'Method not allowed'})};
  }

  try {
    const body = JSON.parse(event.body || '{}') as {
      type?: 'speaker' | 'sponsor';
      payload?: Record<string, string>;
    };

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.RESEND_TO_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL || DEFAULT_FROM_EMAIL;

    const ccRaw = process.env.RESEND_CC_EMAILS;
    const ccList = parseCcList(ccRaw);
    const toLower = (e: string) => e.toLowerCase();
    const cc = ccList.filter(
      (addr) => toLower(addr) !== toLower(toEmail || ''),
    );

    if (!apiKey || !toEmail) {
      return {statusCode: 500, body: JSON.stringify({error: 'Resend is not configured'})};
    }

    const payload = body.payload || {};
    const submitterEmail =
      typeof payload.email === 'string' ? payload.email.trim() : '';
    if (!submitterEmail) {
      return {statusCode: 400, body: JSON.stringify({error: 'Missing email in submission'})};
    }

    const resend = new Resend(apiKey);
    const typeLabel =
      body.type === 'sponsor' ? 'Sponsor Inquiry' : 'Speaker Proposal';
    const lines = Object.entries(payload).map(
      ([key, value]) => `${key}: ${value}`,
    );
    const teamBody = [lines.join('\n'), '', socialLinksBlock()].join('\n');

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

    return {statusCode: 200, body: JSON.stringify({ok: true})};
  } catch (_error) {
    return {statusCode: 500, body: JSON.stringify({error: 'Failed to send email'})};
  }
};
