from app.errors import ExternalTokenExpiredError, ExternalServiceError
from app.services.common import base_url, auth_headers
from app.services.http_client import request


def fetch_deals(site: str, token: str, view: str = "task-manage") -> list[dict]:
    url = f"{base_url(site)}/v0.0.2/deals-list"

    res = request(
        "POST",
        url,
        headers=auth_headers(site, token),
        json={"view": view},
    )

    if res.status_code in (401, 403):
        raise ExternalTokenExpiredError()

    if not res.ok:
        raise ExternalServiceError("Failed fetching deals")

    data = res.json()
    deals = data.get("data", [])
    return deals if isinstance(deals, list) else []


def filter_available_deals(deals: list[dict]) -> list[dict]:
    return [
        {"id": d["id"], "title": d["title"]}
        for d in deals
        if d.get("deal_status") != "Invested"
    ]
