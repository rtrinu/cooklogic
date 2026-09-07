from fastapi import APIRouter

from ..crud.ingredients import read_ingredient_entry
from ..services.ingestion import ingest_usda_results
from ..ingestion.usda import search_foods
from ..schemas.ingredient import USDASummary

router = APIRouter()


@router.get("/api/ingredients/{query}", response_model=list[USDASummary])
async def get_usda_ingredient(query: str):
    return await search_foods(query)


@router.get("/ingredients")
async def get_ingredients():
    return read_ingredient_entry()


@router.get("/ingredients/ingest")
async def ingest_ingredients(query: str):
    data = await get_usda_ingredient(query)
    return ingest_usda_results(data)
