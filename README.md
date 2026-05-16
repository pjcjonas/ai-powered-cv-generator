# CV Generator

A stateless web app that takes your LinkedIn profile and a job posting, then uses GPT-4o to generate a tailored, printable CV — no accounts, no database.

## How it works

1. **Paste or upload** your LinkedIn profile (copy-paste text or upload the PDF export)
2. **Paste the job posting** you are applying for
3. **Pick a template** — Classic, Modern, or Minimal
4. **Generate** — GPT-4o rewrites your experience to match the job posting language and priorities
5. **Print / Save as PDF** directly from the browser

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| AI | OpenAI API — GPT-4o (tool calling) |
| PDF parsing | pdf-parse 2 |
| Validation | Zod 4 |

## Getting started

### Prerequisites

- Node.js 18+
- An [OpenAI API key](https://platform.openai.com/api-keys)

### Setup

```bash
# Install dependencies
npm install

# Copy the env template and add your key
cp .env.example .env.local
# Edit .env.local and set OPENAI_API_KEY=sk-...

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `OPENAI_API_KEY` | Yes | — | Your OpenAI API key |
| `OPENAI_MODEL` | No | `gpt-4o` | Override the model (e.g. `gpt-4o-mini`) |

## Project structure

```
src/
  app/
    api/
      generate-cv/    # Calls OpenAI and returns structured CV JSON
      parse-linkedin/ # Handles text paste and PDF upload
    preview/          # CV preview page with template switcher + print button
    page.tsx          # 4-step wizard shell
  components/
    templates/        # Classic, Modern, Minimal CV templates
    wizard/           # Step components (LinkedIn input, job posting, template, generate)
    ui/               # Shared UI primitives
  hooks/
    useWizardState.ts # Reducer-based wizard state
    useGenerateCV.ts  # CV generation hook
  lib/
    claude.ts         # OpenAI client and generateCV()
    schema.ts         # Zod schema for structured CV output
    types.ts          # TypeScript interfaces
    parse-pdf.ts      # PDF text extraction
```

## Scripts

```bash
npm run dev    # Start dev server (Turbopack)
npm run build  # Production build
npm run start  # Start production server
npm run lint   # Run ESLint
```
