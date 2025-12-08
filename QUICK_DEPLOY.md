# 🚀 Quick Deployment Links

## One-Click Deployment

### Frontend - Deploy to Vercel
Click to deploy frontend in one click:
```
https://vercel.com/new?utm_medium=default-template&filter=next.js&filterType=template
```

After clicking "Import":
1. Select your OWL_ROLES repository from GitHub
2. Set Root Directory to: `frontend`
3. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://owl-roles-backend.onrender.com`
4. Click Deploy

---

### Backend - Deploy to Render
1. Go to https://render.com/new/web-service
2. Connect GitHub account
3. Select OWL_ROLES repository
4. Fill these settings:
   - **Name:** owl-roles-backend
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Root Directory:** Leave empty
5. Add all Environment Variables (see DEPLOYMENT_GUIDE.md)
6. Click Create Web Service

---

## Database - MongoDB Atlas
1. Sign up: https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Add to Render as `MONGO_URI`

---

## Files Upload - Cloudinary
1. Sign up: https://cloudinary.com
2. Get Cloud Name and API Keys
3. Create upload preset: `owlroles_unsigned_preset`
4. Add credentials to Render environment

---

## Result
- Frontend: `https://<project>.vercel.app`
- Backend: `https://owl-roles-backend.onrender.com`
- Status: 🟢 LIVE

See DEPLOYMENT_GUIDE.md for detailed instructions.
