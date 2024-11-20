from fastapi import APIRouter, HTTPException
from pydantic import SecretStr

from backend.src.env import ADMIN_PASSWORD
from backend.src.modules.auth.auth_models import generate_access_token, AccessTokenDTO
from backend.src.modules.common.dto import DTO

auth_admin_router = APIRouter()


class LoginAdminDTO(DTO):
    password: SecretStr


@auth_admin_router.post("/login")
def login(body: LoginAdminDTO) -> AccessTokenDTO:
    # На реальном проекте, если бы действительно был единственный администратор,
    # в env можно было бы записать только хэш пароля, а сам пароль передать лично.
    # Для простоты пароль хранится и сравнивается как есть, чтобы мне не пришлось его Вам отправлять :)
    if body.password.get_secret_value() == ADMIN_PASSWORD:
        return AccessTokenDTO(token=generate_access_token(type="admin", payload={}))
    raise HTTPException(status_code=403)
