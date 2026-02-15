# 🕌 AyahDrop

**Beautiful Quran Verse Cards for Social Media**

Generate stunning verse cards with perfect Arabic text, verified translations, and beautiful designs. Ready to share in seconds.

**Live:** [ayahdrop.vercel.app](https://ayahdrop.vercel.app)

## Features

- **All 114 Surahs** — Access any ayah from the entire Quran
- **8 Card Styles** — Midnight Gold, Pure Light, Emerald Garden, Desert Sand + 4 PRO styles
- **6 Themed Collections** — Patience, Trust, Gratitude, Mercy, Guidance, Love of the Prophet ﷺ
- **Download PNG** — 1080x1080 high-res export, ready for Instagram/social media
- **Share** — WhatsApp, X/Twitter, copy text with direct links
- **Deep Links** — Share any ayah via URL: `?s=2&a=255`
- **Mobile Responsive** — Works perfectly on phone, tablet, and desktop
- **Beautiful Arabic** — Amiri calligraphic font, RTL, Bismillah ornaments

## Tech Stack

- **Framework:** Next.js 16 (static export)
- **Styling:** Tailwind CSS 4
- **Fonts:** Amiri (Arabic), Playfair Display (English), Inter (UI) — self-hosted
- **API:** [AlQuran.cloud](https://alquran.cloud) — Arabic (quran-uthmani) + English (Sahih International)
- **Export:** html-to-image (toPng)
- **Hosting:** Vercel

## Development

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # Production build
```

## License

MIT
