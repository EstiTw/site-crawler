from app.errors import BadCredentialsError, ExternalServiceError
from app.services.common import base_url, common_headers
from app.services.http_client import request


def login(email: str, password: str, site: str) -> str:
    url = f"{base_url(site)}/v0.0.2/login"

    res = request(
        "POST",
        url,
        headers=common_headers(site),
        json={"email": email, "password": password},
    )
    if res.status_code in (401, 403):
        raise BadCredentialsError("Bad credentials")

    if not res.ok:
        raise ExternalServiceError("Login failed")

    try:
        return res.json()["success"]["token"]
    except Exception as e:
        raise ExternalServiceError("Unexpected login response format") from e
