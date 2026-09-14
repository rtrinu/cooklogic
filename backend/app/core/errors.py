import logging
import uuid
from typing import Any

from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

logger = logging.getLogger("cooklogic")


class AppError(Exception):
    """Base class for domain errors. Subclass it to raise structured errors."""

    def __init__(
        self,
        message: str,
        status_code: int = 500,
        code: str = "app_error",
        details: dict[str, Any] | None = None,
    ) -> None:
        self.message = message
        self.status_code = status_code
        self.code = code
        self.details = details
        super().__init__(message)


class RequestIDMiddleware:
    def __init__(self, app: Any) -> None:
        self.app = app

    async def __call__(self, scope: dict[str, Any], receive: Any, send: Any) -> None:
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        request_id = uuid.uuid4().hex[:12]
        scope.setdefault("state", {})["request_id"] = request_id

        async def send_wrapper(message: dict[str, Any]) -> None:
            if message["type"] == "http.response.start":
                headers = list(message.get("headers", []))
                headers.append((b"x-request-id", request_id.encode()))
                message["headers"] = headers
            await send(message)

        await self.app(scope, receive, send_wrapper)


def _request_id(request: Request) -> str:
    return str(request.scope.get("state", {}).get("request_id", ""))


def _error_body(
    code: str,
    message: str,
    request_id: str,
    details: Any = None,
) -> dict[str, Any]:
    return {
        "error": {
            "code": code,
            "message": message,
            "details": details,
            "request_id": request_id,
        }
    }


async def app_error_handler(request: Request, exc: AppError) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content=_error_body(exc.code, exc.message, _request_id(request), exc.details),
    )


async def http_exception_handler(request: Request, exc: HTTPException) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content=_error_body("http_error", str(exc.detail), _request_id(request)),
    )


async def validation_error_handler(
    request: Request, exc: RequestValidationError
) -> JSONResponse:
    details: dict[str, str] = {}
    for error in exc.errors():
        loc = error.get("loc", [])
        field = str(loc[-1]) if loc else "_"
        details.setdefault(field, error.get("msg", "Invalid value"))
    return JSONResponse(
        status_code=422,
        content=_error_body(
            "validation_error",
            "Request body is invalid",
            _request_id(request),
            details,
        ),
    )


async def unhandled_error_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.exception(
        "Unhandled error on %s %s",
        request.method,
        request.url.path,
    )
    return JSONResponse(
        status_code=500,
        content=_error_body(
            "internal_error", "Something went wrong", _request_id(request)
        ),
    )


def register_exception_handlers(app: FastAPI) -> None:
    app.add_exception_handler(AppError, app_error_handler)
    app.add_exception_handler(HTTPException, http_exception_handler)
    app.add_exception_handler(RequestValidationError, validation_error_handler)
    app.add_exception_handler(Exception, unhandled_error_handler)


def register_error_routes(app: FastAPI) -> None:
    """Catch unmatched routes so their 404s use the same error envelope."""

    @app.api_route(
        "/{path:path}",
        methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
        include_in_schema=False,
    )
    async def not_found(request: Request) -> JSONResponse:
        return JSONResponse(
            status_code=404,
            content=_error_body("not_found", "Route not found", _request_id(request)),
        )