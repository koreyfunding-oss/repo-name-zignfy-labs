This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | Yes (Vercel) | OpenAI API key. When set, the app uses OpenAI instead of Ollama. Required for cloud/Vercel deployments. |
| `OPENAI_MODEL` | No | OpenAI model (default: `gpt-4o-mini`). |
| `OPENAI_BASE_URL` | No | Override the OpenAI-compatible base URL (e.g. Azure OpenAI). Defaults to `https://api.openai.com`. |
| `OLLAMA_BASE_URL` | No | Ollama base URL for local development (default: `http://localhost:11434`). |
| `OLLAMA_MODEL` | No | Ollama model for local development (default: `llama3`). |
| `NEXT_PUBLIC_SQUARE_CHECKOUT_URL` | Yes | Square hosted checkout URL that redirects back to `/unlock?success=true`. |

## Deploy on Vercel

This app lives inside a monorepo at `apps/ai-cold-email-generator`. A
`vercel.json` at the repository root already configures the correct build
and output settings, so Vercel will pick everything up automatically when
you import the repository.

### Steps

1. Push the repository to GitHub (or it may already be there).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel will auto-detect the `vercel.json` configuration — no extra
   settings needed in the dashboard.
4. Add the following **Environment Variables** in the Vercel project settings:

   | Variable | Value |
   |---|---|
   | `OPENAI_API_KEY` | Your OpenAI API key |
   | `OPENAI_MODEL` | `gpt-4o-mini` (or another model) |
   | `NEXT_PUBLIC_SQUARE_CHECKOUT_URL` | Your Square checkout URL |

5. Deploy. Vercel will install dependencies, build the Next.js app, and serve it.

> **Note:** On Vercel the app uses the OpenAI API (set via `OPENAI_API_KEY`)
> instead of a local Ollama instance because Ollama requires a locally-running
> server. For local development, leave `OPENAI_API_KEY` unset and start
> Ollama as normal.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
