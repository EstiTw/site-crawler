ALLOWED_SITES = {"fo1", "fo2"}
BASE_URL = "https://{site}.api.altius.finance/api"
TIMEOUT = 12


def base_url(site: str) -> str:
    if site not in ALLOWED_SITES:
        raise ValueError("Invalid website")
    return BASE_URL.format(site=site)


def common_headers(site: str) -> dict:
    return {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Origin": f"https://{site}.altius.finance",
        "Referer": f"https://{site}.altius.finance/",
    }


def auth_headers(site: str, token: str) -> dict:
    return {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Origin": f"https://{site}.altius.finance",
        "Referer": f"https://{site}.altius.finance/",
        "Authorization2": token,
        "Cookie": f"Authorization2={token}",
    }
