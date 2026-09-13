import httpx
from postgrest.exceptions import APIError

from ..schemas.ingredient import USDASummary
from ..crud.ingredients import upsert_ingredient
from ..crud.nutrition import upsert_nutrition

FIELD_MAP = {
    "protein": "protein_per_100g",
    "carbs": "carbs_per_100g",
    "fat": "fat_per_100g",
    "fiber": "fiber_per_100g",
    "sugar": "sugar_per_100g",
    "saturated_fat": "saturated_fat_per_100g",
    "sodium": "sodium_mg_per_100g",
    "calories": "calories_per_100g",
}


def _nutrition_values(item: USDASummary) -> dict[str, float]:
    return {column: getattr(item, field) for field, column in FIELD_MAP.items()}


def ingest_usda_results(results: list[USDASummary]) -> dict:
    saved = []
    errors = []
    for item in results:
        try:
            ingredient_id = upsert_ingredient(
                name=item.description, description=item.description
            )
            upsert_nutrition(
                ingredient_id=ingredient_id,
                source=item.source,
                source_id=item.source_id,
                values=_nutrition_values(item),
            )
            saved.append(
                {
                    "id": ingredient_id,
                    "name": item.description,
                    "source": item.source,
                    "source_id": item.source_id,
                }
            )
        except APIError as e:
            errors.append(f"{item.description}: {e.message}")
        except httpx.HTTPError:
            errors.append(f"{item.description}: network error")
    return {"saved": saved, "errors": errors}
