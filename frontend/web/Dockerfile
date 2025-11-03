# Frontend Dockerfile - React Native with Expo
# This Dockerfile creates a containerized development environment for the React Native frontend.
# It uses Expo for easier development and testing.

# Use Node.js LTS as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install Expo CLI globally
RUN npm install -g expo-cli

# Copy package files
COPY package*.json ./

# Install dependencies
# Using --legacy-peer-deps to handle potential dependency conflicts
RUN npm install --legacy-peer-deps

# Copy application code
COPY . .

# Expose Expo development server port
EXPOSE 19000
# Expo web port
EXPOSE 19006

# Start Expo development server
# The --tunnel flag allows access from physical devices
CMD ["npm", "start"]
