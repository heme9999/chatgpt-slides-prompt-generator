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
