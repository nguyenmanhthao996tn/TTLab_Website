# TTLab Website

Official website of **TTLab** — a research group at the [University of Information Technology (UIT)](https://www.uit.edu.vn), VNU-HCM, Department of Computer Engineering.

🌐 **Live site:** _coming soon_

---

## About TTLab

TTLab focuses on applied research in embedded systems, wireless communications, and intelligent connected systems. Our work spans antenna design, RF systems, IoT, LPWAN, robotics, and communication systems.

---

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
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
├── app/                          # Next.js app router entry
├── components/
│   ├── sections/                 # One component per page section
│   │   ├── navbar.tsx
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── research-areas.tsx
│   │   ├── team.tsx
│   │   ├── projects.tsx
│   │   ├── publications.tsx
│   │   ├── facilities.tsx
│   │   ├── news.tsx
│   │   ├── contact.tsx
│   │   └── footer.tsx
│   ├── ui/                       # shadcn/ui base components
│   ├── news-card.tsx             # Reusable card components
│   ├── project-card.tsx
│   ├── publication-entry.tsx
│   ├── student-card.tsx
│   ├── student-timeline.tsx
│   ├── team-member-card.tsx
│   ├── stat-badge.tsx
│   ├── rainbow-divider.tsx
│   └── theme-provider.tsx
├── context/
│   └── theme-language-context.tsx  # Dark/light + EN/VI state
├── hooks/                        # Custom React hooks
├── lib/
│   ├── data/                     # All site content lives here
│   │   ├── team.ts               # Team members
│   │   ├── publications.ts       # Publications list (~250 entries)
│   │   ├── projects.ts           # Research projects
│   │   ├── news.ts               # News & announcements
│   │   └── facilities.ts         # Facilities & equipment
│   ├── translations.ts           # EN/VI string maps
│   └── utils.ts                  # Shared utilities
├── styles/                       # Global CSS
├── next.config.mjs
├── tsconfig.json
├── postcss.config.mjs
└── components.json               # shadcn/ui config
```

---

## Content Updates

All site content is stored as data files in `lib/data/` — you can update the site without touching any component code.

| What to update | File |
|---|---|
| Team members & profiles | `lib/data/team.ts` |
| Publications | `lib/data/publications.ts` |
| Projects | `lib/data/projects.ts` |
| News & announcements | `lib/data/news.ts` |
| Facilities & equipment | `lib/data/facilities.ts` |
| EN/VI translations | `lib/translations.ts` |

---

## Internationalization

The site supports **English (EN)** and **Vietnamese (VI)**. All display strings are managed in `lib/translations.ts` via a language context in `context/theme-language-context.tsx`. Toggle is available in the navbar.

---

## Theming

Dark and light mode are supported via Tailwind CSS `dark:` classes, controlled by `context/theme-language-context.tsx` and applied through `components/theme-provider.tsx`.

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
