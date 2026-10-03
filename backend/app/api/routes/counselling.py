from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai import FallbackProvider

router = APIRouter()

class Message(BaseModel):
    text: str

@router.post('/message')
def send_message(msg: Message):
    provider = FallbackProvider()
    response = provider.generate_response(msg.text)
    return {'reply': response}
