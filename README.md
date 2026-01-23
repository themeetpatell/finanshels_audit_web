# Finanshels Audit Landing Page

Modern React + Vite landing page for Finanshels audit, tax, and compliance services. Includes CTA forms, testimonials carousel, and SEO/performance tuning for production.

## Quickstart
- Prereq: Node 18+ and npm.
- Install deps: `npm install`
- Dev server: `npm run dev` (Vite with HMR)
- Production build: `npm run build` (outputs to `dist/`)
- Preview production build: `npm run preview`
- Lint: `npm run lint`

## Tech Stack
- React 19, Vite 7
- React Router
- React Icons
- Vanilla CSS for layout and theming
- Zoho form embeds for lead capture

## Project Structure (high level)
- `src/pages/NewHomePage.jsx` — main landing page sections and content
- `src/pages/NewHomePage.css` — page styles, responsive rules, testimonial carousel
- `src/components/Nav.jsx`, `Footer.jsx`, `Layout.jsx`, `FloatingContacts.jsx` — shell layout and chrome
- `public/` — static assets (hero image, logos, client logos)
- `index.html` — document head, SEO/analytics, preload links

## SEO & Analytics
- Canonical, robots, theme-color, rich OG/Twitter cards, and JSON-LD `ProfessionalService` schema (rating included) set in `index.html`. Update URLs/assets if the production domain changes.
- GTM snippet present with container `GTM-MXFJ6CGB` (head + noscript). Swap the ID if needed.
- `lang="en"` on `<html>` and descriptive meta description/keywords.

## Performance Notes
- Preconnect to Google Fonts and preload hero image for faster LCP.
- Logos/avatars use `loading="lazy"` or `fetchpriority="high"` (nav logo) plus explicit sizes/decoding hints to reduce layout shift.
- Testimonials carousel is horizontal-only scrolling to prevent vertical jitter on mobile.
- Build outputs: `npm run build` generates optimized assets in `dist/` (see Vite report in console).

## Deployment
1) Run `npm run build`.
2) Deploy the `dist/` directory to your hosting (Netlify, Vercel, S3/CloudFront, etc.).
3) Ensure the canonical/OG URLs in `index.html` point to the live domain and that `public/finanshelslogo.svg` and hero image are reachable on that domain.

## Content Updates
- Testimonials, hero copy, reasons, and CTAs live in `src/pages/NewHomePage.jsx`.
- Styles, breakpoints, and carousel tweaks live in `src/pages/NewHomePage.css`.
- Navigation/footers live in `src/components/Nav.jsx` and `src/components/Footer.jsx`.

## Support
For changes to tracking IDs, domains, or to add more structured data, edit `index.html`. For component-level adjustments, update the corresponding JSX/CSS files above.***
# finanshels_audit_web
