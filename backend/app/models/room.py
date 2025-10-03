"""
Music Room data models.

This module defines the data structures for music rooms, including
request/response schemas and domain models.
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class RoomBase(BaseModel):
    """Base model for music room with common attributes"""
    name: str = Field(..., min_length=1, max_length=100, description="Name of the music room")
    description: Optional[str] = Field(None, max_length=500, description="Room description")
    genre: Optional[str] = Field(None, description="Primary music genre")
    is_public: bool = Field(True, description="Whether the room is publicly accessible")


class RoomCreate(RoomBase):
    """Schema for creating a new music room"""
    pass


class Room(RoomBase):
    """Complete music room model with all attributes"""
    id: str = Field(..., description="Unique room identifier")
    created_at: datetime = Field(default_factory=datetime.now, description="Room creation timestamp")
    member_count: int = Field(0, description="Number of members in the room")
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "room_123",
                "name": "Indie Rock Lovers",
                "description": "A room for indie rock enthusiasts",
                "genre": "Indie Rock",
                "is_public": True,
                "created_at": "2025-10-03T12:00:00",
                "member_count": 5
            }
        }


class Track(BaseModel):
    """Model representing a music track"""
    id: str = Field(..., description="Track identifier")
    title: str = Field(..., description="Track title")
    artist: str = Field(..., description="Artist name")
    duration: int = Field(..., description="Track duration in seconds")
    added_by: str = Field(..., description="User who added the track")
    added_at: datetime = Field(default_factory=datetime.now)
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "track_456",
                "title": "The Less I Know The Better",
                "artist": "Tame Impala",
                "duration": 216,
                "added_by": "user_789",
                "added_at": "2025-10-03T12:30:00"
            }
        }
