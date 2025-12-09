# 🌐 Host OWL ROLES on Your PC - Access From Anywhere

## Your PC Network Details
- **PC IP Address**: `172.20.10.2`
- **Backend URL**: `http://172.20.10.2:3000`
- **Frontend URL**: `http://172.20.10.2:5174`
- **API Docs**: `http://172.20.10.2:3000/api-docs`

---

## Step 1: Start Both Services

### Terminal 1 - Backend
```bash
cd ~/Downloads/Cubicals-main-main/backend
npm start
```

**Expected Output:**
```
==================================================
✓ Server running at http://172.20.10.2:3000
✓ Or access locally: http://localhost:3000
✓ API Docs: http://172.20.10.2:3000/api-docs
==================================================

mongodb connected successfully
```

### Terminal 2 - Frontend
```bash
cd ~/Downloads/Cubicals-main-main/frontend
npm run dev
```

**Expected Output:**
```
VITE v5.3.1  ready in 202 ms

➜  Local:   http://localhost:5174/
➜  Network: http://172.20.10.2:5174/
```

---

## Step 2: Access From Other Devices

### From Your PC:
- Open browser and go to: `http://172.20.10.2:5174`

### From Your Phone / Laptop / Any Device on Same WiFi:
1. Open browser
2. Go to: `http://172.20.10.2:5174`
3. App will load! ✓

### From Outside Your Network (Internet):
You'll need to set up port forwarding on your router:
1. Log into your router admin panel (usually `192.168.1.1`)
2. Find Port Forwarding settings
3. Forward ports:
   - **External Port 3000** → **Internal IP 172.20.10.2:3000** (Backend)
   - **External Port 5174** → **Internal IP 172.20.10.2:5174** (Frontend)
4. Get your public IP from: `https://whatismyip.com`
5. Access from anywhere: `http://YOUR_PUBLIC_IP:5174`

---

## What's Running Where

| Service | URL | Port | Access From |
|---------|-----|------|------------|
| Frontend | http://172.20.10.2:5174 | 5174 | Same WiFi ✓ / Internet (with port forward) |
| Backend API | http://172.20.10.2:3000 | 3000 | Same WiFi ✓ / Internet (with port forward) |
| API Docs | http://172.20.10.2:3000/api-docs | 3000 | Same WiFi ✓ / Internet (with port forward) |

---

## One-Command Startup (Optional)

Create a new terminal and run:
```bash
cd ~/Downloads/Cubicals-main-main && bash start-local.sh
```

This will start both services automatically.

---

## Firewall Configuration (If Issues)

If you can't access from other devices, check your firewall:

### macOS:
1. Go to **System Preferences** → **Security & Privacy** → **Firewall**
2. Click **Firewall Options**
3. Add Node.js to allowed apps (or allow all on local network)

### Windows:
1. Open **Windows Defender Firewall**
2. Click **Allow an app through firewall**
3. Find Node.js or add port 3000, 5174

---

## Troubleshooting

### Can't Access From Other Device?

1. **Check both services are running:**
   ```bash
   # Terminal 1
   curl http://172.20.10.2:3000
   
   # Terminal 2
   curl http://172.20.10.2:5174
   ```

2. **Check firewall is allowing ports:**
   ```bash
   lsof -i :3000
   lsof -i :5174
   ```

3. **Disable firewall temporarily for testing:**
   - macOS: System Preferences → Security & Privacy → Firewall → Turn Off
   - Windows: Windows Defender Firewall → Turn Off (temporarily)

4. **Check both are on same network:**
   - Your PC: `172.20.10.2`
   - Other device should be on same WiFi network

---

## Environment Variables Configured

### Backend (`backend/.env`)
```
VITE_API_END_POINT=http://172.20.10.2:3000
CLIENT_URL=http://172.20.10.2:5174
```

### Frontend (`frontend/.env`)
```
VITE_API_END_POINT=http://172.20.10.2:3000
```

---

## Test the Setup

### From Your PC:
1. Open: `http://172.20.10.2:5174`
2. Register a new account
3. Create a job posting
4. Apply to jobs
5. Update profile

### From Another Device (Same WiFi):
1. Get IP address from step above: `172.20.10.2`
2. Open: `http://172.20.10.2:5174` on that device
3. Use same login credentials
4. Everything should work! ✓

---

## Features Working

✅ User Registration & Login
✅ Profile Management
✅ Photo Upload
✅ Resume Upload
✅ Job Posting
✅ Job Browsing with Filters
✅ Job Applications
✅ Search & Filter
✅ Real-time Updates

---

## To Stop Services

Press `Ctrl + C` in both terminals:
- Terminal 1: `Ctrl + C` (Backend)
- Terminal 2: `Ctrl + C` (Frontend)

---

## Next Time You Want to Start

```bash
cd ~/Downloads/Cubicals-main-main

# Terminal 1
cd backend && npm start

# Terminal 2 (new terminal)
cd frontend && npm run dev
```

Access at: **http://172.20.10.2:5174** ✓

Enjoy! 🚀
