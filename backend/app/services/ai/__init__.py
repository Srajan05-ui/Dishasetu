from app.core.config import settings
from app.services.ai.base import AIProvider
from app.services.ai.demo import DemoProvider
from app.services.ai.gemini import GeminiProvider

def get_ai_provider() -> AIProvider:
    if settings.FEATURE_LLM == 'on' and settings.GEMINI_API_KEY:
        return GeminiProvider()
    return DemoProvider()
