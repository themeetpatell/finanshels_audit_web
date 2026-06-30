# Conversion Tracking — `consultation_form_ec`

How the Google Ads consultation conversion is tracked on this site, why it
fires on the thank-you page (not at form submit), and how to verify it.

## Intended event flow

1. **Landing page (`/` or `/-bing`)** — user fills the Zoho consultation form
   (`#form` hero or `#cta-zoho-form`) and submits.
   - The form's `onSubmit` pushes a `form_submission` dataLayer event (accurate:
     the form *was* submitted on the landing page).
   - A global submit listener in `index.html` stashes the email and a one-shot
     `consultation_submitted` flag in `sessionStorage`. **It does NOT fire the
     conversion here.**
2. **Zoho** — the form POSTs to Zoho; on a valid submission Zoho redirects back
   to `zf_redirect_url` = `${origin}/thank-you` (same origin, same tab).
3. **Thank-you page (`/thank-you`)** — on load, `ThankYou.jsx`:
   - pushes `thank_you_page_view`, and
   - if `consultation_submitted` is set, pushes `consultation_form_ec` with
     `enhanced_conversion_data.email` / `user_data.email`, then clears the flag.

The Google Ads conversion tag in GTM (container `GTM-MXFJ6CGB`) is triggered by
the `consultation_form_ec` Custom Event — so the conversion now fires on the
thank-you page, once per real submission.

## Root cause (what was wrong)

`consultation_form_ec` was being pushed **at form-submit time on the landing
page**, in three places:

- `index.html` — the global submit listener pushed it immediately on submit.
- `src/pages/NewHomePage.jsx` — a duplicate `useEffect` submit listener pushed
  it again.
- `src/pages/NewHomePageBing.jsx` — the same duplicate listener.

`src/pages/ThankYou.jsx` only fired `thank_you_page_view`, never the conversion.

Firing on submit is unreliable:

- the submit can fail Zoho's server-side validation (the email field is
  `type="text"` with no client-side `required`, so the `submit` event fires
  regardless of input validity), and
- navigating away to Zoho can cut the tag off before it sends the hit.

The duplicate listeners also meant the event could be pushed more than once for
a single submit.

## The fix

- **`index.html`** — the submit listener no longer pushes `consultation_form_ec`.
  It saves `consultation_email` + a one-shot `consultation_submitted` flag to
  `sessionStorage`. (`form_submission` is still pushed by the form's own
  `onSubmit` — accurate, the form was submitted.)
- **`src/pages/NewHomePage.jsx` / `NewHomePageBing.jsx`** — the duplicate
  submit-time `consultation_form_ec` listeners were deleted entirely. The single
  `index.html` listener now covers both routes.
- **`src/pages/ThankYou.jsx`** — on load it pushes `thank_you_page_view`, and —
  only if `consultation_submitted` is set — pushes `consultation_form_ec` with
  the stashed email, then clears the flag.

### Why `sessionStorage`

The email lives in the form on the landing page, but Enhanced Conversions need
it at conversion time on the thank-you page. Same-origin `sessionStorage`
survives the Zoho redirect (`finanshels.com` → Zoho → back to `/thank-you`) in
the same tab. Clearing the flag after firing means a refresh, or a direct /
bookmarked visit to `/thank-you`, never double-counts.

**No GTM container changes are needed** — the conversion still fires off the
same `consultation_form_ec` event; only the page that emits it moved.

## Verify in GTM Preview

1. Submit a landing-page form → `consultation_form_ec` and the Google Ads
   conversion should **not** fire on the landing page (only `form_submission`).
2. On `/thank-you` → `consultation_form_ec` and the conversion fire **once**,
   with the email populated.
3. Refresh `/thank-you` → the conversion must **not** re-fire.
4. Open `/thank-you` directly (no submission) → the conversion must **not** fire.

## One thing to confirm on the GTM side

The Google Ads conversion tag's trigger must be the `consultation_form_ec`
Custom Event **only** — not "All Pages", not a Click trigger, not
`form_submission`. If it has any of those, it would still fire on the landing
page regardless of this code change.
