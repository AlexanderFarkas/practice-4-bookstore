import json
from pathlib import Path

from fastapi import FastAPI, APIRouter, Depends
from starlette.middleware.cors import CORSMiddleware

from backend.src.modules.auth.auth_admin_router import auth_admin_router
from backend.src.modules.auth.auth_customer_router import auth_customer_router
from backend.src.modules.auth.auth_dependencies import admin_only
from backend.src.modules.books.books_admin_router import books_admin_router
from backend.src.modules.books.books_customer_router import books_customer_router
from backend.src.modules.orders.orders_admin_router import orders_admin_router
from backend.src.modules.orders.orders_customer_router import orders_customer_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def create_openapi_file():
    openapi_file = Path(__file__).parent.parent / "openapi.json"
    openapi_file.write_text(json.dumps(app.openapi(), indent=2))


app.include_router(auth_customer_router, prefix="/auth")
app.include_router(books_customer_router, prefix="/books")
app.include_router(orders_customer_router, prefix="/orders")

admin_router = APIRouter()
admin_router.include_router(auth_admin_router, prefix="/auth")
admin_router.include_router(
    books_admin_router, prefix="/books", dependencies=[Depends(admin_only)]
)
admin_router.include_router(
    orders_admin_router, prefix="/orders", dependencies=[Depends(admin_only)]
)
app.include_router(admin_router, prefix="/admin")

create_openapi_file()
