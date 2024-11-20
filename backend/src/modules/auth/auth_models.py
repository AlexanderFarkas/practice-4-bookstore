import uuid
from datetime import timedelta
from typing import Literal, Optional

import jwt
from argon2 import PasswordHasher
from argon2.exceptions import VerificationError
from sqlalchemy.orm import Mapped
from sqlalchemy.testing.schema import mapped_column

from backend.src.env import JWT_SECRET, JWT_ALGORITHM
from backend.src.modules.common.dto import DTO
from backend.src.modules.common.exceptions import DomainException
from backend.src.modules.common.utils import utc_now
from backend.src.modules.database.db import Base


password_hasher = PasswordHasher()


class AccessTokenDTO(DTO):
    token: str


class Customer(Base):
    __tablename__ = "customers"
    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        init=False,
        default_factory=uuid.uuid4,
    )
    username: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str] = mapped_column()

    @classmethod
    def create_from(cls, username: str, password: str):
        encoded_password = password_hasher.hash(password)
        return cls(
            username=username,
            password=encoded_password,
        )


    def login(self, password: str) -> "AccessTokenDTO":
        try:
            password_hasher.verify(self.password, password)
        except VerificationError:
            raise DomainException("Password is incorrect")

        return AccessTokenDTO(
            token=generate_access_token(
                type="customer",
                payload={"user_id": str(self.id)},
            )
        )


def generate_access_token(
    type: Literal["customer", "admin"],
    payload: Optional[dict] = None,
):
    payload = payload if payload is not None else {}
    issued_at = utc_now()
    data = {
        "exp": issued_at + timedelta(hours=2),
        "iat": issued_at,
        "type": type,
        **payload,
    }
    return jwt.encode(data, JWT_SECRET, JWT_ALGORITHM)