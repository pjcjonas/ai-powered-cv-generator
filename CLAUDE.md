@AGENTS.md

# CV Generator — Agent Guide

## What this project is

A stateless Next.js 16 web app: LinkedIn profile (paste or PDF) + job posting → GPT-4o generates a tailored, printable CV. No auth, no database.

## Stack

- **Next.js 16** — App Router, Turbopack (default). No webpack config.
- **TypeScript + Zod 4** — `z.toJSONSchema()` (not `z.toJsonSchema()`).
- **Tailwind CSS 4**
- **OpenAI SDK** (`openai` package) — GPT-4o tool calling for structured CV output.
- **pdf-parse 2** — class-based API (`new PDFParse({ data })`), not the old function-style.

## Key files

| File | Purpose |
|---|---|
| `src/lib/claude.ts` | OpenAI client + `generateCV()` using tool calling |
| `src/lib/schema.ts` | Zod schema for CV output; pass to OpenAI as `parameters` |
| `src/lib/types.ts` | All TypeScript interfaces (`CVData`, `WizardState`, etc.) |
| `src/lib/parse-pdf.ts` | PDF text extraction via `PDFParse` class |
| `src/app/api/generate-cv/route.ts` | CV generation API route |
| `src/app/api/parse-linkedin/route.ts` | LinkedIn input API route (text + PDF; nodejs runtime) |
| `src/lib/template-registry.ts` | Maps `TemplateId` to template component |
| `src/components/templates/CVTemplateBase.tsx` | Shared template logic (single/two-column) |
| `src/app/preview/page.tsx` | CV preview with template switcher + print button |
| `src/app/page.tsx` | 4-step wizard shell |
| `src/hooks/useWizardState.ts` | Reducer-based wizard state |

## Environment variables

| Variable | Required | Default |
|---|---|---|
| `OPENAI_API_KEY` | Yes | — |
| `OPENAI_MODEL` | No | `gpt-4o` |

## Running locally

```bash
# Add OPENAI_API_KEY to .env.local, then:
npm run dev
```

## Important constraints

- `next.config.ts` uses `serverExternalPackages: ["pdf-parse"]` — required for pdf-parse to work in Next.js.
- The `parse-linkedin` API route must stay on `nodejs` runtime (`export const runtime = "nodejs"`) for pdf-parse.
- `LinkedInMethod` is `"text" | "pdf"` — the URL/scraper method was intentionally removed.
- Do not add the LinkedIn URL scraper back; it was removed because LinkedIn blocks automated fetching.
- The OpenAI tool call returns JSON that is parsed with `JSON.parse()` then validated with `CVDataSchema.parse()`.
