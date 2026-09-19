# TTLab Website

Official website of **TTLab (The Things Lab)** — a research group at the [University of Information Technology (UIT)](https://www.uit.edu.vn), VNU-HCM, Faculty of Computer Engineering.

🌐 **Live site:** _coming soon_

---

## About TTLab

TTLab focuses on applied research in embedded systems, wireless communications, and intelligent connected systems. Our work spans antenna design, RF systems, IoT, LPWAN, energy harvesting, CubeSat/satellite communication, and robotics/UAV — in close collaboration with LEAT (Université Côte d'Azur) and industry partners such as RFThings.

---

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) — monochrome black/gray (`neutral`) theme
- **Language:** TypeScript
- **Package manager:** pnpm
- **UI Components:** shadcn/ui

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [pnpm](https://pnpm.io/) — install via `npm install -g pnpm`

### Install & Run

```bash
# Clone the repository
git clone https://github.com/<your-username>/TTLab_Website.git
cd TTLab_Website

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

> `.next/` and `node_modules/` are auto-generated — do not commit them. They are already covered by `.gitignore`.

---

## Project Structure

```
TTLab_Website/
├── app/                          # Next.js app router entry (metadata/title in layout.tsx)
├── components/
│   ├── sections/                 # One component per page section
│   │   ├── navbar.tsx            # Logo + nav + quick-links panel + theme/language toggle
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── research-areas.tsx
│   │   ├── team.tsx
│   │   ├── projects.tsx
│   │   ├── publications.tsx      # Grouped by year, with conference/journal tag
│   │   ├── facilities.tsx
│   │   ├── news.tsx
│   │   ├── contact.tsx
│   │   └── footer.tsx
│   ├── ui/                       # shadcn/ui base components
│   ├── news-card.tsx             # Reusable card components
│   ├── project-card.tsx
│   ├── publication-entry.tsx     # Single publication row (title/DOI link + type tag)
│   ├── student-card.tsx          # Reserved for a future "students" list (not wired in yet)
│   ├── student-timeline.tsx      # Reserved for a future student timeline (not wired in yet)
│   ├── team-member-card.tsx      # Bilingual name/title, links to Google Scholar if set
│   ├── stat-badge.tsx            # Animated count-up stat (0 → value on scroll into view)
│   ├── rainbow-divider.tsx
│   └── theme-provider.tsx
├── context/
│   └── theme-language-context.tsx  # Dark/light + EN/VI state (default language: vi)
├── hooks/                        # Custom React hooks (incl. use-scroll-animation.ts)
├── lib/
│   ├── data/                     # All site content lives here
│   │   ├── team.ts               # Key members (bilingual names/titles, h-index, Scholar links)
│   │   ├── publications.ts       # Publications list, grouped by year, tagged conference/journal
│   │   ├── projects.ts           # Research projects (⚠️ still placeholder — see below)
│   │   ├── news.ts               # News & announcements (⚠️ still placeholder — see below)
│   │   ├── facilities.ts         # Facilities & equipment (⚠️ still placeholder — see below)
│   │   └── quick-links.ts        # External project links shown in the navbar's quick-links panel
│   ├── translations.ts           # EN/VI string maps
│   └── utils.ts                  # Shared utilities
├── public/
│   ├── logo.png                  # TTLab logo (navbar + favicon source)
│   ├── icon-32x32.png            # Favicon
│   ├── apple-icon.png            # Apple touch icon
│   └── team/                     # Member photos (referenced from lib/data/team.ts)
├── styles/                       # Global CSS
├── .claude/launch.json           # Local dev-server launch config (used by the Claude Code browser pane)
├── next.config.mjs
├── tsconfig.json
├── postcss.config.mjs
└── components.json               # shadcn/ui config
```

---

## Content Updates

All site content is stored as data files in `lib/data/` — you can update the site without touching any component code.

| What to update | File | Notes |
|---|---|---|
| Team members & profiles | `lib/data/team.ts` | Each member has `nameVi`/`nameEn` (Vietnamese name order vs. romanized Western order), `titleVi`/`titleEn`, optional `roleVi`/`roleEn` (e.g. "Kỹ sư"/"Eng."), `affiliation`, optional `hIndex`, `image` (path under `public/team/`), optional `scholarUrl`. Card layout is hard-coded in `components/sections/team.tsx` as `slice(0, 3)` (top row) + `slice(3)` (bottom row) — reorder the array or adjust the slice indices to change the grid. |
| Publications | `lib/data/publications.ts` | Each entry has `title`, `authors`, `journal` (venue name), `type` (`"conference"` \| `"journal"` — drives the small tag shown under each entry), `year`, `doi`, `url` (defaults to `https://doi.org/<doi>`). The UI groups entries by `year` automatically — just add/edit entries, no need to touch `publications.tsx`. |
| Quick-links panel | `lib/data/quick-links.ts` | Shown when clicking the hamburger (☰) icon at the top-left of the navbar. Add `{ id, labelVi, labelEn, url }` — opens in a new tab. |
| Projects | `lib/data/projects.ts` | ⚠️ Still demo/placeholder content — not yet replaced with real TTLab projects. |
| News & announcements | `lib/data/news.ts` | ⚠️ Still demo/placeholder content. |
| Facilities & equipment | `lib/data/facilities.ts` | ⚠️ Still demo/placeholder content. |
| Contact info (email/phone/address/office hours) | `lib/translations.ts` → `contact` block (both `en` and `vi`) | Set `phone: ""` to hide the phone row entirely (see `components/sections/contact.tsx`). |
| Hero/About text, research areas, section titles | `lib/translations.ts` | All page copy lives here, per language. |
| Logo / favicon | `public/logo.png`, `public/icon-32x32.png`, `public/apple-icon.png` | Replace the files (same names) to swap the logo; referenced in `app/layout.tsx` (favicon) and `components/sections/navbar.tsx` (navbar logo). |

> ⚠️ **Known placeholder content:** `projects.ts`, `news.ts`, and `facilities.ts` still contain the original demo data (fake projects/news/equipment) and have **not** been replaced with real TTLab content yet. Real project names are known (Electronic Chessboard, Indoor/NFC Energy Harvesting, LoRa-based IoT devices, CubeSat antenna, UAV antenna, etc. — see the group's intro slides) but haven't been written into structured entries. Update these three files next when ready.

---

## Internationalization

The site supports **Vietnamese (VI, default)** and **English (EN)**. All display strings are managed in `lib/translations.ts` via a language context in `context/theme-language-context.tsx`. Toggle is available in the navbar. Per-item bilingual content (team names/titles, quick-links labels) lives directly on each data entry (`...Vi` / `...En` fields) rather than in `translations.ts`.

---

## Theming

- Dark and light mode are supported via Tailwind CSS `dark:` classes, controlled by `context/theme-language-context.tsx` and applied through `components/theme-provider.tsx`.
- The color palette is intentionally **monochrome black/gray** (`neutral-*` Tailwind classes) — avoid introducing hue-based colors (blue/purple/etc.) in new components; use `neutral`/`white`/`black` shades to keep the site's look consistent. Base design tokens (`--background`, `--primary`, etc.) live in `app/globals.css`.

---

## Self-Hosting

After building, deploy with a Node.js process manager:

```bash
# Build the site
pnpm build

# Run with PM2 (recommended)
npm install -g pm2
pm2 start "pnpm start" --name ttlab-website
pm2 save
```

Pair with **Nginx** as a reverse proxy pointing to `localhost:3000`.

---

## Contributing

This repo is maintained by TTLab members. To update your profile, add a publication, or post news — edit the relevant file in `lib/data/` and open a pull request.

---

## License

[MIT](LICENSE)

---

*TTLab · University of Information Technology · VNU-HCM*
