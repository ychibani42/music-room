"""
Main FastAPI application entry point for Music Room.

This file initializes the FastAPI application, configures CORS middleware,
and includes all API routes. It serves as the central hub for the Music Room backend API.

Music Room is a collaborative music sharing and discovery platform where users can:
- Create and join music rooms
- Share their favorite tracks
- Discover new music together
- Collaborate on playlists
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import health, rooms

# Initialize FastAPI application
app = FastAPI(
    title="Music Room API",
    description="Backend API for Music Room - A collaborative music sharing platform",
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
app.include_router(rooms.router, prefix="/api/rooms", tags=["rooms"])


@app.get("/")
def root():
    """
    Root endpoint - API welcome message
    """
    return {
        "message": "Welcome to Music Room API",
        "description": "A collaborative music sharing and discovery platform",
        "status": "active",
        "version": "1.0.0"
    }
