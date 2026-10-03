from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import careers, counselling

app = FastAPI(title='Dishasetu API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(careers.router, prefix='/api/careers', tags=['careers'])
app.include_router(counselling.router, prefix='/api/counselling', tags=['counselling'])

@app.get('/api/health')
def health_check():
    return {'status': 'ok'}
