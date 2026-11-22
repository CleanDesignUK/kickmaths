# Payment work paused for the free beta

22 November 2026: the owner has put paid access aside and requested a free beta launch. Do not implement checkout, activation codes or a payment gate as part of the beta. Remove public prices and say a paid version is coming soon. No future price or release date is currently published.

Before pausing, a £5 one-off licence per activated device/browser, using a reusable Tide Instant Checkout link and unique codes, was discussed. Automatic Tide payment confirmation was not verified, and nothing was connected. That discussion replaced the earlier £2 annual pupil proposal. Revisit requirements with the owner when paid work resumes.

The following is an archived earlier proposal, not the beta specification.

# Proposed KickMaths payment and access flow

Owner requirements: £2 per pupil per year for families and schools; a free playable demo; full player profiles behind paid access. The owner prefers a provider other than Stripe and currently uses a Tide business account. A checkout provider has not been selected or connected.

## Provider

Keep Tide as the business account. Tide Instant Checkout currently has a £5 minimum per payment, which excludes a single £2 pupil purchase. A separate payment processor is needed for the stated price; the bank account and website checkout service do not need to be the same provider.

PayPal Business is a proposed alternative because it supports configurable recurring billing and subscription payment events. The owner must choose/verify the provider and eligible payout account, review current fees and complete any account agreements. Tide account linking has not been verified. Do not assume all card/guest checkout features are available for a subscription.

Primary sources checked 22 November 2026:
- https://www.tide.co/features/instant-checkout/ (transaction limits FAQ: £5 minimum)
- https://www.paypal.com/uk/business/accept-payments/recurring-payments?locale.x=en_GB
- https://developer.paypal.com/subscriptions/webhooks

## User flow

1. Website Play opens the free demo without payment.
2. Add player or start the full game opens a parent/school sign-in and an explicit annual purchase screen. Show £2 per pupil, quantity, total, renewal terms and cancellation information before payment.
3. An already paid account uses its available pupil places without paying again. A school can purchase multiple places at £2 each.
4. Hosted checkout handles payment. A server verifies the payment event before granting access. A successful redirect alone never unlocks a player.
5. Verified payment extends paid-through dates. Cancellation stops renewal while access continues to the paid-through date; refunds, reversals and failed payments follow the defined policy.

## Backend and database

The free game can run as static files. Reliable paid access needs an account service, server and small database. GitHub Pages cannot run private payment verification or securely store payment secrets.

An appropriate initial implementation is a separate Worker/API plus D1 (or another managed backend/database). Store account identity, verified provider customer/subscription/payment IDs, purchased pupil places, assigned player identifiers and paid-through dates. Keep provider secrets server-side. Validate product, GBP amount, seat quantity, event signature and replay/idempotency on the server. Check the signed-in account's entitlement before entering a full player session or assigning a place.

Browser-local progress may remain initially; a database for access does not automatically synchronise scores, reports or a league between devices. If a child should recover their progress on another device, add a separate explicit cloud-save feature. The existing local game cannot provide tamper-proof protection while all question data and code are publicly downloadable; stronger enforcement must protect the paid service/API as well.

Before activation, choose the provider, supply sandbox/live integration through secure secret configuration, configure authenticated account recovery and billing management, and test successful payment, cancellation, failed renewal, refund, replay, cross-account access, seat limits and returning paid users. No paid gate should be published as working until these pass.
