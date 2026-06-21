# Contrastly

Contrastly is a small browser-based color contrast checker for Tailwind CSS palettes, custom hex values, and semantic color token decisions.

It is designed for frontend developers, designers, and anyone working on accessibility-aware interface colors.

## Live App

- https://contrastly.solastudio.studio/

## Why this exists

Color contrast can look acceptable at first glance and still fail accessibility requirements.

When working on UI, contrast checking often involves moving between Tailwind documentation, hex converters, and separate contrast checker tools. Each step is useful, but the workflow can become more fragmented than it needs to be.

Contrastly brings those steps closer together: choose or enter colors, check contrast in real time, and see whether a color combination meets WCAG AA or AAA contrast requirements.

## Who it is for

Contrastly may be useful when you are:

- working with Tailwind CSS colors
- checking foreground and background color combinations
- designing accessible UI components
- learning about WCAG contrast requirements
- building or reviewing semantic color tokens
- reviewing interface colors during implementation

It is especially useful when you want to move quickly while still keeping accessibility part of everyday frontend decisions.

## Features

- Tailwind color palettes included by default
- Custom hex color input
- Copy buttons for quick iteration
- Real-time WCAG AA / AAA contrast checks
- Support for common foreground and background combinations
- Keyboard-friendly interaction
- Reduced-motion support
- Screen-reader-aware UI patterns
- Fast, lightweight interface for everyday use

## How contrast is calculated

Contrastly checks color contrast using the WCAG 2.x contrast ratio formula.

```txt
contrast ratio = (L1 + 0.05) / (L2 + 0.05)
```

Where:

- `L1` is the relative luminance of the lighter color
- `L2` is the relative luminance of the darker color

Relative luminance is calculated from sRGB color values using the WCAG 2.x method before the contrast ratio is computed.

This makes the result comparable with other WCAG-based contrast checking tools.

## Getting Started

### Requirements

- Node.js 18 or later
- npm

### Installation

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open `http://localhost:3000`.

### Environment Variables

If you want to use environment variables locally, copy the example file first:

```bash
cp .env.example .env.local
```

Available variables:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SOLA_STUDIO_URL=https://your-studio-url.com
NEXT_PUBLIC_GITHUB_REPOSITORY_URL=https://github.com/your-org/contrastly
```

Notes:

- `NEXT_PUBLIC_SITE_URL` should be set for production deployments. It is used for metadata, Open Graph tags, sitemap, and robots.txt.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` is optional. If omitted, no Google Analytics script is injected.
- `NEXT_PUBLIC_SOLA_STUDIO_URL` is optional. If omitted, the related footer link is not shown.
- `NEXT_PUBLIC_GITHUB_REPOSITORY_URL` is optional. If omitted, the related footer link is not shown.

### Production Build

```bash
npm run build
npm run start
```

### Project Checks

```bash
npm run check
```

This runs:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## External Resources & Privacy

Contrast checking runs locally in the browser. The core color comparison logic does not rely on external API calls.

### Fonts

The Inter font is handled through `next/font` and served locally in production builds, so the app does not require runtime requests to Google Fonts servers.

### Analytics

Google Analytics 4 is optional. If `NEXT_PUBLIC_GA_MEASUREMENT_ID` is not set, no analytics script is injected.

When analytics is enabled, the app uses a consent-aware setup. Analytics collection remains disabled until the user grants consent. Selected colors and other user-entered contrast values are not sent to analytics.

### Consent Storage

If the consent banner is enabled, the user's consent choice may be stored in browser-side storage so the preference can be remembered across visits.

## Accessibility Note

Contrastly is a helpful reference tool for checking color contrast, but it is not a substitute for a full accessibility audit, legal compliance review, or official certification.

## Project Status

This project is maintained on a best-effort basis. Use of the source code is governed by the repository license, and the official hosted app is subject to its own Terms of Use and Privacy Policy.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui (with Radix UI primitives)

## Maintainer

Contrastly is built and maintained by Sola Studio, with ongoing development by Yoko Shiina.

- Live app: https://contrastly.solastudio.studio/
- Source code: https://github.com/sola-studio/contrastly
- Yoko Shiina: https://github.com/yokoworks

## References

Contrastly references Tailwind CSS color names and palette values, and calculates contrast results based on WCAG AA / AAA contrast thresholds.
Tailwind CSS is created by Tailwind Labs and licensed under the MIT License. WCAG is published by the World Wide Web Consortium (W3C).
Contrastly is an independent tool from Sola Studio and is not affiliated with Tailwind Labs or W3C.

## License

MIT
