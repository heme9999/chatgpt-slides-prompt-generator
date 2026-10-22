# Round 1: validate three presentation workflows

Scope: focused homepage paths, pitch/project-update/lesson examples in four UI languages, optional local source notes, opt-in aggregate event counts. Existing routes, canonical and hreflang strategy are preserved; no new SEO landing pages.

## Data boundaries
Source notes (max 6,000 characters) are inserted into the prompt and persisted only when users save a configuration locally. Legacy saved configurations restore empty notes. Notes are not sent to analytics. Manual edits retain the existing notice: saving restores parameters, not edited prompt text.

Analytics is off by default. The preference is stored locally; Do Not Track or GPC overrides it. The same-origin POST /api/events accepts exactly event/template/lang, rejects other fields and limits request bodies to 512 bytes. It writes no IP, user agent, referrer, URL, topic, notes or prompt, and uses no visitor ID. Existing Worker observability is preserved; the application never logs event payloads or request headers. Cloudflare still processes network metadata for delivery.

Database: slideprompt-usage. Table usage_counts stores UTC day/event/template/lang/count only, using an atomic UPSERT. Events: template_select, example_load, generate (debounced input), copy (successful), download (browser action), save and open_chatgpt (click, not deck creation). Counts cover opted-in browsers only and are not unique users or conversion rates. A short client cooldown reduces duplicates but is not bot protection. Counts can be inflated and must not drive billing.

## Reading counts
Run with an authorized Cloudflare account:

```sh
CLOUDFLARE_ACCOUNT_ID=dcb7b7a33a34b85d7bdf6ba4c01af700 npx wrangler d1 execute slideprompt-usage --remote --command "SELECT event, template, lang, SUM(count) AS events FROM usage_counts WHERE day >= date('now','-7 days') GROUP BY event, template, lang ORDER BY events DESC"
```

No public metrics dashboard or credentials are exposed. Daily anonymous aggregates have no automatic expiry. Schema is in db/schema.sql. API request bodies are capped, validated and never logged by application code.

## Deploy
Use Workers Static Assets, not Pages. The USAGE binding points to a dedicated D1 database. Apply db/schema.sql before deploying. Analytics Engine was not enabled on this account; no Analytics Engine dataset is required. Static pages remain asset-first; only /api/events is routed through code. Prior version and traffic split must be recorded before release. Upload from a clean temporary asset directory to avoid sync conflicts. Confirm production pages and module hashes, API validation, notes persistence and desktop/mobile rendering after deployment. Do not upload keys, local downloads or test artifacts to GitHub.

## Execution record — 2026-10-22

- Initial local regression: 146 checks passed; new API privacy tests passed.
- First production release used D1 after Analytics Engine deployment was rejected as not enabled; the rejected deployment did not replace the old live version.
- Prior stable version: f5fdb055-ad04-4659-b064-3b307eda2f82 (100%). First successful round-one version: 0ead0de3-83ab-4176-8084-6a48bf8436b9.
- Production browser test covered 12 localized examples, notes inclusion and saved-note recovery, opt-in/withdrawal behavior with intercepted analytics requests, and desktop/mobile screenshots. Browser-test statistics were intercepted rather than stored.
- Separate real API acceptance: valid event returned 204; additional notes field returned 400. D1 was inspected to verify the five aggregate fields; the single synthetic count was deducted afterwards.
- Post-deploy visual review identified mobile navigation crowding and a buried usage choice. Follow-up simplifies header navigation while keeping all routes linked, puts the choice beside tool actions, shortens home introductions, stabilizes worked-example layout, uses real line breaks, and updates lastmod for edited pages.
- Full regression after follow-up: 146 checks passed plus the round-one API/static tests. Final browser and production checks are recorded by the deploying assistant in the delivery message.
- Real hardware and actual ChatGPT deck generation/export remain outside the test scope. No traffic or revenue claims are inferred from these tests.

Final full-site production audit found three existing locale homepages redirected from trailing-slash URLs to Cloudflare's slashless URLs. The follow-up aligns sitemap, canonical, hreflang, internal home links, saved-home routing and alias targets with /es, /ja and /zh-TW; old slash URLs still resolve through Cloudflare's existing normalization redirects. No content pages are removed.
