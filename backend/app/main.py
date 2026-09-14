import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .core.errors import RequestIDMiddleware, register_error_routes, register_exception_handlers
from .routes.health import router as health_router
from .routes.ingredients import router as ingredient_router

app = FastAPI()

app.include_router(health_router)
app.include_router(ingredient_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(RequestIDMiddleware)

register_exception_handlers(app)
register_error_routes(app)


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000)
