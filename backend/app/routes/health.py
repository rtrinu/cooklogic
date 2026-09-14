from fastapi import APIRouter
from fastapi.responses import JSONResponse
from httpx import Client, RequestError

from ..core.config import settings
from ..core.supabase import supabase_client

router = APIRouter()


def _database_ok() -> bool:
    try:
        supabase_client.table("ingredients").select("id").limit(1).execute()
        return True
    except Exception:
        return False


def _auth_ok() -> bool:
    try:
        with Client(timeout=3) as client:
            response = client.get(
                f"{settings.supabase_url}/auth/v1/health",
                headers={"apikey": settings.supabase_service_role_key},
            )
            return response.status_code == 200
    except (RequestError, ValueError):
        return False


@router.get("/")
def root() -> JSONResponse:
    return JSONResponse(
        content={
            "app": settings.app_name,
            "docs": "/docs",
            "health": "/health",
        }
    )


@router.get("/health")
def health() -> JSONResponse:
    database = _database_ok()
    auth = _auth_ok()
    return JSONResponse(
        status_code=200 if database else 503,
        content={
            "status": "ok" if database else "degraded",
            "database": database,
            "auth": auth,
        },
    )