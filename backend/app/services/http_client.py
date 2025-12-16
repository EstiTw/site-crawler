import requests
from app.errors import ExternalServiceError
from app.services.common import TIMEOUT


def request(method: str, url: str, *, headers: dict, json: dict | None = None) -> requests.Response:
    try:
        return requests.request(
            method=method,
            url=url,
            headers=headers,
            json=json,
            timeout=TIMEOUT,
        )
    except requests.RequestException as e:
        raise ExternalServiceError("Failed to reach external service") from e
