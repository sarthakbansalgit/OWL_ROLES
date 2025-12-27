
# Render Deployment Guide

## Prerequisites
- GitHub account
- Render account (render.com)
- Environment variables ready

## Deployment Steps

### 1. Backend Deployment
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repo `OWL_ROLES`
4. Configure:
   - **Name:** owl-roles-backend
   - **Root Directory:** backend
   - **Runtime:** Node
   - **Build Command:** `npm install --legacy-peer-deps`
   - **Start Command:** `npm start`
   - **Plan:** Free
5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=3000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email
   EMAIL_PASSWORD=your_password
   CLIENT_URL=https://your-frontend.onrender.com
   CLOUDINARY_NAME=your_name
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   ```
6. Click "Deploy"

### 2. Frontend Deployment
1. Click "New +" → "Web Service"
2. Connect same repo
3. Configure:
   - **Name:** owl-roles-frontend
   - **Root Directory:** frontend
   - **Runtime:** Node
   - **Build Command:** `npm install --legacy-peer-deps && npm run build`
   - **Start Command:** `npm run preview -- --host 0.0.0.0`
   - **Plan:** Free
4. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=5174
   VITE_API_END_POINT=https://your-backend.onrender.com
   VITE_CLOUDINARY_NAME=your_name
   VITE_CLOUDINARY_PRESET=your_preset
   ```
5. Click "Deploy"

### 3. Wait for Deployment
Both services will build and deploy automatically. You'll get URLs like:
- Backend: https://owl-roles-backend.onrender.com
- Frontend: https://owl-roles-frontend.onrender.com

## Notes
- Free tier services sleep after 15 mins of inactivity (takes ~30s to wake up)
- Build takes ~2-3 minutes
- `--legacy-peer-deps` prevents peer dependency conflicts
