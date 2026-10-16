# macakr.me

A bilingual engineering portfolio for Mehmet Akif Çakır, built around the **Blueprint Telemetry** visual direction: drafting grids, precise typography, restrained motion and visible evidence of work.

## Current scope

Phase 1 establishes the runnable application, configuration, design tokens, responsive shell, Turkish/English routing, theme controls, effects preferences, command palette and CI. The later robot-arm, project simulations, MDX blog, live statistics and contact delivery phases require a separate `continue` instruction. The redesign is prepared for review on a draft pull request; production deployment and DNS changes require a later launch instruction.

Known information is stored in `src/config/site.ts`. Missing author information is represented as `null`; the interface hides unavailable links, downloads and metadata. Project ideas are not represented as completed competition entries. No invented metrics, awards, releases or employment claims are included.

## Run locally

Use Node.js 24 and pnpm 11.25.0. The package-manager version is pinned in `package.json`.

```sh
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [the Turkish homepage](http://localhost:3000/tr) or [the English homepage](http://localhost:3000/en). The root URL resolves the preferred locale. Public configuration needs no external service credentials.

```sh
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test
pnpm build
pnpm check:bundle
pnpm exec playwright install chromium firefox webkit
pnpm test:e2e
```

`pnpm start` serves a completed production build. CI uses a frozen lockfile, checks types and formatting, lints without warnings, runs unit tests, builds the app and runs Chromium, Firefox and mobile WebKit smoke/accessibility tests. Later phases expand the browser suite and measured performance gates; installing the tools does not establish a Lighthouse score or prove cross-browser compatibility.

Phase 1 local validation: typecheck, zero-warning lint, production build, formatting, four unit checks and 30 Chromium/Firefox/mobile-WebKit checks passed. Widths 360, 768, 1280 and 1920 were checked. The mobile Lighthouse audit with real-time DevTools throttling scored 98/100/100/100, with LCP 1.61 s and CLS 0. Initial home JavaScript is 173,153 bytes gzip including inline executable data and excluding the legacy-only `noModule` fallback. Full methods, limitations and the created-file inventory are in [the Phase 1 handoff](docs/phase-1.md).

On macOS 27, Firefox 157 can fail to find its temporary profile because of an [upstream application-data issue](https://github.com/microsoft/playwright/issues/42768). Point `CFFIXED_USER_HOME` at a fresh temporary directory when invoking Playwright. This isolates Firefox application data without changing system permissions or your real `HOME`; Ubuntu CI does not require the workaround.

## Structure

```text
.github/workflows/   Automated quality checks
src/app/            Locale-prefixed App Router routes and shared styles
src/components/     Accessible site shell and interactive controls
src/config/         Verified author data and server environment schema
src/i18n/           Routing, navigation and request configuration
src/messages/       Native Turkish and English interface text
src/proxy.ts        Locale negotiation
src/lib/*.test.ts   Unit checks
tests/              Browser and accessibility checks
scripts/            Production JavaScript budget verification
```

The design system uses CSS variables as the color source of truth and Tailwind's CSS-first theme. Change the signal token to recolor the main interaction accent. Light mode has its own paper and ink palette. Bricolage Grotesque and JetBrains Mono load through `next/font` with Latin and Latin Extended subsets. Bricolage remains variable; mono labels use regular weight to reduce font transfer. Optional font display and natural discovery avoid blocking the first paint; locale-specific `lang` attributes preserve Turkish casing.

Effects preferences respect reduced motion, Save-Data and low-resource device hints. The Lite mode avoids smooth scrolling and decorative motion. Browser-only enhancements must not gate navigation, profile information or external links.

## Verified sources

- [GitHub profile](https://github.com/mehmetakifcakr): identity, public profile links and repository discovery.
- [RecoverTick repository](https://github.com/mehmetakifcakr/recovertick): Rust project source. A crates.io release has not been verified; no package download statistics are shown.
- [OpenRobotKit repository](https://github.com/mehmetakifcakr/OpenRobotKit): public project source.
- [LinkedIn profile](https://www.linkedin.com/in/ma-cakr): author-provided profile link.
- The original author brief supplies the education, technical interests and competition project topics. Roles, dates, entry status and results remain unset until confirmed.

Core versions were checked against current stable package metadata on 17 October 2026: Next.js 16.4.2, React/React DOM 19.3.1, Tailwind 4.3.3, next-intl 4.14.9, Motion 14.2.0, Lenis 1.3.26 and next-themes 0.4.6. ESLint 9.39.5 and TypeScript 6.0.3 are the newest stable releases inside the lint stack's supported peer ranges: its React, import and accessibility plugins support ESLint through version 9, and typescript-eslint requires TypeScript below 6.1. Strict peer checks remain enabled; ESLint 10 and TypeScript 7 are excluded until the supporting packages declare compatibility. These versions were verified against the official [ESLint registry metadata](https://registry.npmjs.org/eslint) and [TypeScript registry metadata](https://registry.npmjs.org/typescript). The implementation follows the current [Next.js App Router documentation](https://nextjs.org/docs/app), [next-intl setup](https://next-intl.dev/docs/routing/setup) and [Tailwind CSS-first installation](https://tailwindcss.com/docs/installation/framework-guides/nextjs). Exact resolved dependencies are recorded in the lockfile.

## Dependency decisions

| Dependency               | Purpose                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `next`                   | App Router, server rendering, metadata, asset optimization and deployment runtime. |
| `react`                  | Component rendering and accessible interactive state.                              |
| `react-dom`              | Browser hydration and server DOM rendering matched to React.                       |
| `next-intl`              | Locale routing, message typing and localized formatting.                           |
| `next-themes`            | System-aware theme persistence with a pre-paint theme script.                      |
| `motion`                 | A single motion library for restrained transform/opacity transitions.              |
| `lenis`                  | Optional smooth scrolling in Full mode with native scrolling in Lite mode.         |
| `@radix-ui/react-dialog` | Keyboard and focus management for the command palette.                             |
| `lucide-react`           | Small, consistent SVG interface icons imported individually.                       |
| `clsx`                   | Readable conditional class names.                                                  |
| `tailwind-merge`         | Safe merging of component Tailwind class overrides.                                |
| `zod`                    | Runtime validation of optional environment variables and later content/API input.  |
| `server-only`            | Prevents the server environment module from entering client bundles.               |
| `typescript`             | Strict static checks for application code and configuration.                       |
| `@types/node`            | Node.js runtime type definitions for server code and tooling.                      |
| `@types/react`           | React component and hook type definitions.                                         |
| `@types/react-dom`       | React DOM and hydration type definitions.                                          |
| `tailwindcss`            | Token-first styling with generated utility CSS.                                    |
| `@tailwindcss/postcss`   | Tailwind's supported PostCSS integration.                                          |
| `postcss`                | Build-time stylesheet processing required by the Tailwind integration.             |
| `eslint`                 | Static code-quality and accessibility checks.                                      |
| `eslint-config-next`     | Matching Next.js, React and TypeScript lint rules.                                 |
| `prettier`               | Consistent formatting across source, configuration and content.                    |
| `vitest`                 | Fast unit tests for utilities and the later typed kinematics module.               |
| `@playwright/test`       | Production browser smoke tests and responsive checks.                              |
| `@axe-core/playwright`   | Automated accessibility checks inside browser tests.                               |

No 3D, MDX, mail, analytics or charting library is loaded before its implementation phase. Platform SVG and CSS remain the default for diagrams and simple motion.

## Environment

Copy `.env.example` to `.env.local`. Empty optional values are treated as absent. `src/config/env.ts` validates server configuration without printing secret values. Secrets never use a `NEXT_PUBLIC_` prefix.

| Variable                         | Required | Purpose                                                                 |
| -------------------------------- | -------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | No       | Canonical origin; defaults to `https://macakr.me`.                      |
| `GITHUB_TOKEN`                   | No       | Later server-only GitHub statistics requests.                           |
| `RESEND_API_KEY`                 | No       | Later contact delivery through Resend.                                  |
| `CONTACT_FROM_EMAIL`             | No       | Later verified sender email address.                                    |
| `CONTACT_TO_EMAIL`               | No       | Later contact-form recipient email address.                             |
| `UPSTASH_REDIS_REST_URL`         | No       | Later shared rate limiter; requires its matching token.                 |
| `UPSTASH_REDIS_REST_TOKEN`       | No       | Later Upstash authentication; requires its matching URL.                |
| `TURNSTILE_SECRET_KEY`           | No       | Later server-side challenge verification; requires the public site key. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | No       | Later browser challenge configuration; requires the secret key.         |
| `DEPLOYED_AT`                    | No       | Verified deployment timestamp in ISO 8601 format for footer telemetry.  |
| `VERCEL_GIT_COMMIT_SHA`          | No       | Commit metadata supplied automatically by Vercel.                       |

Optional integrations are inactive in Phase 1. Their environment entries reserve validated names and do not imply that delivery, statistics or challenges are implemented.

## Security and deployment

Headers disable MIME sniffing, framing, camera, microphone, geolocation, payment and USB access. Production hosts enable HSTS and block mixed content; loopback hosts retain HTTP support for production preview and Safari testing. CSP permits same-origin assets and blocks remote scripts, frames, plugins and cross-origin form actions. Inline script/style allowances support Next.js hydration and the pre-paint theme script; production does not permit `unsafe-eval`. A nonce policy would require per-request rendering and coordinating the theme script's nonce. Reassess the policy when adding external media, analytics or Turnstile.

The root `CNAME` records the existing GitHub Pages domain, `macakr.me`. The planned server-rendered site needs Vercel or another Next.js server runtime: GitHub Pages cannot execute the future contact endpoint, server statistics or dynamic OG rendering. Import this repository into Vercel only after deployment is approved, select the Next.js preset and add `macakr.me` in the project's Domains settings. Apply the DNS records Vercel provides for that specific project; do not guess record targets or move existing DNS before verification. No DNS changes have been made.

Resend's sender verification and the DNS guide for SPF, DKIM and DMARC belong to the contact/deployment phase. Use the exact records issued by the verified email provider and domain configuration. No delivery claim is made before verification.

## Fill before launch

- Confirm the Anadolu University AI-assisted coding qualification: associate degree or second bachelor's degree.
- Supply Turkish and English CV PDFs, or explicitly choose to omit the download action.
- Supply a photo, or keep the MAC monogram fallback.
- Confirm availability text, or keep it absent.
- Confirm YouTube, Instagram and X profile URLs, or keep those links absent.
- Confirm the RecoverTick crates.io name and publication status; keep download/version statistics absent until verified.
- For each competition project, supply competition name, year, personal role, status and result, or explicitly leave the result absent.
- Review the now/building/learning panel content, or leave it absent.
- Optionally supply two or three visual reference sites and the principles to take from each.
- Optionally supply AI video sources and posters; otherwise use clearly labelled illustrative posters.
- Optionally supply a compressed shoulder model with `bone`, `ligament` and `muscle` mesh names; otherwise use the labelled illustrative geometry.
- Review the Turkish and English starter article copy when the blog phase is implemented.
- Review the privacy notice with legal counsel before enabling contact collection.
- Configure and verify contact delivery and optional anti-abuse integrations before launch.
- Complete the production accessibility, browser and performance measurements before publishing.

Edit author content in `src/config/site.ts` rather than scattering personal facts through components. Blog-authoring and model-replacement instructions are added alongside those working features in their respective phases.
