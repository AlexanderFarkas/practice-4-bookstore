import abc
import uuid
from typing import Optional

from backend.src.modules.auth.auth_customer_router import CustomerDTO
from backend.src.modules.books.books_dto import (
    BookInstanceDTO,
    AdminBookDTO,
    CustomerBookDTO,
)
from backend.src.modules.common.dto import DTO
from backend.src.modules.orders.orders_models import OrderStatus, PurchaseType


class _OrderDTO(abc.ABC, DTO):
    book_instance: Optional[BookInstanceDTO]
    customer: CustomerDTO

    id: uuid.UUID
    customer_id: uuid.UUID
    price: int
    status: OrderStatus
    purchase_type: PurchaseType

    book_id: uuid.UUID
    book_instance_id: Optional[uuid.UUID]


class AdminOrderDTO(_OrderDTO):
    book: AdminBookDTO


class CustomerOrderDTO(_OrderDTO):
    book: CustomerBookDTO
