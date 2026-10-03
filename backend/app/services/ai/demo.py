from app.services.ai.base import AIProvider

class DemoProvider(AIProvider):
    def generate_response(self, prompt: str) -> str:
        return 'This is a demo response. AI services are currently operating in offline fallback mode.'
