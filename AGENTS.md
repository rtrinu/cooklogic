# AGENTS.md

## Status

Greenfield repo — no source code, manifests, or config yet. Only `README.md` exists.
Re-verify everything below against the actual codebase once code lands; nothing here is
verified. Update this file as conventions are established.

## Project direction (planned, unverified)

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
- Planned stack (nothing installed yet):
  - Frontend: Next.js / TypeScript
  - Backend: FastAPI / Python
  - Data: Supabase (PostgreSQL, Auth, RLS for per-user data access)
  - Nutrition data: USDA FoodData Central, Open Food Facts
  - Optimisation: Python; possibly pgvector for semantic ingredient matching later.

## Getting started (empty today)

No install/build/test commands exist yet. When the stack is scaffolded, add the real
commands here (dev servers, lint, typecheck, test) and verify them before writing them down.
