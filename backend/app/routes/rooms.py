"""
Music Room routes.

This module provides endpoints for managing music rooms:
- Creating new rooms
- Listing available rooms
- Getting room details
- Managing room members and tracks
"""

from fastapi import APIRouter, HTTPException
from typing import List
from app.models.room import Room, RoomCreate
from datetime import datetime
import uuid

router = APIRouter()

# In-memory storage for demo purposes
# In production, this would be replaced with a database
rooms_db: dict[str, Room] = {}


@router.get("/", response_model=List[Room])
def get_rooms(public_only: bool = True):
    """
    Get list of all music rooms.
    
    Args:
        public_only: If True, return only public rooms
        
    Returns:
        List of Room objects
    """
    all_rooms = list(rooms_db.values())
    
    if public_only:
        all_rooms = [room for room in all_rooms if room.is_public]
    
    return all_rooms


@router.get("/{room_id}", response_model=Room)
def get_room(room_id: str):
    """
    Get details of a specific music room.
    
    Args:
        room_id: Unique identifier of the room
        
    Returns:
        Room object with full details
        
    Raises:
        HTTPException: If room not found
    """
    if room_id not in rooms_db:
        raise HTTPException(status_code=404, detail="Room not found")
    
    return rooms_db[room_id]


@router.post("/", response_model=Room, status_code=201)
def create_room(room_data: RoomCreate):
    """
    Create a new music room.
    
    Args:
        room_data: Room creation data
        
    Returns:
        Newly created Room object
    """
    # Generate unique room ID
    room_id = f"room_{uuid.uuid4().hex[:8]}"
    
    # Create room object
    new_room = Room(
        id=room_id,
        name=room_data.name,
        description=room_data.description,
        genre=room_data.genre,
        is_public=room_data.is_public,
        created_at=datetime.now(),
        member_count=1  # Creator is the first member
    )
    
    # Store in database
    rooms_db[room_id] = new_room
    
    return new_room


@router.delete("/{room_id}")
def delete_room(room_id: str):
    """
    Delete a music room.
    
    Args:
        room_id: Unique identifier of the room to delete
        
    Returns:
        Success message
        
    Raises:
        HTTPException: If room not found
    """
    if room_id not in rooms_db:
        raise HTTPException(status_code=404, detail="Room not found")
    
    del rooms_db[room_id]
    
    return {"message": "Room deleted successfully", "room_id": room_id}


# Initialize with some sample data for testing
def initialize_sample_data():
    """Initialize the database with sample music rooms"""
    sample_rooms = [
        Room(
            id="room_sample1",
            name="Chill Vibes",
            description="Relaxing music for studying and working",
            genre="Lo-fi",
            is_public=True,
            created_at=datetime.now(),
            member_count=12
        ),
        Room(
            id="room_sample2",
            name="Rock Classics",
            description="The best rock hits from the 70s to 90s",
            genre="Classic Rock",
            is_public=True,
            created_at=datetime.now(),
            member_count=8
        )
    ]
    
    for room in sample_rooms:
        rooms_db[room.id] = room


# Initialize sample data on module load
initialize_sample_data()
