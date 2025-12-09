# 🌍 Make OWL ROLES Accessible on Public Internet

Your Public IP: **112.110.51.25**

---

## Option 1: Using NGROK (Easiest - No Router Access Needed) ⭐ RECOMMENDED

### Step 1: Install ngrok
```bash
# macOS
brew install ngrok

# Or download from https://ngrok.com
```

### Step 2: Start Your Services
```bash
# Terminal 1 - Backend
cd ~/Downloads/Cubicals-main-main/backend && npm start

# Terminal 2 - Frontend
cd ~/Downloads/Cubicals-main-main/frontend && npm run dev
```

### Step 3: Expose to Internet (Terminal 3)

**For Backend:**
```bash
ngrok http 3000
```

You'll see output like:
```
Session Status       online
Account              sarthakbansal@gmail.com
Version              3.0.0
Region               us (United States)
Web Interface        http://127.0.0.1:4040
Forwarding           https://XXXX-XXX-XXX-XX.ngrok.io -> http://localhost:3000
```

**For Frontend (Terminal 4):**
```bash
ngrok http 5174
```

You'll get URLs like:
```
Forwarding           https://XXXX-XXX-XXX-YY.ngrok.io -> http://localhost:5174
```

### Step 4: Update Frontend .env
Edit `frontend/.env`:
```
VITE_API_END_POINT=https://XXXX-XXX-XXX-XX.ngrok.io
```

### Step 5: Access From Anywhere
- Frontend: `https://XXXX-XXX-XXX-YY.ngrok.io`
- Backend: `https://XXXX-XXX-XXX-XX.ngrok.io`

**That's it! Your app is now public!** ✓

---

## Option 2: Using Port Forwarding (Requires Router Access)

### What You'll Need:
- Your public IP: `112.110.51.25`
- Your local IP: `172.20.10.2`
- Access to router admin panel

### Step 1: Access Router Admin Panel
1. Open browser
2. Go to: `192.168.1.1` or `192.168.0.1` (typical router IPs)
3. Log in (default username/password usually on router label)

### Step 2: Set Up Port Forwarding
1. Find **Port Forwarding** section
2. Create 2 forwarding rules:

**Rule 1 - Backend:**
- External Port: `3000`
- Internal IP: `172.20.10.2`
- Internal Port: `3000`
- Protocol: TCP

**Rule 2 - Frontend:**
- External Port: `5174`
- Internal IP: `172.20.10.2`
- Internal Port: `5174`
- Protocol: TCP

### Step 3: Update Frontend .env
Edit `frontend/.env`:
```
VITE_API_END_POINT=http://112.110.51.25:3000
```

### Step 4: Access From Anywhere
- Frontend: `http://112.110.51.25:5174`
- Backend: `http://112.110.51.25:3000`

---

## Option 3: Deploy to Free Cloud Services (Best for Production)

### Recommended Services:
1. **Render.com** - Free tier, easy deployment
2. **Railway.app** - Free tier with generous limits
3. **Fly.io** - Free tier for small apps
4. **Vercel** - Free tier for frontend

**Advantages:**
- No need to keep PC running
- Better uptime
- Automatic SSL/HTTPS
- Better performance

---

## Comparison of Options

| Method | Ease | Always On | Speed | Free | Setup Time |
|--------|------|-----------|-------|------|------------|
| ngrok | ⭐⭐⭐⭐⭐ | ❌ | Fast | ✅ | 5 min |
| Port Forward | ⭐⭐⭐ | ✅ | Fast | ✅ | 15 min |
| Cloud Deploy | ⭐⭐ | ✅ | Very Fast | ✅ | 30 min |

---

## 🚀 Quick Start With NGROK

```bash
# Terminal 1
cd ~/Downloads/Cubicals-main-main/backend && npm start

# Terminal 2
cd ~/Downloads/Cubicals-main-main/frontend && npm run dev

# Terminal 3
brew install ngrok
ngrok http 3000

# Terminal 4
ngrok http 5174

# Update frontend/.env with the ngrok URLs
# Open the ngrok frontend URL in browser ✓
```

---

## ⚠️ Important Security Notes

1. **Don't expose sensitive data:**
   - Keep `JWT_SECRET` secure
   - Use environment variables for API keys
   - Never commit `.env` files

2. **For Production:**
   - Use HTTPS (ngrok provides this automatically)
   - Set up proper authentication
   - Use environment-specific configs

3. **Database Security:**
   - Your MongoDB is cloud-hosted (secure)
   - Ensure IP whitelist in MongoDB Atlas

---

## Troubleshooting

### ngrok Not Working?
```bash
# Check if ngrok is installed
which ngrok

# If not, install:
brew install ngrok

# Or download from ngrok.com and add to PATH
```

### Port Forwarding Not Working?
1. Check firewall allows ports 3000, 5174
2. Verify internal IP is correct: `ipconfig getifaddr en0`
3. Wait 5 minutes for changes to apply
4. Restart router if needed

### Can't Access From Public IP?
1. Test locally first: `curl http://172.20.10.2:3000`
2. Test with public IP from different network
3. Check firewall settings
4. Try ngrok as alternative

---

## Access Your App

### Once Setup Complete:

**ngrok Users:**
- Frontend: `https://your-ngrok-frontend-url`
- Backend: `https://your-ngrok-backend-url`

**Port Forward Users:**
- Frontend: `http://112.110.51.25:5174`
- Backend: `http://112.110.51.25:3000`

**Share with Others:**
- Send them the URL
- They can access your app from anywhere! 🎉

---

## Keeping Services Running 24/7

To keep your app running when you close terminal:

### Using `pm2` (Recommended):
```bash
npm install -g pm2

# Terminal 1
cd ~/Downloads/Cubicals-main-main/backend && pm2 start npm --name backend -- start

# Terminal 2
cd ~/Downloads/Cubicals-main-main/frontend && pm2 start npm --name frontend -- run dev

# View logs
pm2 logs

# Stop services
pm2 stop all
```

---

## Next Steps

1. **Choose Option 1 (ngrok)** for quickest setup - takes 5 minutes!
2. **Share your public URL** with anyone
3. **They can use the app** without any setup needed

Enjoy! 🚀
