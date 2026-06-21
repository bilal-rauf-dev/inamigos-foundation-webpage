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
