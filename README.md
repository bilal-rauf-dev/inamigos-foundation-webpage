# InAmigos Foundation — Multi-Page Website

A complete, polished, multi-page website for InAmigos Foundation built with plain HTML, CSS, and vanilla JavaScript. No frameworks, no build step, no npm.

**Live:** https://inamigos-foundation-webpage.vercel.app/

---

## File Structure

```
/
├── index.html          Home — hero, about teaser, featured projects, impact strip, CTA
├── about.html          Who We Are, founding story, certifications, core values
├── projects.html       All 6 projects (Bachpanshala, Udaan, Jeev, Sewa, Prakriti, Vikas)
├── impact.html         Animated count-up stats + impact statements by project
├── volunteers.html     4 real volunteer profile cards + join CTA
├── causes.html         6 cause tiles with explore links
├── gallery.html        Responsive image grid + lightbox + category filter
├── events.html         3 events preserved from original site
├── blog.html           6 placeholder blog post cards (replace with real posts)
├── fundraise.html      Full donation page — Razorpay, UPI, QR, bank details, breakdown
├── contact.html        Contact info + Formspree contact form
├── join-us.html        Volunteer/internship signup form + roles + perks
├── css/
│   └── styles.css      Single shared stylesheet (all pages)
├── js/
│   └── main.js         All interactivity — hamburger, scroll-reveal, count-up, lightbox, forms
├── assets/             Add favicon.ico / favicon.png here
├── logo_wt.png         White logo
└── logo_bt.png         Dark logo
```

---

## How to Run Locally

Open `index.html` in any browser — no server, no install needed. All paths are relative and work both locally and on Vercel.

---

## Deploying to Vercel

The site is already connected to Vercel via GitHub. Push to deploy:

```bash
git add .
git commit -m "Your message"
git push
```

Vercel auto-deploys from the `main` branch.

---

## REQUIRED: Set Up Formspree (Contact & Join Us Forms)

Both `contact.html` and `join-us.html` use [Formspree](https://formspree.io) for form submissions — no backend needed.

### Steps

1. Go to **[formspree.io](https://formspree.io)** and create a free account.
2. Click **New Form**, name it (e.g. "InAmigos Contact"). Copy the **Form ID** — 8 chars, e.g. `xpzgkjqr`.
3. In `contact.html`, find and replace:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   with your real form ID.
4. Repeat step 2–3 for `join-us.html` (you can use the same form ID or create a second one).
5. Push to GitHub — Vercel deploys automatically.

> Free plan: 50 submissions/month per form. See formspree.io for paid plans.

---

## Post-Launch Checklist

| Task | File |
|------|------|
| **Replace Formspree IDs** | `contact.html`, `join-us.html` — search `YOUR_FORM_ID` |
| Add a favicon | Put `favicon.ico` in `/assets/`, add `<link rel="icon" href="assets/favicon.ico">` to each `<head>` |
| Replace blog placeholders | Update `blog.html` cards with real post titles, dates, and URLs |
| Add new gallery images | Add `.gallery-item[data-src][data-caption][data-category]` divs to `gallery.html` |
| Add upcoming events | Add new `<article class="event-card">` blocks to `events.html` |

---

## Donation Details (Exact)

| Method | Details |
|--------|---------|
| Razorpay | https://rzp.io/l/kWQ87HP |
| UPI ID | inamigosfoundation@icici |
| Bank Account No. | 028205005839 |
| IFSC Code | ICIC0000282 |
| Bank | ICICI Bank |
| Tax Exemption | 80G — deductible under Section 80G, Income Tax Act 1961 |

---

## Brand

| Token | Value |
|-------|-------|
| Primary | `#1a3a2e` dark forest green |
| Accent | `#e8a217` gold |
| Heading font | Playfair Display (Google Fonts) |
| Body font | DM Sans (Google Fonts) |

---

## JavaScript Features (`js/main.js`)

- Sticky navbar shadow on scroll
- Mobile hamburger menu (overlay, ESC-to-close, closes on link click)
- Scroll-reveal with `IntersectionObserver` (`.reveal` class)
- Count-up animation for stats (ease-out cubic, triggers on viewport entry)
- Gallery lightbox (click, prev/next, keyboard arrows, ESC)
- Gallery category filter buttons
- Form: client-side validation, `fetch` POST to Formspree, inline success/error, graceful fallback

---

## Accessibility

- Semantic HTML5 (`nav`, `section`, `article`, `footer`, `address`)
- All images have descriptive `alt` text
- `aria-label` on all icon buttons
- `aria-hidden="true"` on decorative SVGs
- `role="alert"` + `aria-live="polite"` on form messages
- `aria-expanded` on hamburger button
- `role="dialog"` + `aria-modal` on lightbox
- Visible `:focus-visible` ring (gold, 3px)

---

*Rebuilt June 2026 — plain HTML + CSS + vanilla JS, zero dependencies.*
