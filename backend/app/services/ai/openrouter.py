import httpx
from app.services.ai.base import AIProvider
from app.core.config import settings

class OpenRouterProvider(AIProvider):
    def __init__(self):
        self.api_key = settings.OPENROUTER_API_KEY.strip() if settings.OPENROUTER_API_KEY else ""
        self.url = 'https://openrouter.ai/api/v1/chat/completions'
        self.model = 'meta-llama/llama-3.1-8b-instruct:free'

    def generate_response(self, prompt: str) -> str:
        if not self.api_key:
            raise ValueError('Missing OpenRouter API Key')
        headers = {
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://dishasetu.vercel.app',
            'X-Title': 'Dishasetu Career Counsellor',
        }
        payload = {
            'model': self.model,
            'messages': [
                {
                    'role': 'system',
                    'content': (
                        'You are Disha, an expert AI career counsellor for vocational education in India. '
                        'Help students and parents make informed decisions about ITI and vocational trades. '
                        'Provide concise, helpful, evidence-based guidance on careers, salaries, and job safety.'
                    )
                },
                {'role': 'user', 'content': prompt}
            ],
            'max_tokens': 512,
        }
        response = httpx.post(self.url, headers=headers, json=payload, timeout=10.0)
        response.raise_for_status()
        data = response.json()
        return data['choices'][0]['message']['content']
