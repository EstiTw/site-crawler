from fastapi import APIRouter, Query, Header

from app.models.deals import DealsRequest, DealsResponseWithToken, DealFilesResponse
from app.services.auth_service import login
from app.services.deals_service import fetch_deals, filter_available_deals
from app.services.files_service import fetch_files_for_deal

router = APIRouter()


@router.post("/fetch-deals", response_model=DealsResponseWithToken)
def fetch_deals_route(payload: DealsRequest):
    token = login(payload.email, payload.password, payload.website)
    deals = fetch_deals(payload.website, token)
    available = filter_available_deals(deals)
    return {"access_token": token, "available_deals": available}


@router.get("/fetch-files/{deal_id}", response_model=DealFilesResponse)
def fetch_files_route(
    deal_id: int,
    site: str = Query(..., example="fo1"),
    authorization: str = Header(..., description="Bearer <token>")
):
    token = authorization.replace("Bearer ", "")
    files = fetch_files_for_deal(site, token, deal_id)
    return {"deal_id": deal_id, "files": files}