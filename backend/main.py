"""
Main FastAPI application entry point.

This file initializes the FastAPI application, configures CORS middleware,
and includes all API routes. It serves as the central hub for the backend API.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import health

# Initialize FastAPI application
app = FastAPI(
    title="React Native + FastAPI Starter",
    description="A starter backend for React Native mobile applications",
    version="1.0.0"
)

# Configure CORS - Allow requests from frontend
# In production, replace "*" with specific origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this in production to specific domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(health.router, prefix="/api", tags=["health"])


@app.get("/")
def root():
    """
    Root endpoint - simple health check
    """
    return {
        "message": "Welcome to the React Native + FastAPI Starter API",
        "status": "active"
    }
