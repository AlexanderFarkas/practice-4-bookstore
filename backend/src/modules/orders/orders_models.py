import datetime
import uuid
from enum import StrEnum, auto
from typing import Optional, Self

from sqlalchemy import ForeignKey, UUID
from sqlalchemy.orm import Mapped, Relationship, relationship, mapped_column

from backend.src.modules.auth.auth_models import Customer
from backend.src.modules.books.books_models import Book, BookInstance
from backend.src.modules.common.exceptions import DomainException
from backend.src.modules.common.utils import utc_now
from backend.src.modules.database.db import Base


class OrderStatus(StrEnum):
    AWAITING_PAYMENT = auto()
    COMPLETED = auto()
    CANCELLED = auto()


class PurchaseType(StrEnum):
    FOREVER = auto()
    TWO_WEEKS = auto()
    MONTH = auto()
    THREE_MONTHS = auto()


class Order(Base):
    __tablename__ = "orders"
    book: Relationship[Book] = relationship("Book", lazy="selectin")
    book_instance: Relationship[Optional[BookInstance]] = relationship(
        "BookInstance", lazy="selectin"
    )
    customer: Relationship["Customer"] = relationship(
        "Customer", lazy="selectin", init=False
    )
    customer_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("customers.id"), nullable=False
    )
    price: Mapped[int] = mapped_column(nullable=False)
    status: Mapped[OrderStatus] = mapped_column(nullable=False)
    purchase_type: Mapped[PurchaseType] = mapped_column(nullable=False)

    book_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("books.id"), nullable=False)
    book_instance_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        ForeignKey("book_instances.id")
    )
    created_at: Mapped[datetime.datetime] = mapped_column(
        default_factory=utc_now, nullable=False
    )
    id: Mapped[uuid.UUID] = mapped_column(
        UUID, primary_key=True, default_factory=uuid.uuid4
    )

    @classmethod
    def create_from(
        cls, book: Book, customer_id: uuid.UUID, purchase_type: PurchaseType
    ) -> Self:
        match purchase_type:
            case PurchaseType.FOREVER:
                price = book.purchase_price
            case PurchaseType.TWO_WEEKS:
                price = book.two_weeks_rent_price
            case PurchaseType.MONTH:
                price = book.month_rent_price
            case PurchaseType.THREE_MONTHS:
                price = book.three_month_rent_price
        return cls(
            customer_id=customer_id,
            price=price,
            status=OrderStatus.AWAITING_PAYMENT,
            purchase_type=purchase_type,
            book=book,
            book_id=book.id,
            book_instance_id=None,
            book_instance=None,
        )

    def cancel(self):
        if self.status != OrderStatus.AWAITING_PAYMENT:
            raise DomainException("Order is not awaiting payment")
        self.status = OrderStatus.CANCELLED

    def complete(self) -> None:
        if self.status != OrderStatus.AWAITING_PAYMENT:
            raise DomainException("Order is not awaiting payment")

        self.status = OrderStatus.COMPLETED
        expiration_date: Optional[datetime.datetime] = None
        match self.purchase_type:
            case PurchaseType.FOREVER:
                expiration_date = None
            case PurchaseType.TWO_WEEKS:
                expiration_date = utc_now() + datetime.timedelta(weeks=2)
            case PurchaseType.MONTH:
                expiration_date = utc_now() + datetime.timedelta(weeks=4)
            case PurchaseType.THREE_MONTHS:
                expiration_date = utc_now() + datetime.timedelta(weeks=12)

        self.book_instance = self.book.create_instance(
            customer_id=self.customer_id,
            expiration_date=expiration_date,
        )
