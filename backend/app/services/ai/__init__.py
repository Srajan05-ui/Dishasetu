import logging
from app.core.config import settings
from app.services.ai.base import AIProvider
from app.services.ai.demo import DemoProvider
from app.services.ai.gemini import GeminiProvider
from app.services.ai.groq import GroqProvider
from app.services.ai.openrouter import OpenRouterProvider

logger = logging.getLogger(__name__)

LANG_NAMES = {
    'en-IN': 'English',
    'hi-IN': 'Hindi',
    'mr-IN': 'Marathi',
    'bn-IN': 'Bengali',
    'ta-IN': 'Tamil',
    'te-IN': 'Telugu',
    'kn-IN': 'Kannada',
    'ml-IN': 'Malayalam',
    'gu-IN': 'Gujarati',
    'pa-IN': 'Punjabi',
    'or-IN': 'Odia',
}

def build_system_prompt(lang_code: str = 'en-IN') -> str:
    lang_name = LANG_NAMES.get(lang_code, 'English')
    return (
        f'You are Disha, an expert AI career counsellor for vocational education in India. '
        f'Help students and parents make informed decisions about ITI and vocational trades. '
        f'Provide concise, helpful, evidence-based guidance on careers, salaries, and job safety. '
        f'IMPORTANT: You MUST respond in {lang_name}. '
        f'If the user writes in {lang_name}, respond in {lang_name}. '
        f'If you are unsure, always default to {lang_name} for your response.'
    )


class FallbackProvider(AIProvider):
    """Tries each real provider in order; shows clear error if all fail."""

    def __init__(self):
        self.real_providers: list[AIProvider] = []
        self.errors: list[str] = []

        if settings.GROQ_API_KEY and settings.GROQ_API_KEY.strip():
            self.real_providers.append(GroqProvider())
            logger.info("FallbackProvider: Groq registered")
        else:
            logger.warning("FallbackProvider: GROQ_API_KEY not set")

        if settings.OPENROUTER_API_KEY and settings.OPENROUTER_API_KEY.strip():
            self.real_providers.append(OpenRouterProvider())
            logger.info("FallbackProvider: OpenRouter registered")
        else:
            logger.warning("FallbackProvider: OPENROUTER_API_KEY not set")

        if settings.GEMINI_API_KEY and settings.GEMINI_API_KEY.strip():
            self.real_providers.append(GeminiProvider())
            logger.info("FallbackProvider: Gemini registered")

        if not self.real_providers:
            logger.error("FallbackProvider: NO API keys configured — using Demo only")

    def generate_response(self, prompt: str) -> str:
        self.errors = []
        for provider in self.real_providers:
            name = provider.__class__.__name__
            try:
                result = provider.generate_response(prompt)
                if result:
                    logger.info(f"FallbackProvider: success via {name}")
                    return result
            except Exception as e:
                err_msg = f"{name} failed: {e}"
                logger.warning(err_msg)
                self.errors.append(err_msg)
                continue

        if self.errors:
            logger.error(f"All AI providers failed: {self.errors}")

        return DemoProvider().generate_response(prompt)

    def generate_response_with_lang(self, prompt: str, lang_code: str = 'en-IN') -> str:
        """Injects language-aware system prompt."""
        system_prompt = build_system_prompt(lang_code)
        full_prompt = f"[System: {system_prompt}]\n\nUser: {prompt}"
        self.errors = []
        for provider in self.real_providers:
            name = provider.__class__.__name__
            try:
                result = provider.generate_response_with_system(
                    prompt=prompt,
                    system=system_prompt
                )
                if result:
                    logger.info(f"FallbackProvider: success via {name} (lang={lang_code})")
                    return result
            except AttributeError:
                # Provider doesn't support system param, fall back to prefixed prompt
                try:
                    result = provider.generate_response(full_prompt)
                    if result:
                        logger.info(f"FallbackProvider: success via {name} (prefixed, lang={lang_code})")
                        return result
                except Exception as e:
                    logger.warning(f"{name} failed: {e}")
            except Exception as e:
                logger.warning(f"{name} failed: {e}")
                self.errors.append(str(e))

        return DemoProvider().generate_response(prompt)
