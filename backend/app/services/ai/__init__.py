import logging
from app.core.config import settings
from app.services.ai.base import AIProvider
from app.services.ai.demo import DemoProvider
from app.services.ai.gemini import GeminiProvider
from app.services.ai.groq import GroqProvider
from app.services.ai.openrouter import OpenRouterProvider

logger = logging.getLogger(__name__)

def get_ai_provider() -> AIProvider:
    """
    Returns the best available AI provider using a priority fallback chain:
    1. Groq (fast, free tier, Llama 70B)
    2. OpenRouter (free Llama models)
    3. Gemini (Google)
    4. Demo (offline fallback)
    """
    if settings.FEATURE_LLM != 'on':
        return DemoProvider()

    if settings.GROQ_API_KEY and settings.GROQ_API_KEY.strip():
        logger.info("AI Provider: Groq")
        return GroqProvider()

    if settings.OPENROUTER_API_KEY and settings.OPENROUTER_API_KEY.strip():
        logger.info("AI Provider: OpenRouter")
        return OpenRouterProvider()

    if settings.GEMINI_API_KEY and settings.GEMINI_API_KEY.strip():
        logger.info("AI Provider: Gemini")
        return GeminiProvider()

    logger.warning("AI Provider: Demo (no API keys configured)")
    return DemoProvider()


class FallbackProvider(AIProvider):
    """Tries each provider in order; falls back to the next on error."""

    def __init__(self):
        self.providers: list[AIProvider] = []
        if settings.GROQ_API_KEY and settings.GROQ_API_KEY.strip():
            self.providers.append(GroqProvider())
        if settings.OPENROUTER_API_KEY and settings.OPENROUTER_API_KEY.strip():
            self.providers.append(OpenRouterProvider())
        if settings.GEMINI_API_KEY and settings.GEMINI_API_KEY.strip():
            self.providers.append(GeminiProvider())
        self.providers.append(DemoProvider())

    def generate_response(self, prompt: str) -> str:
        for provider in self.providers:
            try:
                result = provider.generate_response(prompt)
                if result and not result.startswith('AI Error:'):
                    return result
            except Exception as e:
                logger.warning(f"{provider.__class__.__name__} failed: {e}")
                continue
        return "I'm having trouble connecting to AI services right now. Please try again in a moment."
