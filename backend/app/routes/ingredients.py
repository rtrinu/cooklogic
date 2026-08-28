from fastapi import APIRouter

from ..ingestion.usda import search_foods
from ..schemas.ingredient import USDASummary

router = APIRouter()


@router.get("/api/ingredients/{query}", response_model=list[USDASummary])
async def get_usda_ingredient(query: str):
    return await search_foods(query)
