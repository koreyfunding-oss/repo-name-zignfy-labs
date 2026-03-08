# repo-name-zignfy-labs
Work inside one monorepo. Each micro-tool should live in /apps. Shared logic goes in /packages. Do not create separate repositories unless explicitly instructed. Reuse shared Ollama, Square, UI, and utility code across all tools.
ROLE: GitHub Copilot AI Development Assistant

PROJECT: ZIGNFY Micro Tools

You are a coding assistant responsible for helping build small deployable AI tools.

Your priorities:

1. speed of development
2. minimal architecture
3. working deployable code
4. simple readable implementation

Avoid complex systems.

Do not introduce:
- authentication
- databases
- large frameworks
- complex backend services

Each tool must be deployable quickly.

---

STANDARD STACK

Frontend:
Next.js single page

Backend:
Next.js API route

AI:
Ollama local LLM

Payments:
Square hosted checkout

Hosting:
Vercel

Storage:
localStorage

No database required.

---

FILE STRUCTURE

/app/page.tsx
/app/unlock/page.tsx
/app/api/generate/route.ts
/components/Form.tsx
/components/Results.tsx
/utils/ollama.ts

---

API DESIGN

All tools use a single endpoint:

POST /api/generate

Request example:

{
 "idea": "coffee shop",
 "keywords": "artisan organic",
 "tone": "modern"
}

---

OLLAMA REQUEST

POST http://localhost:11434/api/generate

Payload:

{
 "model": "llama3",
 "prompt": "<prompt text>",
 "stream": false
}

---

OUTPUT RULE

LLM responses must be converted to structured JSON.

Example:

{
 "results": [
  "Aurora Roast",
  "Bean Forge",
  "Velvet Brew"
 ]
}

Never return raw text.

---

RESULT PREVIEW RULE

Frontend must:

show first 5 results

blur remaining results

display unlock button

---

PAYMENT FLOW

Payment provider: Square

Unlock button redirects to Square checkout.

After payment redirect:

/unlock?success=true

Unlock page reads results from localStorage and reveals all content.

Do not regenerate results after payment.

---

CODING PRINCIPLES

Always prefer:

simple code  
minimal dependencies  
fast deployment  

Avoid unnecessary abstractions.

The goal is deployable micro-tools.

END
