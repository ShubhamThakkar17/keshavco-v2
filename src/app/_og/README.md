# Fonts for the Open Graph image

`src/app/opengraph-image.tsx` renders the social preview at build time with
`next/og`, which needs raw font files (it cannot use `next/font`).

| File | Font | Licence |
| :-- | :-- | :-- |
| `sora-600.ttf` | Sora SemiBold | SIL Open Font License 1.1 (Google Fonts) |
| `geist-mono-500.ttf` | Geist Mono Medium | SIL Open Font License 1.1 (Google Fonts) |

The leading underscore keeps this folder out of the App Router's routes.
