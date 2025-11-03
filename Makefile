
all: up

help:
	@echo "Music Room - Available Commands:"
	@echo "  make build   - Build all Docker containers"
	@echo "  make up      - Start all services"
	@echo "  make down    - Stop all services"
	@echo "  make restart - Restart all services"
	@echo "  make logs    - View logs from all services"
	@echo "  make status  - Show status of all containers"
	@echo "  make clean   - Remove containers, volumes, and images"

# Build all containers
build:
	@echo "Building all containers..."
	docker-compose build

# Start all services
up: build
	@echo "Starting all services..."
	docker-compose up -d
	@echo "Services started!"
	@echo "Backend API: http://localhost:8000"
	@echo "Frontend: http://localhost:19006"

# Stop all services
down:
	@echo "Stopping all services..."
	docker-compose down
	@echo "Services stopped!"

# Restart all services
restart: down up

# View logs from all services
logs:
	docker-compose logs -f

# Show status of containers
status:
	docker-compose ps

#
##				Clean up everything (containers, volumes, images)
#

clean:
	@echo "Cleaning up Docker resources..."
	docker compose down -v --rmi all
	docker 
	@echo "Cleanup complete!"

#
##				Development helpers
#

backend-logs:
	docker-compose logs -f backend

frontend-logs:
	docker-compose logs -f frontend

database-logs:
	docker compose logs -f database

backend-shell:
	docker-compose exec backend /bin/bash

frontend-shell:
	docker-compose exec frontend /bin/bash

database-shell:
	docker compose exec database /bin/bash


.PHONY: build up down logs clean restart status help
