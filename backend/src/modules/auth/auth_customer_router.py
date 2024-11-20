import uuid
from typing import Optional

from fastapi import APIRouter, Depends
from pydantic import SecretStr
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.src.modules.auth.auth_dependencies import get_customer_id
from backend.src.modules.auth.auth_models import Customer, AccessTokenDTO
from backend.src.modules.common.dto import DTO
from backend.src.modules.common.exceptions import NotFoundException, DomainException
from backend.src.modules.database.db import get_session

auth_customer_router = APIRouter()


class LoginCustomerDTO(DTO):
    username: str
    password: SecretStr


class CustomerDTO(DTO):
    id: uuid.UUID
    username: str


@auth_customer_router.get("/me")
def get_me(
    customer_id: uuid.UUID = Depends(get_customer_id),
    session: Session = Depends(get_session),
) -> CustomerDTO:
    user = session.get(Customer, customer_id)
    return CustomerDTO.model_validate(user)


@auth_customer_router.post("/register")
def register(
    dto: LoginCustomerDTO, session: Session = Depends(get_session)
) -> AccessTokenDTO:
    password = dto.password.get_secret_value()
    existing_user = session.execute(
        select(Customer).where(Customer.username == dto.username)
    ).scalar_one_or_none()
    if existing_user is not None:
        raise DomainException("User already exists")

    customer = Customer.create_from(
        username=dto.username,
        password=password,
    )
    session.add(customer)
    session.commit()
    return customer.login(password)


@auth_customer_router.post("/login")
def login(
    dto: LoginCustomerDTO, session: Session = Depends(get_session)
) -> AccessTokenDTO:
    user: Optional[Customer] = session.execute(
        select(Customer).where(Customer.username == dto.username)
    ).scalar_one_or_none()

    if user is None:
        raise NotFoundException("Пользователь не найден")

    access_token = user.login(dto.password.get_secret_value())
    return access_token
