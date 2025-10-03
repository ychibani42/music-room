# Makefile for Music Room Application
#
# This Makefile provides convenient commands for managing the Docker environment.
# It simplifies common Docker operations into easy-to-remember commands.
#
# Available commands:
#   make build  - Build all Docker containers
#   make up     - Start all services
#   make down   - Stop all services
#   make logs   - View logs from all services
#   make clean  - Remove all containers, volumes, and images

.PHONY: build up down logs clean restart status help

# Default target - show help
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
up:
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

# Clean up everything (containers, volumes, images)
clean:
	@echo "Cleaning up Docker resources..."
	docker-compose down -v --rmi all
	@echo "Cleanup complete!"

# Development helpers
backend-logs:
	docker-compose logs -f backend

frontend-logs:
	docker-compose logs -f frontend

backend-shell:
	docker-compose exec backend /bin/bash

frontend-shell:
	docker-compose exec frontend /bin/sh
