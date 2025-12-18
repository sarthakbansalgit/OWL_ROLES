# 🚀 Cubicals - Quick Start Guide

## One-Command Setup & Run

Choose the script for your operating system and run it from the project root directory:

### macOS
```bash
bash setup.sh
```

### Linux
```bash
bash setup-linux.sh
```

### Windows
```bash
setup.bat
```

That's it! The script will:
✅ Install all dependencies for backend and frontend
✅ Create `.env` files with pre-configured values
✅ Start backend server on port 3000
✅ Start frontend development server on port 5174

---

## What Gets Installed & Configured

### Automatic Setup Includes:
- ✅ Backend dependencies (Express, MongoDB, GridFS, etc.)
- ✅ Frontend dependencies (React, Vite, Redux, Tailwind CSS)
- ✅ Backend `.env` file with MongoDB, JWT, and Cloudinary configs
- ✅ Frontend `.env.local` file with API endpoint
- ✅ Two new terminal windows with servers running

### Default Environment Values:
**Backend (.env):**
```
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://cubicals_user:CubicalsApp123@cubicals-cluster.mongodb.net/cubicals
JWT_SECRET=your_super_secret_jwt_key_change_in_production_2025
CLOUDINARY_NAME=dvwjy2pxo
CLOUDINARY_API_KEY=437768858779948
CLOUDINARY_API_SECRET=NnPxPq5sTvGfHj2pKqL9MwR5Xt
CLIENT_URL=http://localhost:5174
```

**Frontend (.env.local):**
```
VITE_API_END_POINT=http://localhost:3000
VITE_APP_NAME=Owl Roles
VITE_APP_VERSION=1.0.0
```

---

## Access the Application

Once both servers are running:

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:5174 |
| **Backend API** | http://localhost:3000 |
| **API Documentation** | http://localhost:3000/api-docs |

---

## First Time Usage

1. **Open Frontend:** Navigate to `http://localhost:5174`
2. **Sign Up:** Click "Sign Up" and create an account
   - Choose role: `student`, `recruiter`, or `superUser`
3. **Complete Profile:** Fill in your details
4. **Upload Resume:** Click "Upload Resume" (stored in MongoDB)
5. **Browse Jobs:** Use "Browse" to see all job listings
6. **Apply for Jobs:** Click "Apply" on any job posting

---

## Features Included

### 🎓 Student/Candidate Features
- ✅ Complete profile management
- ✅ Resume upload (GridFS storage in MongoDB)
- ✅ Research areas and publications tracking
- ✅ Work experience and qualifications
- ✅ ORCID iD integration
- ✅ Job browsing with 7+ filters
- ✅ Job applications tracking
- ✅ Profile completeness score

### 💼 Recruiter Features
- ✅ Post job listings
- ✅ View candidate applications
- ✅ Download candidate resumes
- ✅ Recruiter dashboard
- ✅ Job analytics

### 🔐 Security Features
- ✅ JWT authentication
- ✅ Password hashing with bcrypt
- ✅ Protected API routes
- ✅ Token refresh mechanism
- ✅ CORS configured

---

## Customizing Environment Variables

### To Change Backend Configuration:
Edit `backend/.env`:
```bash
nano backend/.env
```

Key settings to customize:
- `PORT` - Server port
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for token generation
- `CLOUDINARY_*` - Image upload service credentials

### To Change Frontend Configuration:
Edit `frontend/.env.local`:
```bash
nano frontend/.env.local
```

Key settings:
- `VITE_API_END_POINT` - Backend API URL

---

## Using Your Own MongoDB

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster and get connection string
3. Update `MONGODB_URI` in `backend/.env`:
```
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/cubicals?retryWrites=true&w=majority
```

---

## Using Your Own Cloudinary Account

For profile photo uploads:

1. Create account at https://cloudinary.com
2. Get your credentials from dashboard
3. Update in `backend/.env`:
```
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Troubleshooting

### Port Already in Use
```bash
# macOS/Linux - Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Windows - Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### MongoDB Connection Error
- Check internet connection
- Verify MongoDB URI in `.env`
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### Frontend Not Loading
- Clear browser cache: Ctrl+Shift+Del (or Cmd+Shift+Del on Mac)
- Check browser console for errors: F12
- Verify `VITE_API_END_POINT` is correct

### Backend Not Starting
- Check if Node.js is installed: `node --version`
- Check if npm is installed: `npm --version`
- Verify MongoDB connection string

---

## Project Structure

```
OWL_ROLES/
├── backend/                  # Express.js + Node.js
│   ├── controllers/         # Route handlers
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── middlewares/         # Custom middleware
│   ├── utils/               # Utility functions (GridFS, DB, etc)
│   ├── .env                 # Environment variables
│   └── index.js             # Main server file
│
├── frontend/                # React + Vite
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── redux/           # State management
│   │   ├── hooks/           # Custom hooks
│   │   └── utils/           # Utility functions
│   ├── .env.local           # Environment variables
│   └── vite.config.js       # Vite configuration
│
├── setup.sh                 # macOS setup script
├── setup-linux.sh          # Linux setup script
├── setup.bat               # Windows setup script
└── README.md               # Project documentation
```

---

## Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- GridFS (for file storage)
- JWT (authentication)
- Bcrypt (password hashing)
- Cloudinary (image uploads)
- Swagger (API documentation)

**Frontend:**
- React 18
- Vite (build tool)
- Redux (state management)
- Tailwind CSS (styling)
- Axios (HTTP client)
- Sonner (notifications)
- Lucide React (icons)

---

## Scripts Reference

### Backend Commands
```bash
cd backend
npm start              # Start server
npm test              # Run tests
npm run dev           # Start with nodemon
```

### Frontend Commands
```bash
cd frontend
npm run dev           # Start dev server
npm run build         # Build for production
npm run preview       # Preview build
npm run test          # Run tests
```

---

## Support & Documentation

- **API Docs:** http://localhost:3000/api-docs
- **Issues:** Check terminal output for detailed error messages
- **Logs:** Backend logs available in terminal

---

## Important Notes

⚠️ **Before Deploying to Production:**

1. Change `JWT_SECRET` to a strong random string
2. Update MongoDB credentials
3. Update Cloudinary API keys
4. Set `NODE_ENV=production`
5. Enable HTTPS
6. Add proper CORS configuration
7. Set strong password policies
8. Enable rate limiting
9. Add request validation
10. Set up proper logging and monitoring

---

## Next Steps

1. ✅ Run the setup script
2. ✅ Open http://localhost:5174
3. ✅ Sign up as a student or recruiter
4. ✅ Complete your profile
5. ✅ Upload your resume
6. ✅ Start exploring the platform!

---

**Happy coding! 🎉**

For more details, check the individual README files in backend/ and frontend/ directories.
