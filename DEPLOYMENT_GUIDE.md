# 🚀 OWL ROLES Deployment Guide

This guide will help you deploy the OWL ROLES Job Portal to production using free hosting platforms.

## Deployment Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Your Users                        │
└────────────────┬────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
   ┌────▼─────┐      ┌────▼──────┐
   │  Vercel  │      │   Render   │
   │ (Frontend)      │ (Backend)  │
   └──────────┘      └────┬───────┘
                           │
                    ┌──────▼──────┐
                    │  MongoDB    │
                    │   Atlas     │
                    └─────────────┘
```

---

## Part 1: Frontend Deployment (Vercel)

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub account
3. Authorize Vercel to access your GitHub repositories

### Step 2: Deploy Frontend
1. Click "Add New" → "Project"
2. Select "OWL_ROLES" repository
3. Configure project:
   - **Framework:** Other
   - **Root Directory:** `./`
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Output Directory:** `frontend/dist`

### Step 3: Set Environment Variables
In Vercel dashboard, go to Settings → Environment Variables:

```
VITE_API_URL = https://owl-roles-backend.onrender.com
```

(Replace with your actual backend URL from Step 4)

### Step 4: Deploy
Click "Deploy" button and wait for deployment to complete.

**Frontend URL:** `https://<your-project>.vercel.app`

---

## Part 2: Backend Deployment (Render)

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub account
3. Connect your GitHub account

### Step 2: Create Web Service
1. Click "New" → "Web Service"
2. Select "OWL_ROLES" repository
3. Configure service:
   - **Name:** `owl-roles-backend`
   - **Environment:** `Node`
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Instance Type:** Free (or Starter - $7/month for better performance)

### Step 3: Set Environment Variables
In Render dashboard, go to Settings → Environment:

```
PORT=3000
NODE_ENV=production

MONGO_URI=<Your MongoDB Atlas Connection String>

JWT_SECRET=<Generate a strong secret key>

CLOUDINARY_NAME=<Your Cloudinary Name>

EMAIL_USER=<Your Email>
EMAIL_PASSWORD=<Your App Password>

CLIENT_URL=https://<your-vercel-frontend>.vercel.app

REDIS_URL=<Optional: Redis URL if using>
```

### Step 4: Deploy
Click "Create Web Service" and Render will auto-deploy from your repository.

**Backend URL:** `https://owl-roles-backend.onrender.com`

---

## Part 3: Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free account)
3. Create a new cluster

### Step 2: Get Connection String
1. In MongoDB Atlas, click "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` and `<database-name>` with your values

### Step 3: Update Backend
Add the MongoDB URI to your Render environment variables (see Part 2, Step 3)

---

## Part 4: Cloudinary Setup (File Uploads)

### Step 1: Create Cloudinary Account
1. Go to https://cloudinary.com
2. Sign up (free account with 25 credits)
3. Go to Dashboard

### Step 2: Get Credentials
- Copy **Cloud Name**
- Go to API Keys tab
- Copy **API Key** and **API Secret**

### Step 3: Create Upload Preset
1. Go to Settings → Upload
2. Create unsigned upload preset named: `owlroles_unsigned_preset`
3. Add this to your Render environment variables

---

## Part 5: Email Setup (Optional - Nodemailer)

### Step 1: Enable 2FA on Gmail
1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification

### Step 2: Generate App Password
1. In Google Account, go to Security
2. Find "App passwords"
3. Select Mail and Windows Computer
4. Generate and copy password

### Step 3: Add to Backend
Add to Render environment variables:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=<generated-app-password>
```

---

## Deployment Checklist

### Before Deploying
- [ ] Repository pushed to GitHub with all latest changes
- [ ] All environment variables properly configured
- [ ] MongoDB Atlas cluster created and connection string obtained
- [ ] Cloudinary account set up with API credentials
- [ ] Email account ready (if using email features)

### Frontend (Vercel)
- [ ] GitHub repository connected to Vercel
- [ ] Build command configured: `npm run build`
- [ ] Output directory set to: `dist`
- [ ] `VITE_API_URL` environment variable set
- [ ] Frontend deployed successfully

### Backend (Render)
- [ ] GitHub repository connected to Render
- [ ] Build command configured
- [ ] Start command configured
- [ ] All 8 environment variables added
- [ ] Backend deployed successfully

### Testing
- [ ] Frontend loads at Vercel URL
- [ ] Backend API responds at Render URL
- [ ] Can sign up and create account
- [ ] Can login successfully
- [ ] Can browse jobs
- [ ] Can upload images/profile pictures
- [ ] Can apply to jobs
- [ ] Database operations work correctly

---

## Post-Deployment

### Update Frontend URL
If backend needs to know frontend URL:
```
CLIENT_URL=https://your-vercel-app.vercel.app
```

### Monitor Logs
- **Vercel:** Deployments tab shows build logs
- **Render:** Events tab shows deployment logs

### Performance Optimization
- Vercel automatically optimizes frontend builds
- Render provides logs if backend has issues
- Use MongoDB Atlas monitoring for database performance

### Scale Up (If Needed)
- Vercel: Paid plans start at $20/month
- Render: Paid instances start at $7/month
- MongoDB Atlas: Free tier has 512MB storage limit

---

## Troubleshooting

### Frontend Not Loading
1. Check Vercel deployment logs
2. Verify `VITE_API_URL` is correct
3. Check browser console for errors

### Backend Not Responding
1. Check Render deployment logs
2. Verify all environment variables are set
3. Test API endpoints with Postman
4. Check MongoDB connection string

### Database Connection Issues
1. Check MongoDB Atlas network access (allow all IPs: 0.0.0.0)
2. Verify connection string has correct username/password
3. Check firewall settings

### Image Upload Not Working
1. Verify Cloudinary credentials in environment variables
2. Check upload preset name matches code
3. Verify Cloudinary account is active

---

## Live URLs (After Deployment)

**Frontend:** `https://your-vercel-app.vercel.app`
**Backend API:** `https://owl-roles-backend.onrender.com`
**API Docs:** `https://owl-roles-backend.onrender.com/api-docs`

---

## Cost Breakdown

| Service | Free Tier | Cost |
|---------|-----------|------|
| Vercel | ✅ Unlimited | $0 |
| Render | ✅ Limited (sleeps after 15min) | $7/month for always-on |
| MongoDB Atlas | ✅ 512MB storage | $0 |
| Cloudinary | ✅ 25 credits/month | $0 (paid plans available) |
| **Total** | **Free** | **~$0-7/month** |

---

## Environment Variables Summary

### Frontend (.env.local or Vercel)
```
VITE_API_URL=https://owl-roles-backend.onrender.com
```

### Backend (Render)
```
PORT=3000
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-super-secret-jwt-key
CLOUDINARY_NAME=your-cloudinary-name
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
CLIENT_URL=https://your-vercel-app.vercel.app
```

---

## Support

- GitHub Issues: https://github.com/sarthakbansalgit/OWL_ROLES/issues
- Vercel Support: https://vercel.com/support
- Render Support: https://render.com/docs
- MongoDB Support: https://docs.mongodb.com

---

**Deployment is now LIVE! 🎉**

Last Updated: December 2025
