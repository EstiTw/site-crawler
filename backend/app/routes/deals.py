from fastapi import APIRouter, Query, Response, Cookie, HTTPException

from app.models.deals import DealsRequest, DealsResponse, DealFilesResponse
from app.services.auth_service import login
from app.services.deals_service import fetch_deals, filter_available_deals
from app.services.files_service import fetch_files_for_deal

router = APIRouter()


@router.post("/fetch-deals", response_model=DealsResponse)
def fetch_deals_route(payload: DealsRequest, response: Response):
    token = login(payload.email, payload.password, payload.website)
    response.set_cookie(
        key="session_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=3600,
    )
    deals = fetch_deals(payload.website, token)
    available = filter_available_deals(deals)
    return {"available_deals": available}


@router.get("/fetch-files/{deal_id}", response_model=DealFilesResponse)
def fetch_files_route(
    deal_id: int,
    site: str = Query(..., example="fo1"),
    session_token: str | None = Cookie(None)
):
    if not session_token:
        raise HTTPException(status_code=401, detail="Session expired")

    files = fetch_files_for_deal(site, session_token, deal_id)
    return {"deal_id": deal_id, "files": files}
