import uuid

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.src.modules.auth.auth_dependencies import get_customer_id
from backend.src.modules.database.db import get_session
from backend.src.modules.orders.orders_dto import CustomerOrderDTO
from backend.src.modules.orders.orders_models import Order

orders_customer_router = APIRouter()


@orders_customer_router.get("/")
def get_all(
    session: Session = Depends(get_session),
    customer_id: uuid.UUID = Depends(get_customer_id),
) -> list[CustomerOrderDTO]:
    orders = (
        session.execute(
            select(Order)
            .where(Order.customer_id == customer_id)
            .order_by(Order.created_at.desc())
        )
        .scalars()
        .all()
    )
    return [CustomerOrderDTO.model_validate(order) for order in orders]
