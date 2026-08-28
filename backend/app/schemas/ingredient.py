from pydantic import BaseModel


class USDASummary(BaseModel):
    source: str
    source_id: int
    description: str = ""
    protein: float = 0.0
    carbs: float = 0.0
    fat: float = 0.0
    fiber: float = 0.0
    sugar: float = 0.0
    saturated_fat: float = 0.0
    sodium: float = 0.0
    calories: float = 0.0


NUTRIENT_IDS = {
    "protein": 1003,
    "carbs": 1005,
    "fat": 1004,
    "fiber": 1079,
    "sugar": 2000,
    "saturated_fat": 1258,
    "sodium": 1093,
    "calories": 1008,
}
