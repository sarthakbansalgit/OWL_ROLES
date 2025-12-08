#!/bin/bash

# OWL ROLES - Quick Deployment Setup Script
# This script prepares your project for deployment

echo "🦉 OWL ROLES - Deployment Setup"
echo "================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Git and Node.js are installed"
echo ""

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
echo "Installing backend dependencies..."
cd backend && npm install && cd ..
echo "Installing frontend dependencies..."
cd frontend && npm install && cd ..
echo "✅ Dependencies installed"
echo ""

# Step 2: Build frontend
echo "🔨 Building frontend..."
cd frontend && npm run build && cd ..
echo "✅ Frontend build complete"
echo ""

# Step 3: Create environment templates
echo "📝 Creating environment configuration templates..."

# Backend .env template
cat > backend/.env.example << 'EOF'
# Server Configuration
PORT=3000
NODE_ENV=production

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name

# Authentication
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name

# Email Service
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Redis (Optional)
REDIS_URL=redis://localhost:6379

# Frontend URL
CLIENT_URL=https://owl-roles.vercel.app
EOF

# Frontend .env.local template
cat > frontend/.env.example << 'EOF'
VITE_API_URL=https://owl-roles-backend.onrender.com
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
EOF

echo "✅ Environment templates created"
echo ""

# Step 4: Git setup
echo "📤 Preparing for GitHub deployment..."
git status

echo ""
echo "================================"
echo "✅ Deployment Setup Complete!"
echo "================================"
echo ""
echo "Next Steps:"
echo "1. Fill in your environment variables in backend/.env"
echo "2. Fill in your environment variables in frontend/.env.local"
echo "3. Commit and push to GitHub"
echo "4. Follow the DEPLOYMENT_GUIDE.md for step-by-step instructions"
echo ""
echo "Quick Links:"
echo "- Vercel: https://vercel.com"
echo "- Render: https://render.com"
echo "- MongoDB Atlas: https://www.mongodb.com/cloud/atlas"
echo "- Cloudinary: https://cloudinary.com"
echo ""
