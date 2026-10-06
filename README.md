# casus

Statyczny landing „stay tuned” do pokazania koncepcji marki. Dwa ekrany ze scroll-snap.
Projekt: Figma „Naming” → ramka `52:135`.

- Next.js 16 (App Router) + Tailwind v4, statyczny eksport (`output: "export"`)
- Fonty: Geist i Geist Mono (`next/font`)
- Pytanie lekarza pisze się i kasuje w pętli, każde we własnym schemacie kolorów: `src/components/casus/schemes.ts` (pytania + kolory; oko barwi się od koloru tła przez `color-dodge`)
- Soczewka na oku: po najechaniu obraz się rozmywa, a pod kursorem jest ostry (`eye-lens.tsx`, obręcz to `Cursor` z motion-primitives)
- Podpis na dole zmienia się: „for healthcare professionals” ↔ „soon available” (`tagline.tsx`)
- Drugi ekran po przewinięciu (Figma `52:163`): „By widzieć → wiedzieć więcej.”, oko + casus, „2026.” na tle gwiazd (`see-more.tsx`); przyciąganie do ekranów przez scroll-snap
- Logo i ikona oka są barwione maską CSS (`mask: url(...)`) — pliki SVG zostają nietknięte
- Oko w rastrze (`public/eye-halftone.png`) w trybie mieszania `color-dodge`, z wejściem i powolnym „oddechem”; ikona oka mruga; wszystko w CSS (`src/app/globals.css`)
- Przy „ogranicz ruch” animacje są wyłączone, a pytanie stoi w całości

## Lokalnie

```bash
npm install
npm run dev        # http://localhost:3200
npm run build      # statyczny build do ./out
```

Build używa webpacka (`next build --webpack`) — obejście 404 przy Next 16 + Turbopack na Vercelu.

## Deploy

```bash
npm run deploy
```

Buduje stronę z `BASE_PATH=/casus` i wypycha `out/` na gałąź `gh-pages`, którą GitHub Pages serwuje pod https://scencyk.github.io/casus/.

Lokalnie `BASE_PATH` jest pusty, więc strona działa pod `/`.
