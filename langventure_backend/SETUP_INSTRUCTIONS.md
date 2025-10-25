# 🚀 Quick Setup Instructions for LangVenture Backend

## Current Status

✅ **Backend is ready!** All code has been implemented and reviewed.

⚠️ **Action Required**: MongoDB Atlas IP whitelisting needed before the database will connect.

---

## ⚡ Next Steps to Get Running

### 1. Configure MongoDB Atlas IP Whitelist

Your server can't connect to MongoDB Atlas because Replit's IP addresses aren't whitelisted yet.

**To fix this:**

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Navigate to: **Security** → **Network Access**
3. Click **"Add IP Address"**
4. Enter: `0.0.0.0/0`
5. Add a comment: "Replit - Dynamic IPs"
6. Click **Confirm**

**Why `0.0.0.0/0`?**
- Replit uses dynamic IP addresses that change frequently
- This setting allows all IPs but your database is still protected by username/password in your connection string
- This is the standard approach for Replit + MongoDB Atlas

### 2. Run the Seed Script

Once MongoDB is connected, populate your database:

```bash
npm run seed
```

This will create:
- 🍜 **Food & Travel** path with 2 lessons
- 🎨 **Music & Art** path with 1 lesson  
- 🎬 **Movies & Media** path with 2 lessons

### 3. Test the API

Run the test script to verify all endpoints:

```bash
node test-routes.js
```

Or manually test endpoints using the examples in `README.md`.

---

## 📋 What's Already Done

✅ **Models**: User, Path, Lesson, Challenge  
✅ **Authentication**: JWT-based register/login with bcrypt  
✅ **API Routes**: 
  - Auth: `/api/auth/register`, `/api/auth/login`
  - Paths: `/api/paths`, `/api/paths/:slug`
  - User: `/api/user/me`, `/api/user/set-path`, `/api/user/challenge`
  - Translation: `/api/translate`  
✅ **Seed Data**: 3 passion paths ready to insert  
✅ **Documentation**: Complete README with API examples  
✅ **Workflow**: Server configured to run on Replit

---

## 🔧 Troubleshooting

**Server won't start?**
- Check that secrets `MONGO_URI` and `JWT_SECRET` are set in Replit Secrets

**Can't connect to MongoDB?**
- Verify you added `0.0.0.0/0` to Network Access in MongoDB Atlas
- Double-check your connection string in `MONGO_URI` secret

**Routes return 500 errors?**
- Make sure you ran `npm run seed` after MongoDB connected
- Check server logs for specific error messages

---

## 📚 Full Documentation

See `README.md` for:
- Complete API endpoint documentation
- Example fetch requests for all routes
- Environment variable explanations
- Database model schemas
- Project structure overview

---

## 🎯 Quick API Test Examples

Once connected, try these in your browser console or Postman:

**Health Check**:
```javascript
fetch('http://localhost:5000/api/health').then(r => r.json()).then(console.log)
```

**Get All Paths**:
```javascript
fetch('http://localhost:5000/api/paths').then(r => r.json()).then(console.log)
```

**Register User**:
```javascript
fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    username: 'testuser',
    email: 'test@example.com', 
    password: 'password123'
  })
}).then(r => r.json()).then(console.log)
```

---

Happy coding! 🚀
