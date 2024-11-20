from typing import Optional

from fastapi import Depends
from pydantic import BaseModel
from sqlalchemy import select, false
from sqlalchemy.orm import Session

from backend.src.modules.books.books_models import Book
from backend.src.modules.database.db import get_session


class SearchBooksParams(BaseModel):
    author: Optional[str] = None
    category: Optional[str] = None
    year_published: Optional[int] = None


class BooksRepository:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def search_books(self, params: SearchBooksParams, exclude_hidden: bool):
        books_stmt = select(Book)
        if params.author:
            books_stmt = books_stmt.where(
                Book.author.ilike("%" + params.author.lower() + "%")
            )
        if params.category:
            books_stmt = books_stmt.where(
                Book.category.ilike("%" + params.category.lower() + "%")
            )
        if params.year_published is not None:
            books_stmt = books_stmt.where(Book.year_published == params.year_published)
        if exclude_hidden:
            books_stmt = books_stmt.where(Book.is_hidden == false())
        return self.session.execute(books_stmt).scalars().all()
