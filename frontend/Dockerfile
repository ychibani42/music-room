# Frontend Dockerfile - React Native with Expo
# This Dockerfile creates a containerized development environment for the React Native frontend.
# It uses Expo for easier development and testing.

# Use Node.js LTS as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Set environment variables for Expo
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0

# Install Expo CLI globally
RUN npm install -g expo-cli@6.3.10

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy application code
COPY . .

# Expose ports
# Metro bundler
EXPOSE 8081
# Expo development server
EXPOSE 19000
# Expo web interface
EXPOSE 19006

# Start Expo web server
CMD ["npx", "expo", "start", "--web", "--host", "0.0.0.0"]
