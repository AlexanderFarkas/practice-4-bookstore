import uuid
from typing import Annotated, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.src.modules.auth.auth_dependencies import get_customer_id
from backend.src.modules.books.books_dto import CustomerBookDTO, BookInstanceDTO
from backend.src.modules.books.books_models import (
    Book,
    BookInstance,
    EXPIRATION_THRESHOLD,
)
from backend.src.modules.books.books_repository import (
    SearchBooksParams,
    BooksRepository,
)
from backend.src.modules.common.dto import DTO
from backend.src.modules.common.utils import utc_now
from backend.src.modules.database.db import get_session
from backend.src.modules.orders.orders_dto import CustomerOrderDTO
from backend.src.modules.orders.orders_models import Order, PurchaseType

books_customer_router = APIRouter()


@books_customer_router.get("/")
def get_all(
    params: Annotated[SearchBooksParams, Query()],
    books_repository: BooksRepository = Depends(),
) -> list[CustomerBookDTO]:
    books = books_repository.search_books(params, exclude_hidden=True)
    return [CustomerBookDTO.model_validate(book) for book in books]


@books_customer_router.get("/my_library")
def get_library(
    customer_id: uuid.UUID = Depends(get_customer_id),
    session: Session = Depends(get_session),
) -> list[BookInstanceDTO]:
    instances_stmt = select(BookInstance).where(
        BookInstance.customer_id == customer_id,
        BookInstance.is_active,
    )

    instances = session.execute(instances_stmt).scalars().all()
    return [BookInstanceDTO.model_validate(instance) for instance in instances]


@books_customer_router.get("/expiring_soon")
def get_expiring_soon(
    customer_id: uuid.UUID = Depends(get_customer_id),
    session: Session = Depends(get_session),
) -> list[BookInstanceDTO]:
    instances = (
        session.execute(
            select(BookInstance).where(
                BookInstance.customer_id == customer_id,
                BookInstance.is_active,
                BookInstance.expiration_date < (utc_now() + EXPIRATION_THRESHOLD),
            )
        )
        .scalars()
        .all()
    )
    return [BookInstanceDTO.model_validate(instance) for instance in instances]


@books_customer_router.get("/{book_id}")
def get_by_id(
    book_id: uuid.UUID,
    session: Session = Depends(get_session),
) -> CustomerBookDTO:
    book = session.get(Book, book_id)
    return CustomerBookDTO.model_validate(book)


class PurchaseBookDTO(DTO):
    purchase_type: PurchaseType


@books_customer_router.post("/{book_id}/purchase")
def purchase_book(
    book_id: uuid.UUID,
    dto: PurchaseBookDTO,
    customer_id: uuid.UUID = Depends(get_customer_id),
    session: Session = Depends(get_session),
) -> CustomerOrderDTO:
    book = session.get(Book, book_id)
    active_instance = session.execute(
        select(BookInstance).where(
            BookInstance.customer_id == customer_id,
            BookInstance.book_id == book_id,
            BookInstance.is_active,
        )
    ).scalar_one_or_none()
    if active_instance is not None:
        raise HTTPException(
            status_code=400,
            detail="You already have this book in your library",
        )

    order = Order.create_from(
        book=book,
        purchase_type=dto.purchase_type,
        customer_id=customer_id,
    )
    session.add(order)
    session.commit()
    session.refresh(order)
    return CustomerOrderDTO.model_validate(order)


@books_customer_router.get("/{book_id}/active_instance")
def get_active_instance(
    book_id: uuid.UUID,
    customer_id: uuid.UUID = Depends(get_customer_id),
    session: Session = Depends(get_session),
) -> Optional[BookInstanceDTO]:
    instance = session.execute(
        select(BookInstance).where(
            BookInstance.customer_id == customer_id,
            BookInstance.book_id == book_id,
            BookInstance.is_active,
        )
    ).scalar_one_or_none()
    if instance is None:
        return None
    return BookInstanceDTO.model_validate(instance)
