from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai import get_ai_provider

router = APIRouter()

class Message(BaseModel):
    text: str

@router.post('/message')
def send_message(msg: Message):
    provider = get_ai_provider()
    response = provider.generate_response(msg.text)
    return {'reply': response}
