from supabase import create_client
from ..core.config import settings

supabase_client = create_client(
    supabase_url=settings.supabase_url,
    supabase_key=settings.supabase_service_role_key,
)
