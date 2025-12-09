# 🚀 Running OWL ROLES Locally

## Prerequisites
- Node.js 18.x installed ([Download](https://nodejs.org))
- MongoDB Atlas account (for database)
- Cloudinary account (for file uploads)

---

## Quick Start (ONE COMMAND)

### On macOS/Linux:
```bash
bash start-local.sh
```

### On Windows:
```bash
start-local.bat
```

This will automatically start both backend and frontend!

---

## Manual Setup (If automatic script doesn't work)

### Terminal 1 - Start Backend
```bash
cd backend
npm install
npm start
```

Backend will run on: **http://localhost:3000**

### Terminal 2 - Start Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend will run on: **http://localhost:5173**

---

## Configuration

### Backend Environment Variables
File: `backend/.env`

```
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb+srv://sarthak:lolhumai21@cluster0.aqwhtkw.mongodb.net/nilesh?retryWrites=true&w=majority
JWT_SECRET=my_jwt_secret_key_2024
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
CLIENT_URL=http://localhost:5173
```

### Frontend Environment Variables
File: `frontend/.env`

```
VITE_API_END_POINT=http://localhost:3000
VITE_CLOUDINARY_NAME=your_cloudinary_name
VITE_CLOUDINARY_PRESET=your_upload_preset
```

---

## Accessing the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Swagger API Docs**: http://localhost:3000/api/v1/docs

---

## Common Issues & Fixes

### Port Already in Use
```bash
# Kill process on port 3000 (Backend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 5173 (Frontend)
lsof -ti:5173 | xargs kill -9
```

### MongoDB Connection Error
- Check your internet connection
- Verify MONGO_URI in `backend/.env`
- Ensure your IP is whitelisted in MongoDB Atlas

### Cloudinary Upload Not Working
- Verify Cloudinary credentials in environment variables
- Check upload preset name

### Module Not Found Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Features to Test

1. **User Registration** - Create new account
2. **Login** - Sign in with credentials
3. **Profile Update** - Edit your profile
4. **Photo Upload** - Upload profile photo
5. **Resume Upload** - Upload resume (PDF)
6. **Browse Jobs** - View all job listings
7. **Apply to Jobs** - Submit job applications
8. **Search & Filter** - Search and filter jobs

---

## Database & Collections

Your MongoDB database contains:
- **Users** - User profiles and authentication
- **Companies** - Company information
- **Jobs** - Job postings
- **Applications** - Job applications
- **Blogs** - Blog posts
- **Comments** - Blog comments

---

## Stopping the Application

### If using automatic script:
- Press `Ctrl + C` in the terminal

### If running manually:
- Terminal 1 (Backend): Press `Ctrl + C`
- Terminal 2 (Frontend): Press `Ctrl + C`

---

## Next Steps

After running locally:
1. Create test users
2. Post job listings
3. Submit applications
4. Test all features
5. Then deploy to production (Vercel + Render)

Enjoy! 🎉
