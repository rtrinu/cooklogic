# AGENTS.md

## Status

Early build — `frontend/` has a working Next.js landing scaffold; `backend/` has working
USDA ingredient ingestion. Core product logic (recipes, ranking, substitutions, auth UX)
is not built yet. Verify commands before trusting them; update this file as conventions
are established.

## Project direction

- **CookLogic** — web app that turns ingredients the user has into personalised meals,
  ranked to maximise ingredient usage while satisfying constraints (calorie/protein targets,
  servings, cooking time, dietary requirements).
- Core MVP flow: user enters ingredients + constraints → system finds/ranks suitable meals →
  deterministic nutrition calculation → explains substitutions → displays recipe.
- Key differentiators (should guide all decisions):
  - Nutrition & optimisation must be **deterministic** (math over real USDA/Open Food Facts data),
    NOT LLM-derived. LLM is only for NL ingredient parsing, recipe modification, cooking instructions.
  - Ingredient substitution engine based on functional role, flavour compatibility, and
    nutritional properties — not generic replacements.
- Planned stack:
  - Frontend: Next.js / TypeScript (Next 16, App Router, Tailwind v4) — installed and
    buildable (landing page lives in `frontend/app/page.tsx`; components in `frontend/components/`).
  - Backend: FastAPI / Python (uv-managed)
  - Data: Supabase (PostgreSQL, Auth, RLS for per-user data access)
  - Nutrition data: USDA FoodData Central, Open Food Facts
  - Optimisation: Python; possibly pgvector for semantic ingredient matching later.

## Layout

- `frontend/` — Next.js app root. `package.json` (name `app`, `"type": "module"`, scripts
  `dev`/`build`/`start`/`lint` → `next`/`eslint`; Next 16.3, React 19, Tailwind v4).
  App Router dir is `frontend/app/`, shared components in `frontend/components/`,
  `@/*` alias maps to `frontend/`. Package manager: **npm**.
- `backend/` — uv project (`cooklogic-backend`, `requires-python >=3.12`). Source goes in
  `backend/app/`, tests in `backend/tests/`. `.venv/` is git-ignored.
- `.env.example` — Supabase keys (`SUPABASE_URL`, `SUPABASE_ANON_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY`). Copy to `.env` (git-ignored); never commit secrets.

## Commands

- Backend deps: `uv add <pkg>`; sync/install: `uv sync`; run: `uv run <cmd>` (from `backend/`).
- Frontend deps: `npm install` (from `frontend/`).
- No lint/typecheck/test commands configured yet — add and verify them before writing here.
