# ChatGPT Slides Prompt Generator (SlidePrompt.ai)

Free, zero-latency client-side **ChatGPT Slides Prompt Generator** and **36+ Programmatic SEO Presentation Blueprints** built for OpenAI's **ChatGPT Slides** release (October 16, 2026).

## Architecture Highlights
- **100% Client-Side MVP (Zero API Cost / No Backend)**: Pure JavaScript template composition (`src/app.js`). Requires no OpenAI API key, no database, and no user sign-up.
- **Apple Design Fluid Motion & Craft (`src/styles.css` & `src/app.js`)**:
  - Instant pointer-down response (`:active` scale feedback).
  - Interruptible critically-damped & momentum spring physics (`animateSpring`) with 1:1 Pointer Events drag tracking, velocity handoff, exponential-decay momentum projection (`project(v, 0.998)`), and boundary rubber-banding on the Saved Prompts drawer.
  - Translucent floating materials (`backdrop-filter: blur(20px) saturate(180%)`) and size-specific optical typography tracking/leading.
  - Full support for `prefers-reduced-motion`, `prefers-reduced-transparency`, and `prefers-contrast`.
- **GeFei Overseas SEO Blueprint (`scripts/build.mjs`)**:
  - **44 Static HTML Pages** generated at build time (`/` + `/chatgpt-slides-prompt-generator` + `/chatgpt-slides-templates` + `/chatgpt-slides-to-powerpoint` + `/chatgpt-slides-not-showing` + **36 `/prompts/[slug]` niche pages** + subdirectory i18n `/es/`, `/ja/`, `/zh-TW/`).
  - Core interactive tool strictly **Above the Fold** on every landing page.
  - Self-referencing Canonical URLs, `hreflang` matrix, `WebApplication` + `FAQPage` JSON-LD Schema, `sitemap.xml`, and `robots.txt`.

## Build & Deploy

```bash
npm run build
npx wrangler pages deploy dist --project-name chatgpt-slides-prompt-generator
```
