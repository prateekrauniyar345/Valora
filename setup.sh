#!/bin/bash

# 🚀 E-Commerce Quick Setup Script
# This script helps you set up the development environment quickly

echo "🛒 E-Commerce Platform - Quick Setup"
echo "===================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}❌ Node.js is not installed!${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node --version) detected${NC}"
echo ""

# Backend Setup
echo -e "${BLUE}📦 Setting up Backend...${NC}"
cd server

if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file not found. Creating from .env.example...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ Created .env file. Please update it with your credentials.${NC}"
fi

echo "Installing backend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend dependencies installed successfully!${NC}"
else
    echo -e "${YELLOW}❌ Failed to install backend dependencies${NC}"
    exit 1
fi

cd ..
echo ""

# Frontend Setup
echo -e "${BLUE}📦 Setting up Frontend...${NC}"
cd client/my-react-app

if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  .env.local file not found. Creating from .env.example...${NC}"
    cp .env.example .env.local
    echo -e "${GREEN}✅ Created .env.local file${NC}"
fi

echo "Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend dependencies installed successfully!${NC}"
else
    echo -e "${YELLOW}❌ Failed to install frontend dependencies${NC}"
    exit 1
fi

cd ../..
echo ""

# Setup Complete
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo ""
echo -e "${BLUE}📝 Next Steps:${NC}"
echo "1. Update server/.env with your MongoDB, Stripe, and other credentials"
echo "2. Start the backend:"
echo -e "   ${YELLOW}cd server && npm start${NC}"
echo "3. In a new terminal, start the frontend:"
echo -e "   ${YELLOW}cd client/my-react-app && npm run dev${NC}"
echo ""
echo -e "${BLUE}🌐 Access Points:${NC}"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:5001"
echo "   Health:   http://localhost:5001/health"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
