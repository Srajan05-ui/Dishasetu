import httpx
from app.services.ai.base import AIProvider
from app.core.config import settings

class GroqProvider(AIProvider):
    def __init__(self):
        self.api_key = settings.GROQ_API_KEY.strip() if settings.GROQ_API_KEY else ""
        self.url = 'https://api.groq.com/openai/v1/chat/completions'
        self.model = 'openai/gpt-oss-20b'  # confirmed working on this key

    def generate_response(self, prompt: str) -> str:
        if not self.api_key:
            raise ValueError('Missing Groq API Key')
        headers = {
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json',
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
            'temperature': 0.7,
        }
        response = httpx.post(self.url, headers=headers, json=payload, timeout=10.0)
        if not response.is_success:
            raise Exception(f'Groq API error {response.status_code}: {response.text[:200]}')
        data = response.json()
        msg = data['choices'][0]['message']
        # Some reasoning models return empty content with reasoning field
        return msg.get('content') or msg.get('reasoning', '') or 'No response generated.'

    def generate_response_with_system(self, prompt: str, system: str) -> str:
        if not self.api_key:
            raise ValueError('Missing Groq API Key')
        headers = {'Authorization': f'Bearer {self.api_key}', 'Content-Type': 'application/json'}
        payload = {
            'model': self.model,
            'messages': [{'role': 'system', 'content': system}, {'role': 'user', 'content': prompt}],
            'max_tokens': 512,
            'temperature': 0.7,
        }
        response = httpx.post(self.url, headers=headers, json=payload, timeout=10.0)
        if not response.is_success:
            raise Exception(f'Groq API error {response.status_code}: {response.text[:200]}')
        data = response.json()
        msg = data['choices'][0]['message']
        # Some reasoning models return empty content with reasoning field
        return msg.get('content') or msg.get('reasoning', '') or 'No response generated.'
