#!/bin/bash

# SkillSwap Platform Setup Script
# This script sets up the complete development environment

echo "🚀 Setting up SkillSwap Platform - User Story #6"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v16+) first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL is not installed. Please install MySQL first."
    echo "Visit: https://dev.mysql.com/downloads/"
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Copy environment file
echo "⚙️ Setting up environment configuration..."
if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "✅ Environment file created at backend/.env"
    echo "📝 Please update the database credentials in backend/.env"
else
    echo "✅ Environment file already exists"
fi

# Check if MySQL is running
echo "🔍 Checking MySQL service..."
if pgrep mysql > /dev/null; then
    echo "✅ MySQL is running"
else
    echo "⚠️ MySQL doesn't appear to be running. Please start MySQL:"
    echo "   - Linux: sudo service mysql start"
    echo "   - macOS: brew services start mysql"
    echo "   - Windows: net start mysql"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update database credentials in backend/.env"
echo "2. Start MySQL if not running"
echo "3. Set up the database: cd backend && npm run setup-db"
echo "4. Start the application: npm run dev"
echo ""
echo "The application will be available at:"
echo "- Frontend: http://localhost:3000"
echo "- Backend: http://localhost:5000"
echo ""
echo "For detailed instructions, see README.md"