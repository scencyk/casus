# casus — landing

Statyczny landing „stay tuned” do pokazania koncepcji marki. Jeden ekran, bez scrolla.
Projekt: Figma „Naming” → ramka `52:135`.

- Next.js 16 (App Router) + Tailwind v4, statyczny eksport (`output: "export"`)
- Fonty: Geist i Geist Mono (`next/font`)
- Pytanie lekarza pisze się i kasuje w pętli: `src/components/casus/query-typer.tsx` (lista zapytań na górze pliku)
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

- **Vercel**: import repo, bez dodatkowej konfiguracji.
- **GitHub Pages**: wrzuć zawartość `out/`. Przy publikacji pod podścieżką (`user.github.io/casus-teaser`) dodaj `basePath: "/casus-teaser"` w `next.config.ts`.
