import uuid

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.src.modules.database.db import get_session
from backend.src.modules.orders.orders_dto import AdminOrderDTO
from backend.src.modules.orders.orders_models import Order, OrderStatus

orders_admin_router = APIRouter()


@orders_admin_router.post("/{order_id}/complete")
def complete_order(
    order_id: uuid.UUID,
    session: Session = Depends(get_session),
) -> None:
    order = session.get(Order, order_id)
    other_orders_for_same_book = (
        session.execute(
            select(Order).where(
                Order.customer_id == order.customer_id,
                Order.status == OrderStatus.AWAITING_PAYMENT,
                Order.book_id == order.book_id,
                Order.id != order_id,
            )
        )
        .scalars()
        .all()
    )
    for other_order in other_orders_for_same_book:
        other_order.cancel()

    order.complete()
    session.commit()


@orders_admin_router.get("/")
def get_incomplete_orders(
    session: Session = Depends(get_session),
) -> list[AdminOrderDTO]:
    orders = (
        session.execute(
            select(Order).where(Order.status == OrderStatus.AWAITING_PAYMENT)
        )
        .scalars()
        .all()
    )
    return [AdminOrderDTO.model_validate(order) for order in orders]
