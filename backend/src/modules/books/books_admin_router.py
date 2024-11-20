import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from backend.src.modules.books.books_dto import AdminBookDTO
from backend.src.modules.books.books_models import Book
from backend.src.modules.books.books_repository import (
    SearchBooksParams,
    BooksRepository,
)
from backend.src.modules.common.dto import DTO
from backend.src.modules.database.db import get_session

books_admin_router = APIRouter()


class CreateBookDTO(DTO):
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


@books_admin_router.post("/")
async def create_book(
    dto: CreateBookDTO, session: Session = Depends(get_session)
) -> AdminBookDTO:
    book = Book(
        title=dto.title,
        author=dto.author,
        category=dto.category,
        purchase_price=dto.purchase_price,
        two_weeks_rent_price=dto.two_weeks_rent_price,
        month_rent_price=dto.month_rent_price,
        three_month_rent_price=dto.three_month_rent_price,
        year_published=dto.year_published,
        text=dto.text,
        is_hidden=dto.is_hidden,
    )
    book.assert_valid()
    session.add(book)
    session.commit()
    return AdminBookDTO.model_validate(book)


@books_admin_router.put("/{book_id}")
async def update_book(
    book_id: uuid.UUID, dto: CreateBookDTO, session: Session = Depends(get_session)
) -> AdminBookDTO:
    book = session.get(Book, book_id)
    book.title = dto.title
    book.author = dto.author
    book.category = dto.category
    book.purchase_price = dto.purchase_price
    book.two_weeks_rent_price = dto.two_weeks_rent_price
    book.month_rent_price = dto.month_rent_price
    book.three_month_rent_price = dto.three_month_rent_price
    book.year_published = dto.year_published
    book.text = dto.text
    book.is_hidden = dto.is_hidden
    book.assert_valid()
    session.commit()
    return AdminBookDTO.model_validate(book)


@books_admin_router.get("/")
def get_all(
    params: Annotated[SearchBooksParams, Query()],
    books_repository: BooksRepository = Depends(),
) -> list[AdminBookDTO]:
    books = books_repository.search_books(params, exclude_hidden=False)
    return [AdminBookDTO.model_validate(book) for book in books]


@books_admin_router.get("/{book_id}")
def get_by_id(
    book_id: uuid.UUID, session: Session = Depends(get_session)
) -> AdminBookDTO:
    book = session.get(Book, book_id)
    return AdminBookDTO.model_validate(book)
