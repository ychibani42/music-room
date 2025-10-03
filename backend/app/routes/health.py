"""
Health check routes.

This module provides endpoints for monitoring the health and status
of the API service. Useful for load balancers and monitoring tools.
"""

from fastapi import APIRouter
from datetime import datetime

router = APIRouter()


@router.get("/ping")
def ping():
    """
    Simple ping endpoint to verify the API is responding.
    
    Returns:
        dict: Status message with timestamp
    """
    return {
        "message": "pong",
        "timestamp": datetime.now().isoformat(),
        "status": "healthy"
    }


@router.get("/health")
def health_check():
    """
    Comprehensive health check endpoint.
    
    In a production environment, this would check:
    - Database connectivity
    - External service availability
    - Cache status
    - Other critical dependencies
    
    Returns:
        dict: Detailed health status
    """
    return {
        "status": "healthy",
        "service": "api",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    }
