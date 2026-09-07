from ..core.supabase import supabase_client


def upsert_nutrition(ingredient_id: int, source: str, source_id: int, values: dict):
    supabase_client.table("nutrition").upsert(
        {
            "ingredient_id": ingredient_id,
            "source": source,
            "source_id": str(source_id),
            **values,
        },
        on_conflict="source, source_id",
    ).execute()
