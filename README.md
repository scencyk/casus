# casus — teaser

Statyczna strona „stay tuned” do pokazania koncepcji marki. Jeden ekran, bez scrolla.

- Next.js 16 (App Router) + Tailwind v4, statyczny eksport (`output: "export"`)
- Animacje: [motion-primitives](https://motion-primitives.com) — `TextEffect`, `TextLoop`, `TextShimmer`, `BorderTrail`
- Obracający się łuk terminów to czysty CSS (`src/components/casus/arc.tsx` + `globals.css`)

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
