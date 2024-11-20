import datetime
import uuid
from typing import Optional

from sqlalchemy import (
    UUID,
    ForeignKey,
    TIMESTAMP,
    or_,
    String,
    Integer,
    Boolean,
)
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import Mapped, Relationship, relationship, mapped_column

from backend.src.modules.common.exceptions import DomainException
from backend.src.modules.common.utils import utc_now
from backend.src.modules.database.db import Base


EXPIRATION_THRESHOLD = datetime.timedelta(days=3)


class BookInstance(Base):
    __tablename__ = "book_instances"
    book: Relationship["Book"] = relationship("Book")

    customer_id: Mapped[uuid.UUID] = mapped_column(
        UUID,
        ForeignKey(
            "customers.id",
            ondelete="CASCADE",
            onupdate="CASCADE",
        ),
    )
    expiration_date: Mapped[Optional[datetime.datetime]] = mapped_column(TIMESTAMP)

    book_id: Mapped[uuid.UUID] = mapped_column(
        UUID,
        ForeignKey("books.id"),
    )
    id: Mapped[uuid.UUID] = mapped_column(
        UUID, primary_key=True, default_factory=uuid.uuid4
    )

    @hybrid_property
    def is_active(self) -> bool:
        return self.expiration_date is None or self.expiration_date > utc_now()

    @is_active.expression
    def is_active(cls):
        return or_(
            BookInstance.expiration_date.is_(None),
            BookInstance.expiration_date > utc_now(),
        )


class Book(Base):
    __tablename__ = "books"

    title: Mapped[str] = mapped_column(String, index=True)
    author: Mapped[str] = mapped_column(String, index=True)
    category: Mapped[str] = mapped_column(String, index=True)

    purchase_price: Mapped[int] = mapped_column(Integer)
    two_weeks_rent_price: Mapped[int] = mapped_column(Integer)
    month_rent_price: Mapped[int] = mapped_column(Integer)
    three_month_rent_price: Mapped[int] = mapped_column(Integer)

    year_published: Mapped[int] = mapped_column(Integer, index=True)
    text: Mapped[str] = mapped_column(String)

    is_hidden: Mapped[bool] = mapped_column(Boolean)
    id: Mapped[uuid.UUID] = mapped_column(
        UUID, primary_key=True, default_factory=uuid.uuid4
    )

    def assert_valid(self):
        if not self.title:
            raise DomainException("Title is required")
        if not self.author:
            raise DomainException("Author is required")
        if not self.category:
            raise DomainException("Category is required")
        if self.purchase_price < 0:
            raise DomainException("Purchase price must be positive")
        if self.two_weeks_rent_price < 0:
            raise DomainException("Two weeks rent price must be positive")
        if self.month_rent_price < 0:
            raise DomainException("Month rent price must be positive")
        if self.three_month_rent_price < 0:
            raise DomainException("Three month rent price must be positive")
        if not self.text:
            raise DomainException("Text is required")

    def create_instance(
        self, customer_id: uuid.UUID, expiration_date: Optional[datetime.datetime]
    ) -> BookInstance:
        return BookInstance(
            book_id=self.id,
            customer_id=customer_id,
            expiration_date=expiration_date,
            book=self,
        )
