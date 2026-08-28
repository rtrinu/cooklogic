import uvicorn
from fastapi import FastAPI

from .routes.ingredients import router as ingredient_router

app = FastAPI()

app.include_router(ingredient_router)


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000)
