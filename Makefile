# ── Development ──────────────────────────────────────────────
dev: dev-fe dev-be ## Run frontend and backend

dev-fe: ## Run frontend dev server
	cd frontend && npm run dev

dev-be: ## Run backend dev server
	cd backend && uv run uvicorn app.main:app --reload