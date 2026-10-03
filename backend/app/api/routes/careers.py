from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import Trade

router = APIRouter()

@router.get('/')
def get_careers(db: Session = Depends(get_db)):
    trades = db.query(Trade).all()
    return trades
