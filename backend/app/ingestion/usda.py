import httpx
from fastapi import HTTPException

from ..core.config import settings
from ..schemas.ingredient import NUTRIENT_IDS, USDASummary


async def search_ingredients(query: str, dataType: list[str] | None = None) -> dict:
    dataType = dataType or ["Foundation"]
    async with httpx.AsyncClient() as client:
        r = await client.get(
            settings.usda_search_endpoint,
            params={
                "query": query,
                "api_key": settings.usda_api_key,
                "dataType": dataType,
            },
        )
        r.raise_for_status()
        return r.json()


def get_value(values: dict, nutrient_id: int) -> float:
    return max(0.0, values.get(nutrient_id, 0.0))


def nutrition_summary(food: dict) -> USDASummary:
    values = {
        n["nutrientId"]: n.get("value", 0.0)
        for n in food.get("foodNutrients", [])
        if "nutrientId" in n
    }

    nutrients = {
        name: get_value(values, nutrient_id)
        for name, nutrient_id in NUTRIENT_IDS.items()
        if name != "calories"
    }
    calories = max(0.0, values.get(1008) or values.get(2047) or 0.0)
    return USDASummary(
        source=food.get("dataType", "Foundation"),
        source_id=food.get("fdcId", 0),
        description=food.get("description", ""),
        calories=calories,
        **nutrients,
    )


async def search_foods(
    query: str, dataType: list[str] | None = None
) -> list[USDASummary]:
    try:
        data = await search_ingredients(query, dataType)
        return [nutrition_summary(food) for food in data.get("foods", [])]
    except httpx.HTTPStatusError as e:
        raise HTTPException(502, f"USDA upstream error {e.response.status_code}")
    except httpx.TimeoutException:
        raise HTTPException(504, "USDA lookup timed out")
    except httpx.HTTPError:
        raise HTTPException(502, "USDA lookup failed")
