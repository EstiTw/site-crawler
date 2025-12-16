from app.errors import ExternalTokenExpiredError, ExternalServiceError
from app.services.common import base_url, auth_headers
from app.services.http_client import request


def fetch_files_for_deal(site: str, token: str, deal_id: int) -> list[dict]:
    url = f"{base_url(site)}/v0.0.3/deals/{deal_id}/files"

    res = request(
        "GET",
        url,
        headers=auth_headers(site, token),
    )

    if res.status_code in (401, 403):
        raise ExternalTokenExpiredError()

    if not res.ok:
        raise ExternalServiceError("Failed fetching files")

    files = res.json()
    return files if isinstance(files, list) else [files]
