# Zahid Decor and Flowers

A premium, animated marketing website for a Lahore-based florist and event decoration studio, built with React, Vite, Tailwind CSS, React Router and Framer Motion.

## Getting Started

```bash
npm install
npm run dev
```

Then open the URL shown in your terminal (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/     Reusable UI: Navbar, Footer, WhatsAppButton, ScrollToTop,
                   PageTransition, SectionHeading, StemDivider (signature
                   divider), ServiceCard, ProductCard, TestimonialCard, Lightbox
  layouts/
    MainLayout.jsx Wraps every page with Navbar + Footer + WhatsAppButton
  pages/
    Home/           Hero, ServicesPreview, FeaturedProducts, AboutPreview,
                     GalleryPreview, FinalCTA (each its own section file)
    About/
    Services/
    FlowerServices/
    Decoration/
    Gallery/        Category filters + fullscreen animated Lightbox
    Contact/         Contact info, form UI, WhatsApp, Google Maps embed
  data/
    siteConfig.js   Phone number, WhatsApp message, address, hours, map embed
    services.js     Service categories + Flower/Decoration service lists
    products.js     Featured product cards on the homepage
    gallery.js      Gallery items + category list
    testimonials.js Client testimonials (not yet wired into a page — ready to use)
```

## Configuration

Update contact details, WhatsApp number and map embed in:

```
src/data/siteConfig.js
```

- `phoneRaw` — digits only, used for `tel:` and `wa.me` links.
- `mapEmbedSrc` — replace with your own Google Maps "Embed a map" iframe `src` URL.

## Notes

- All photography is sourced from Unsplash as placeholder imagery — swap the URLs in `src/data/*.js` for your own photos before going live.
- Routing, animations and layout follow the brief: separate route/component per page, a cinematic Framer Motion hero, scroll-reveal sections, an animated mobile menu, and a fullscreen gallery lightbox with keyboard support (Escape / ←/→).
- Colours, type and the signature "stem line" divider are defined in `tailwind.config.js` and `src/components/StemDivider.jsx`.
