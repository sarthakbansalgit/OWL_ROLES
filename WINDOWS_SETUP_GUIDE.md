# 🎯 Windows Setup Script - Complete Guide

## What This Script Does

The `setup.bat` script will **automatically**:

1. ✅ **Check** if you're in the correct project directory
2. ✅ **Install** backend dependencies (npm install)
3. ✅ **Create** backend `.env` file with all credentials
4. ✅ **Display** all MongoDB URI, API keys, and secrets (CLEARLY VISIBLE)
5. ✅ **Install** frontend dependencies (npm install)
6. ✅ **Create** frontend `.env.local` file
7. ✅ **Verify** both .env files are created correctly
8. ✅ **Show** the complete contents of both files
9. ✅ **Start** backend server in a new window
10. ✅ **Start** frontend server in a new window

---

## How to Use

### Step 1: Download the Project
```bash
git clone https://github.com/sarthakbansalgit/OWL_ROLES.git
cd OWL_ROLES
```

### Step 2: Run the Setup Script
Double-click: `setup.bat`

**OR** Open Command Prompt and run:
```cmd
setup.bat
```

### Step 3: Wait for Setup to Complete
The script will:
- Show installation progress
- Display all credentials clearly
- Verify the .env files
- Start both servers automatically

---

## Credentials Created

### Backend (.env) - All Values Shown:

```
PORT=3000
NODE_ENV=development

MONGODB_URI=mongodb+srv://cubicals_user:CubicalsApp123@cubicals-cluster.mongodb.net/cubicals?retryWrites=true&w=majority

JWT_SECRET=your_super_secret_jwt_key_change_in_production_2025

CLOUDINARY_NAME=dvwjy2pxo
CLOUDINARY_API_KEY=437768858779948
CLOUDINARY_API_SECRET=NnPxPq5sTvGfHj2pKqL9MwR5Xt

CLIENT_URL=http://localhost:5174

MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password

RATE_LIMIT=100
LOG_LEVEL=debug
```

**Location:** `OWL_ROLES\backend\.env`

### Frontend (.env.local) - All Values Shown:

```
VITE_API_END_POINT=http://localhost:3000
VITE_APP_NAME=Owl Roles
VITE_APP_VERSION=1.0.0
```

**Location:** `OWL_ROLES\frontend\.env.local`

---

## What Happens After Setup

### Two New Windows Will Open:

**Window 1: Backend Server**
```
Title: Backend Server (Port 3000)
Command: npm start
Status: Server running on http://localhost:3000
```

**Window 2: Frontend Server**
```
Title: Frontend Dev Server (Port 5174)
Command: npm run dev
Status: Server running on http://localhost:5174
```

---

## Accessing the Application

Once both servers are running:

| What | Where |
|------|-------|
| **Application UI** | http://localhost:5174 |
| **Backend API** | http://localhost:3000 |
| **API Documentation** | http://localhost:3000/api-docs |

---

## Detailed What Each Credential Does

### MongoDB URI
```
mongodb+srv://cubicals_user:CubicalsApp123@cubicals-cluster.mongodb.net/cubicals
```
- **Host:** cubicals-cluster.mongodb.net
- **Username:** cubicals_user
- **Password:** CubicalsApp123
- **Database:** cubicals
- **Function:** Stores all user data, jobs, applications, and resumes

### JWT Secret
```
your_super_secret_jwt_key_change_in_production_2025
```
- **Function:** Signs and verifies login tokens
- **Expiry:** Default 1.5 hours per session

### Cloudinary Credentials
```
CLOUDINARY_NAME: dvwjy2pxo
CLOUDINARY_API_KEY: 437768858779948
CLOUDINARY_API_SECRET: NnPxPq5sTvGfHj2pKqL9MwR5Xt
```
- **Function:** Stores profile photos (optional)
- **Note:** Resumes are stored in MongoDB GridFS, not Cloudinary

---

## Verifying Everything Works

### Check Backend Started:
Look for message in backend window:
```
✓ Server running at http://localhost:3000
✓ GridFS bucket initialized
✓ MongoDB connected successfully
```

### Check Frontend Started:
Look for message in frontend window:
```
  ➜  Local:   http://localhost:5174/
  ➜  press h to show help
```

### Test in Browser:
1. Go to http://localhost:5174
2. Should see the Owl Roles login page
3. Click "Sign Up"
4. Create an account

---

## If Something Goes Wrong

### Backend Window Shows Error

**Problem:** "Cannot find module 'mongodb'"
```
Solution: Wait longer for npm install to finish
```

**Problem:** "Port 3000 already in use"
```
Solution: Close other apps using port 3000
         Or edit backend/.env and change PORT to 3001
```

**Problem:** "MongoDB connection failed"
```
Solution: Check internet connection
         Verify MongoDB URI in backend/.env
         Check MongoDB Atlas firewall rules
```

### Frontend Window Shows Error

**Problem:** "Module not found"
```
Solution: Wait longer for npm install to finish
```

**Problem:** "Cannot GET /"
```
Solution: Make sure backend is running
         Check VITE_API_END_POINT in frontend/.env.local
```

### Both Not Starting

**Problem:** "Node.js is not recognized"
```
Solution: Install Node.js from https://nodejs.org
         Restart your computer
         Run setup.bat again
```

---

## After Setup - First Time Usage

### 1. Create Your Account
- Go to http://localhost:5174
- Click "Sign Up"
- Choose role: **Student** or **Recruiter**
- Fill in your details

### 2. Complete Your Profile
- Edit Profile
- Add your bio, location, skills
- Add qualifications and experience
- Add research areas (for academics)
- Add publications (for academics)

### 3. Upload Your Resume
- Go to Edit Profile
- Scroll to "Resume (PDF)" section
- Click "Upload Resume"
- Select a PDF file from your computer
- Wait for upload to complete
- Resume is now stored in MongoDB

### 4. For Students:
- Go to "Browse"
- See all available jobs
- Use filters to find jobs matching your profile
- Click "Apply" on jobs you're interested in

### 5. For Recruiters:
- Post new job listings
- View candidate applications
- Download candidate resumes
- Track application status

---

## Important Security Notes

### ⚠️ Before Sharing This Project:

1. **Change JWT_SECRET** to something only you know
2. **Don't commit .env files** to public repositories
3. **Update Cloudinary credentials** if using your own account
4. **Review MongoDB permissions** - limit to your IP

### Files to Keep Private:
- ❌ `backend/.env` - Contains sensitive credentials
- ❌ `frontend/.env.local` - Contains API endpoint

### Add to .gitignore (already done):
```
backend/.env
frontend/.env.local
node_modules/
.DS_Store
```

---

## Customizing for Your Own Services

### Use Your Own MongoDB:

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Edit `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/cubicals
   ```
5. Restart backend server

### Use Your Own Cloudinary:

1. Go to https://cloudinary.com
2. Sign up and get API credentials
3. Edit `backend/.env`:
   ```
   CLOUDINARY_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   ```
4. Restart backend server

---

## Environment Variables Explained

| Variable | Where | What It Does |
|----------|-------|---|
| `PORT` | Backend | What port the API runs on |
| `MONGODB_URI` | Backend | Connection string to MongoDB database |
| `JWT_SECRET` | Backend | Secret key for user authentication |
| `CLOUDINARY_NAME` | Backend | Cloud storage service name |
| `CLOUDINARY_API_KEY` | Backend | API authentication key |
| `CLOUDINARY_API_SECRET` | Backend | Secret API key |
| `CLIENT_URL` | Backend | Where frontend is running (for CORS) |
| `NODE_ENV` | Backend | development/production mode |
| `LOG_LEVEL` | Backend | How much logging (debug/info/warn) |
| `VITE_API_END_POINT` | Frontend | Where backend API is running |
| `VITE_APP_NAME` | Frontend | Application name shown in UI |
| `VITE_APP_VERSION` | Frontend | Application version number |

---

## Server Commands (If Needed)

### Restart Backend:
```cmd
cd backend
npm start
```

### Restart Frontend:
```cmd
cd frontend
npm run dev
```

### Install Dependencies Again:
```cmd
npm install
```

### Clear npm Cache:
```cmd
npm cache clean --force
```

---

## Getting Help

### Check Logs:
- Backend logs in backend window
- Frontend logs in frontend window
- Browser console: Press F12 in your browser

### Find Errors:
- Terminal windows will show detailed error messages
- Look for red text with error names
- Read the error message carefully

### Debug API Calls:
1. Open browser console (F12)
2. Go to Network tab
3. Try an action (login, upload, etc)
4. See the API request and response

---

## Next Steps After Setup

1. ✅ Run `setup.bat`
2. ✅ Wait for both servers to start
3. ✅ Open http://localhost:5174
4. ✅ Sign up as a student
5. ✅ Upload your resume
6. ✅ Browse and apply for jobs
7. ✅ Explore all features!

---

## Summary

**setup.bat does:**
- ✅ Downloads all dependencies
- ✅ Creates .env files with real credentials (all shown)
- ✅ Verifies the configuration
- ✅ Starts both servers
- ✅ Opens terminal windows for you to monitor

**You get:**
- ✅ Full working application
- ✅ Real MongoDB database
- ✅ Cloud storage for photos
- ✅ Complete job portal functionality

**Credentials are:**
- ✅ VISIBLE in the script output
- ✅ WRITTEN to .env files
- ✅ READY TO USE immediately
- ✅ CHANGEABLE anytime you want

---

**Everything is automated. Just run the script and enjoy! 🎉**
