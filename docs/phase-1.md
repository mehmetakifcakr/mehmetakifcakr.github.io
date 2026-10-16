# Phase 1 handoff

Validated on 17 October 2026 in Europe/Istanbul.

The redesign starts from `mehmetakifcakr/mehmetakifcakr.github.io`, whose existing `CNAME` points to `macakr.me`. Its original default branch contained only `README.md` and `CNAME`. The older interface in `mehmetakifcakr/mehmetakifcakir.github.io` was reviewed as context; no remote image, stock video, cursor trail, blocking loader or competition result was carried into this implementation.

## Delivered

- A text-led introduction with a labelled conceptual robot-arm drawing and direct project/contact actions.
- Two verified repository entries, concise education information and the current profile's contact links.
- A complete dark palette and a separate drafting-paper light palette, responsive navigation, scrollspy, language switching, three theme choices, Full/Lite effects, optional fine-pointer smooth scrolling and a keyboard command palette loaded on demand.
- Static Turkish and English HTML, metadata, linked data, strict configuration, production headers and a CI workflow.
- Missing CVs, social links, photo, degree type, competition details and publication data remain `null` in configuration and are omitted from the interface.

## Validation

| Check               | Result                                                          |
| ------------------- | --------------------------------------------------------------- |
| `pnpm typecheck`    | Passed                                                          |
| `pnpm lint`         | Passed, zero warnings                                           |
| `pnpm build`        | Passed, static `/tr` and `/en`                                  |
| `pnpm format:check` | Passed                                                          |
| `pnpm test`         | Four checks passed                                              |
| `pnpm test:e2e`     | 30 checks passed across Chromium, Firefox and mobile WebKit     |
| Viewport widths     | 360, 768, 1280 and 1920 px passed                               |
| JavaScript disabled | Content and mobile navigation passed in all three engines       |
| Axe                 | Dark and light modes passed in all three engines                |
| Reduced motion      | Stored Full preference is overridden in all three engines       |
| HTTPS policy        | Enforced for `macakr.me`, with loopback HTTP previews supported |
| `pnpm check:bundle` | 173,153 bytes gzip against a 200,000-byte budget                |

The JavaScript calculation counts modern initial external scripts plus inline executable content. Browsers that support modules do not download the separate legacy `noModule` file. Deferred command-palette and smooth-scroll chunks are absent from initial HTML; no 3D chunk exists yet.

The production mobile Lighthouse run with **real-time DevTools throttling** scored **98 Performance / 100 Accessibility / 100 Best Practices / 100 SEO**, with **1.61 s LCP**, **0 CLS** and **114 ms total blocking time**. Its LCP element is the heading. These are local laboratory results, not field measurements. An earlier default Lantern simulation estimated roughly 3.13 s LCP; this model and actual throttled timing are distinct measurements. Repeat both profiles against the deployed origin during the final performance pass. Field INP and physical iOS Safari remain launch verification items; Playwright WebKit emulation does not establish physical-device coverage.

Firefox 157 on the local macOS 27 host requires isolated application data because of [Playwright issue 42768](https://github.com/microsoft/playwright/issues/42768). The successful run used a fresh temporary `CFFIXED_USER_HOME`; neither system permissions nor the real home directory changed. Ubuntu CI runs normally.

Local screenshots are generated in `artifacts/phase-1/{chromium,firefox,webkit}/`. They are excluded from Git. The `tr-dark.png` and `tr-light.png` files show the hero; the files named by viewport width show the whole page.

## Files

```text
.env.example
.github/workflows/ci.yml
.gitignore
.prettierignore
.prettierrc.json
docs/phase-1.md
eslint.config.mjs
next-env.d.ts
next.config.ts
package.json
playwright.config.ts
pnpm-lock.yaml
pnpm-workspace.yaml
postcss.config.mjs
public/icon.svg
README.md
scripts/check-bundle.mjs
src/app/[locale]/error.tsx
src/app/[locale]/layout.tsx
src/app/[locale]/not-found.tsx
src/app/[locale]/page.tsx
src/app/globals.css
src/components/blueprint-arm.tsx
src/components/command-palette.tsx
src/components/contact-links.tsx
src/components/providers.tsx
src/components/site-footer.tsx
src/components/site-header.tsx
src/components/ui/dialog.tsx
src/config/env.ts
src/config/site.ts
src/i18n/navigation.ts
src/i18n/request.ts
src/i18n/routing.ts
src/lib/device.test.ts
src/lib/device.ts
src/lib/utils.ts
src/messages/en.json
src/messages/tr.json
src/proxy.ts
tests/foundation.spec.ts
tsconfig.json
vitest.config.ts
```

`CNAME` is retained from the original repository. Dependencies and their one-line reasons, optional environment variables and the complete Fill before launch list are in the README.

## Run and continue

Use Node.js 24 and pnpm 11.25.0. Run `pnpm install`, then `pnpm dev` and open `/tr` or `/en`. For production preview, run `pnpm build` followed by `pnpm start`.

Phase 2 adds the procedural 6-DOF robot arm, typed FK/IK, joint limits, tested kinematics and device-aware fallbacks. Later phases add the interactive skills, competition case studies, server statistics, MDX blog and contact delivery. Await the author's `continue` instruction before beginning Phase 2. No production deployment or DNS change has been performed.
