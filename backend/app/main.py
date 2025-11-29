from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from app.routes import text_to_jsx, image_to_jsx

load_dotenv()

app = FastAPI(
    title="Instamock API",
    description="AI-powered UI to JSX generator",
    version="1.0.0"
)

# CORS Configuration
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(text_to_jsx.router, prefix="/api/generate", tags=["Generate"])
app.include_router(image_to_jsx.router, prefix="/api/generate", tags=["Generate"])


@app.get("/")
async def root():
    return {"message": "Instamock API is running", "version": "1.0.0"}


@app.get("/health")
async def health():
    return {"status": "healthy"}

