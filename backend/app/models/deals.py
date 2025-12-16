from typing import List, Literal
from pydantic import BaseModel, Field

AllowedWebsite = Literal["fo1", "fo2"]


class DealsRequest(BaseModel):
    email: str = Field(..., example="fo1_test_user@whatever.com")
    password: str = Field(..., min_length=6, example="Test123!")
    website: AllowedWebsite = Field(..., example="fo1")


class AvailableDeal(BaseModel):
    id: int
    title: str


class DealsResponseWithToken(BaseModel):
    access_token: str
    available_deals: List[AvailableDeal]


class DealFilesResponse(BaseModel):
    deal_id: int
    files: list[dict]
