from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# SQLite Database URL
SQLALCHEMY_DATABASE_URL = "sqlite:///./expenses.db"

# SQLAlchemy Models
Base = declarative_base()

class Expense(Base):
    __tablename__ = "expenses"
    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float)

class SpendingLimit(Base):
    __tablename__ = "spending_limit"
    id = Column(Integer, primary_key=True, index=True)
    limit = Column(Float)

# Create the database engine and session
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

app = FastAPI()

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Routes
@app.post("/expenses/", response_model=Expense)
def create_expense(amount: float, db: Session = Depends(get_db)):
    db_expense = Expense(amount=amount)
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense

@app.get("/expenses/", response_model=list[Expense])
def read_expenses(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(Expense).offset(skip).limit(limit).all()

@app.delete("/expenses/{expense_id}", response_model=dict)
def delete_expense(expense_id: int, db: Session = Depends(get_db)):
    db_expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if db_expense:
        db.delete(db_expense)
        db.commit()
        return {"message": "Expense deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Expense not found")

@app.get("/limit/", response_model=SpendingLimit)
def read_spending_limit(db: Session = Depends(get_db)):
    db_limit = db.query(SpendingLimit).first()
    if db_limit:
        return db_limit
    else:
        raise HTTPException(status_code=404, detail="Spending limit not found")

@app.post("/limit/", response_model=SpendingLimit)
def set_spending_limit(limit: float, db: Session = Depends(get_db)):
    db_limit = db.query(SpendingLimit).first()
    if db_limit:
        db_limit.limit = limit
    else:
        db_limit = SpendingLimit(limit=limit)
        db.add(db_limit)
    db.commit()
    db.refresh(db_limit)
    return db_limit

# Create the database tables if they don't exist
Base.metadata.create_all(bind=engine)

# Run the FastAPI application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
