import logging
from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai import FallbackProvider
from app.core.config import settings

router = APIRouter()
logger = logging.getLogger(__name__)

class Message(BaseModel):
    text: str
    lang: str = 'en-IN'  # BCP-47 language code, e.g. hi-IN, ta-IN

@router.post('/message')
def send_message(msg: Message):
    provider = FallbackProvider()
    response = provider.generate_response_with_lang(msg.text, lang_code=msg.lang)
    return {'reply': response}

@router.get('/debug')
def debug_ai():
    """Shows which AI providers are available and any errors. Useful for debugging."""
    provider = FallbackProvider()
    keys_status = {
        'GROQ_API_KEY': 'set' if settings.GROQ_API_KEY and settings.GROQ_API_KEY.strip() else 'MISSING',
        'OPENROUTER_API_KEY': 'set' if settings.OPENROUTER_API_KEY and settings.OPENROUTER_API_KEY.strip() else 'MISSING',
        'GEMINI_API_KEY': 'set' if settings.GEMINI_API_KEY and settings.GEMINI_API_KEY.strip() else 'MISSING',
        'FEATURE_LLM': settings.FEATURE_LLM,
        'real_providers': [p.__class__.__name__ for p in provider.real_providers],
    }
    logger.info(f"AI Debug: {keys_status}")
    return keys_status
