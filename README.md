# AI-Enabled Career Counselling Platform

## Project Overview
Evidence-based vocational career counselling for learners and families, integrating AI to support decision making.

## Architecture
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Python 3.11+, FastAPI, SQLAlchemy
- **Database**: PostgreSQL (Supabase)

## Installation & Running Locally

### Backend
\\\ash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
\\\

### Frontend
\\\ash
cd frontend
npm install
npm run dev
\\\

## Demo Mode
If AI keys are not available, the application automatically falls back to offline Demo Mode, providing static career data and mock counselling to ensure uninterrupted demonstration functionality.
