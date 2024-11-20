import uvicorn

from backend.src.modules.database.db import Base, db_engine

if __name__ == "__main__":
    Base.metadata.create_all(db_engine)

    uvicorn.run(
        "src.app:app",
        port=8000,
        reload=True,
    )
