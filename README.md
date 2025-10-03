# Music Room 🎵

A collaborative music sharing and discovery platform built with React Native (frontend) and FastAPI (backend).

## 📋 Project Structure

```
music-room/
├── backend/              # FastAPI backend server
│   ├── app/
│   │   ├── routes/      # API route handlers
│   │   └── models/      # Data models and schemas
│   ├── main.py          # FastAPI application entry point
│   ├── requirements.txt # Python dependencies
│   └── Dockerfile       # Backend container configuration
│
├── frontend/            # React Native mobile app
│   ├── App.js          # Main React Native component
│   ├── package.json    # Node.js dependencies
│   ├── app.json        # Expo configuration
│   └── Dockerfile      # Frontend container configuration
│
├── docker-compose.yml  # Multi-container orchestration
├── Makefile           # Development commands
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Make (optional, for convenient commands)

### Using Make Commands

```bash
# Build all containers
make build

# Start all services
make up

# Stop all services
make down

# View logs
make logs

# Clean up everything
make clean
```

### Using Docker Compose Directly

```bash
# Build containers
docker-compose build

# Start services
docker-compose up

# Stop services
docker-compose down
```

## 📡 API Endpoints

Once running, the backend API is available at `http://localhost:8000`

### Health Check
- `GET /api/ping` - Test backend connectivity
- `GET /api/health` - Comprehensive health check

### Music Rooms
- `GET /api/rooms/` - List all music rooms
- `GET /api/rooms/{room_id}` - Get specific room details
- `POST /api/rooms/` - Create a new music room
- `DELETE /api/rooms/{room_id}` - Delete a room

## 📱 Frontend

The React Native app runs on:
- Web: `http://localhost:19006`
- Development server: `http://localhost:19000`

### Features
- View available music rooms
- Real-time backend connectivity status
- Pull-to-refresh functionality
- Modern dark-themed UI

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

### Frontend
- **React Native** - Mobile app framework
- **Expo** - Development platform
- **Axios** - HTTP client

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📝 Development Guide

### Backend Development

The backend follows a modular structure:
- `main.py` - Application initialization and middleware configuration
- `app/routes/` - API endpoint definitions
- `app/models/` - Data models and request/response schemas

To add new API endpoints:
1. Create a new router file in `app/routes/`
2. Define your endpoints using FastAPI decorators
3. Include the router in `main.py`

### Frontend Development

The frontend uses React Native with Expo:
- `App.js` - Main application component
- Hot reload enabled for fast development
- Axios for API calls to backend

To add new screens:
1. Create component files
2. Import and use in `App.js`
3. Configure navigation as needed

## 🔧 Configuration

### Backend Environment Variables
Create a `.env` file in the `backend/` directory:
```env
# Add your environment variables here
API_PORT=8000
DEBUG=True
```

### Frontend Configuration
Update API endpoint in `frontend/App.js`:
```javascript
const API_BASE_URL = 'http://localhost:8000';
```

## 🐳 Docker Details

### Backend Container
- Port: 8000
- Auto-reload enabled for development
- Volume mounted for hot-reload

### Frontend Container
- Ports: 19000, 19006
- Expo development server
- Volume mounted for hot-reload

## 📚 Next Steps

This is a starter template. Extend it by adding:
- User authentication
- Real-time music playback
- Room chat functionality
- Playlist management
- Music streaming integration
- Database integration (PostgreSQL, MongoDB)
- Redis for caching
- WebSocket support for real-time features

## 📄 License

MIT License - Feel free to use this starter for your projects!

## 🤝 Contributing

Contributions are welcome! This is a base template designed for easy extension.
