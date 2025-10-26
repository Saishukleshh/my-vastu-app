# Deployment Guide - Ravi Vastu Jyotish

## Method 1: Render.com (Recommended - Easiest)

### Step 1: Push to GitHub
1. Go to https://github.com and create account
2. Click "New Repository"
3. Name: `ravi-vastu-jyotish`
4. Click "Create Repository"

### Step 2: Upload Code to GitHub
```bash
cd c:\Users\Saishuklesh\OneDrive\Desktop\my-vastu-app
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ravi-vastu-jyotish.git
git push -u origin main
```

### Step 3: Deploy on Render
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - Name: `ravi-vastu-jyotish`
   - Build Command: `npm install`
   - Start Command: `node simple-server.js`
6. Add Environment Variables:
   - `EMAIL_USER` = iammoneymagnet456@gmail.com
   - `EMAIL_PASS` = your-gmail-app-password
   - `NODE_ENV` = production
7. Click "Create Web Service"

Your site will be live at: https://ravi-vastu-jyotish.onrender.com

---

## Method 2: Without Git (Manual Upload)

### Option A: Render (Manual)
1. Zip your entire `my-vastu-app` folder
2. Go to https://render.com
3. Use "Deploy from Git" but upload zip manually

### Option B: Netlify Drop
1. Go to https://app.netlify.com/drop
2. Drag and drop your `my-vastu-app` folder
3. Done! (Note: Backend features won't work)

---

## Method 3: Railway.app

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables
6. Deploy automatically

---

## Environment Variables Required

```
EMAIL_USER=iammoneymagnet456@gmail.com
EMAIL_PASS=your-16-digit-gmail-app-password
NODE_ENV=production
PORT=3000
```

## Files Included in Deployment

✅ All HTML, CSS, JS files
✅ Server files (server.js, simple-server.js)
✅ Routes (chatbot.js, consultations.js)
✅ Package.json with dependencies
✅ Environment configuration
✅ Admin panel
✅ AI Chatbot knowledge base

## After Deployment

1. Test your live URL
2. Check chatbot functionality
3. Test booking form
4. Verify email notifications
5. Add custom domain (optional)

## Support

Contact: +91 7378915519
Email: iammoneymagnet456@gmail.com
