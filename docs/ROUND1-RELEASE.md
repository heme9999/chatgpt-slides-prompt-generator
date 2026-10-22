# Round 1: validate three presentation workflows

Scope: focused homepage paths, pitch/project-update/lesson examples in four UI languages, optional local source notes, opt-in aggregate event counts. Existing routes, canonical and hreflang strategy are preserved; no new SEO landing pages.

## Data boundaries
Source notes (max 6,000 characters) are inserted into the prompt and persisted only when users save a configuration locally. Legacy saved configurations restore empty notes. Notes are not sent to analytics. Manual edits retain the existing notice: saving restores parameters, not edited prompt text.

Analytics is off by default. The preference is stored locally; Do Not Track or GPC overrides it. The same-origin POST /api/events accepts exactly event/template/lang, rejects other fields and limits request bodies to 512 bytes. It writes no IP, user agent, referrer, URL, topic, notes or prompt, and uses no visitor ID. Existing Worker observability is preserved; the application never logs event payloads or request headers. Cloudflare still processes network metadata for delivery.

Dataset: slideprompt_usage. blob1=event, blob2=template, blob3=UI language, double1=count. Events: template_select, example_load, generate (debounced input), copy (successful), download (browser action, not proof the user opened a file), save, open_chatgpt (click, not successful deck creation). Counts cover opted-in browsers only; they are not unique users or conversion rates. A short client cooldown reduces duplicate clicks but is not bot protection. Same-origin checks and strict validation are defense in depth; counts can still be inflated and must not drive billing.

## Reading the counts
Use the account's Cloudflare Analytics Engine SQL API with an authorized token; do not embed that token in client code. Example query:

```sql
SELECT blob1 AS event, blob2 AS template, blob3 AS language,
       SUM(_sample_interval * double1) AS event_count
FROM slideprompt_usage
WHERE timestamp > NOW() - INTERVAL '7' DAY
GROUP BY event, template, language
ORDER BY event_count DESC
```

See https://developers.cloudflare.com/analytics/analytics-engine/get-started/ for the authorized SQL API. Sampling means these may be estimates. No metrics dashboard is publicly exposed.

## Deploy
Use Workers Static Assets, not Pages. Configure the USAGE Analytics Engine binding via wrangler.jsonc; its dataset is created on first write. If the account cannot support the binding, stop and resolve it rather than claiming counts work. Static pages remain asset-first; only /api/events is routed through code. Prior version and traffic split must be recorded before release. Upload from a clean temporary asset directory to avoid sync conflicts. Confirm production pages and module hashes, API validation, notes persistence and desktop/mobile rendering after deployment. Do not upload keys, local downloads or test artifacts to GitHub.
