from ..core.supabase import supabase_client


def create_ingredient_entry():
    data = supabase_client.table("ingredient")


def upsert_ingredient(
    name: str, description: str | None = None, category: str | None = None
):
    data = (
        supabase_client.table("ingredients")
        .upsert(
            {"name": name, "description": description, "category": category},
            on_conflict="name",
        )
        .execute()
    )
    return data.data[0]["id"]


def read_ingredient_entry():
    data = supabase_client.table("ingredients").select("*").execute()
    return data


def update_ingredient_entry(): ...


def delete_ingredient_entry(): ...
