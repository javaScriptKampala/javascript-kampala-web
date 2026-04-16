<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/8e994e8c-ef2e-48de-8d4f-7119e5cf62f4

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `bun install`
2. Copy `.env.example` to `.env.local` and set:
   - `GEMINI_API_KEY`
   - `RESEND_API_KEY`
   - `RESEND_TO_EMAIL`
   - (optional) `RESEND_FROM_EMAIL`
3. Run the app:
   `bun dev`
