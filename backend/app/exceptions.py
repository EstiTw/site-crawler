from fastapi import Request
from fastapi.responses import JSONResponse

from app.services.auth_service import BadCredentialsError
from app.services.deals_service import ExternalTokenExpiredError
from app.services.http_client import ExternalServiceError


async def bad_credentials_handler(_: Request, exc: BadCredentialsError):
    return JSONResponse(status_code=401, content={"detail": str(exc)})


async def token_expired_handler(_: Request, __: ExternalTokenExpiredError):
    return JSONResponse(
        status_code=401,
        content={"detail": "Token expired. Please login again."},
    )


async def external_service_handler(_: Request, exc: ExternalServiceError):
    return JSONResponse(status_code=502, content={"detail": str(exc)})
