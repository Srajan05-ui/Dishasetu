import httpx
from app.services.ai.base import AIProvider
from app.core.config import settings

class GeminiProvider(AIProvider):
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        self.url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={self.api_key}'

    def generate_response(self, prompt: str) -> str:
        if not self.api_key:
            raise ValueError('Missing Gemini API Key')
        try:
            payload = {'contents': [{'parts': [{'text': prompt}]}]}
            response = httpx.post(self.url, json=payload, timeout=8.0)
            response.raise_for_status()
            data = response.json()
            return data['candidates'][0]['content']['parts'][0]['text']
        except Exception as e:
            return f'AI Error: {str(e)}'
