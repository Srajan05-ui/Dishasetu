import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv() # Load variables from .env into os environment

class Settings(BaseSettings):
    DATABASE_URL: str = os.getenv('DATABASE_URL', 'sqlite:///./sql_app.db')
    GEMINI_API_KEY: str = os.getenv('GEMINI_API_KEY', '')
    GROQ_API_KEY: str = os.getenv('GROQ_API_KEY', '')
    OPENROUTER_API_KEY: str = os.getenv('OPENROUTER_API_KEY', '')
    FEATURE_LLM: str = os.getenv('FEATURE_LLM', 'on')

settings = Settings()
