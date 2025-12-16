from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.routes.deals import router as deals_router
from app.exceptions import (
    bad_credentials_handler,
    token_expired_handler,
    external_service_handler,
)
from app.errors import BadCredentialsError, ExternalTokenExpiredError, ExternalServiceError

FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

app = FastAPI(title="Site Crawler API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(BadCredentialsError, bad_credentials_handler)
app.add_exception_handler(ExternalTokenExpiredError, token_expired_handler)
app.add_exception_handler(ExternalServiceError, external_service_handler)

app.include_router(deals_router, prefix="/deals", tags=["deals"])
