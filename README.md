# Credit Repair Offer

Static Netlify funnel for The Essential Credit Playbook offer with Stripe-backed checkout. `index.html` is the single served funnel page.

## Local development

```bash
npm install
npx netlify-cli@latest dev
```

Open `index.html` through Netlify Dev so `/.netlify/functions/*` routes work.

## Required Netlify environment variables

Set these in Netlify before testing checkout:

```bash
STRIPE_SECRET_KEY=sk_live_value
R2_ACCOUNT_ID=cloudflare_account_id
R2_ACCESS_KEY_ID=cloudflare_r2_access_key_id
R2_SECRET_ACCESS_KEY=cloudflare_r2_secret_access_key
R2_BUCKET_NAME=creditrepairbusiness
R2_FILE_KEY_PLAYBOOK=ESSENTIAL CREDIT REPAIR PLAYBOOK.zip
R2_FILE_KEY1=20 DEssential Dispute Letter Templates.zip
```

The test publishable key has a fallback in `netlify/functions/stripe-config.js` so the card field can load for test checkout. `STRIPE_SECRET_KEY` is still required on Netlify before Stripe can create or confirm payments. To test payments end to end, use the matching `sk_test_` secret key in Netlify.

For local Stripe test checkout, `.env` must contain both keys:

```bash
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

Use Stripe test card `4242 4242 4242 4242`, any future expiration date, any CVC, and any ZIP code.

The funnel flow is:

1. Checkout opens first with The Essential Credit Playbook checkbox checked by default and charges `$27`.
2. If the visitor unchecks the Playbook option, checkout switches to the 20 Essential Letter Templates for `$7`.
3. The final confirmation screen reveals the verified purchased download.

The frontend also sends tracking events to Google Analytics and the configured Google Apps Script webhook in `index.html`.

## Validation

```bash
npm run check
```
