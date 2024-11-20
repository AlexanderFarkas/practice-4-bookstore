import datetime
import uuid
from typing import Optional

from backend.src.modules.common.dto import DTO


class AdminBookDTO(DTO):
    id: uuid.UUID
    title: str
    author: str
    category: str

    purchase_price: int
    two_weeks_rent_price: int
    month_rent_price: int
    three_month_rent_price: int

    year_published: int
    text: str

    is_hidden: bool


class CustomerBookDTO(DTO):
    id: uuid.UUID
    title: str
    category: str
    author: str

    purchase_price: int
    two_weeks_rent_price: int
    month_rent_price: int
    three_month_rent_price: int

    year_published: int


class CustomerBookInInstanceDTO(CustomerBookDTO):
    text: str


class BookInstanceDTO(DTO):
    customer_id: uuid.UUID
    expiration_date: Optional[datetime.datetime]
    book_id: uuid.UUID
    book: CustomerBookInInstanceDTO
