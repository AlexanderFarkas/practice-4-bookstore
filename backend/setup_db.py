from sqlalchemy.orm import Session

from backend.src.modules.books.books_models import Book
from backend.src.modules.database.db import Base, db_engine

if __name__ == "__main__":
    import src.app  # noqa: F401

    Base.metadata.create_all(db_engine)
    with Session(db_engine) as session:
        session.add(Book(
            title="Властелин Колец",
            author="Джон Рональд Руэл Толкин",
            year_published=1925,
            purchase_price=1300,
            two_weeks_rent_price=500,
            month_rent_price=800,
            three_month_rent_price=1200,
            category="Фэнтези",
            text="Властелин Колец — эпическая фэнтези-сага, написанная Джоном Рональдом Руэлом Толкином.",
            is_hidden=False,
        ))

        session.add(Book(
            title="Гарри Поттер",
            author="Джоан Роулинг",
            year_published=1997,
            purchase_price=1000,
            two_weeks_rent_price=400,
            month_rent_price=700,
            three_month_rent_price=1000,
            category="Фэнтези",
            text="Гарри Поттер — серия романов, написанных британской писательницей Джоан Роулинг.",
            is_hidden=False,
        ))

        session.add(Book(
            title="Три товарища",
            author="Эрих Мария Ремарк",
            year_published=1936,
            purchase_price=800,
            two_weeks_rent_price=300,
            month_rent_price=500,
            three_month_rent_price=700,
            category="Роман",
            text="Три товарища — роман немецкого писателя Эриха Марии Ремарка.",
            is_hidden=False,
        ))

        session.add(Book(
            title="1984",
            author="Джордж Оруэлл",
            year_published=1949,
            purchase_price=900,
            two_weeks_rent_price=350,
            month_rent_price=600,
            three_month_rent_price=800,
            category="Антиутопия",
            text="1984 — роман-антиутопия Джорджа Оруэлла.",
            is_hidden=False,
        ))

        session.add(Book(
            title="Мастер и Маргарита",
            author="Михаил Булгаков",
            year_published=1967,
            purchase_price=950,
            two_weeks_rent_price=400,
            month_rent_price=700,
            three_month_rent_price=1000,
            category="Роман",
            text="Мастер и Маргарита — роман Михаила Булгакова.",
            is_hidden=False,
        ))
        session.commit()
