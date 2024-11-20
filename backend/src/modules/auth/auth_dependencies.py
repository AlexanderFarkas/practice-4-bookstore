import uuid
from typing import Annotated

import jwt
from fastapi.params import Depends
from fastapi.security import (
    HTTPBearer,
    HTTPAuthorizationCredentials,
)

from backend.src.env import JWT_SECRET, JWT_ALGORITHM
from backend.src.modules.common.exceptions import UnauthorizedException


security = HTTPBearer()


def get_customer_id(
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(security)],
) -> uuid.UUID:
    token_data: dict = _decode(credentials.credentials)
    if (
        token_data is None
        or "user_id" not in token_data
        or token_data["type"] != "customer"
    ):
        raise UnauthorizedException()
    return uuid.UUID(token_data["user_id"])


def admin_only(
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(security)],
):
    token_data: dict = _decode(credentials.credentials)
    if token_data is None or token_data["type"] != "admin":
        raise UnauthorizedException()


def _decode(token: str):
    try:
        token_data: dict = jwt.decode(token, JWT_SECRET, JWT_ALGORITHM)
        return token_data
    except jwt.PyJWTError:
        raise UnauthorizedException()
