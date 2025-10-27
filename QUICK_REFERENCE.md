# Quick Reference Card - Authentication System

## 🚀 Start the Application

### Quick Start (Recommended)
```bash
./start-servers.sh
```
Then visit: **http://localhost:5173**

### Manual Start
```bash
# Terminal 1 - Backend
source venv/bin/activate
python backend/server.py

# Terminal 2 - Frontend
npm run dev
```

## 🔑 Demo Accounts

### Username/Password
| Username | Password   |
|----------|------------|
| `admin`  | `admin123` |
| `demo`   | `demo123`  |
| `user`   | `password` |

### Email/Password (@namisense.ai)
| Email                    | Password      |
|--------------------------|---------------|
| `admin@namisense.ai`     | `admin123`    |
| `user@namisense.ai`      | `password123` |
| `demo@namisense.ai`      | `demo123`     |

## 📁 Key Files Created

### Backend
- `backend/server.py` - Flask authentication server
- `backend/requirements.txt` - Python dependencies
- `backend/README.md` - Backend documentation

### Frontend
- `src/api/authService.js` - Auth API service
- `src/components/Login.jsx` - Login component
- `src/components/Login.css` - Login styles
- `src/context/AuthContext.jsx` - Auth state management
- `src/ProtectedApp.jsx` - Route protection wrapper

### Modified Files
- `src/main.jsx` - Added AuthProvider
- `src/App.jsx` - Added logout button
- `src/App.css` - Added user section styles

### Scripts & Docs
- `start-servers.sh` - Server startup script
- `test_auth.py` - Backend test suite
- `AUTH_SETUP.md` - Setup & testing guide
- `VISUAL_GUIDE.md` - UI/UX guide
- `IMPLEMENTATION_SUMMARY.md` - Complete summary

## 🧪 Testing

### Run Test Suite
```bash
# Make sure backend is running
python test_auth.py
```

### Manual Testing
1. Open http://localhost:5173
2. Login with: `admin` / `admin123`
3. Verify TTS app loads
4. Click logout
5. Verify back at login page

## 📊 API Endpoints

```
GET  /api/health   - Health check
GET  /api/session  - Check auth status
POST /api/login    - Authenticate user
POST /api/logout   - Clear session
```

## 🔍 Troubleshooting

### Backend won't start?
```bash
cd backend
pip install -r requirements.txt
```

### Port already in use?
```bash
# Check what's using port 5000
lsof -i :5000
# Kill the process if needed
kill -9 <PID>
```

### Frontend errors?
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### CORS errors?
- Ensure backend is running on port 5000
- Ensure frontend is on port 5173 or 3000
- Check browser console for details

## 📚 Documentation Files

- **README.md** - Main project documentation
- **AUTH_SETUP.md** - Detailed setup guide
- **VISUAL_GUIDE.md** - UI/UX walkthrough
- **IMPLEMENTATION_SUMMARY.md** - What was built
- **backend/README.md** - Backend API docs

## ⚡ Quick Commands

```bash
# Install backend dependencies
pip install -r backend/requirements.txt

# Install frontend dependencies
npm install

# Start backend
python backend/server.py

# Start frontend
npm run dev

# Run tests
python test_auth.py

# Build for production
npm run build
```

## 🎯 Key Features

✅ Session-based authentication  
✅ Beautiful gradient login UI  
✅ Logout with confirmation  
✅ Session verification  
✅ Error handling  
✅ Responsive design  
✅ Non-persistent sessions  
✅ Demo accounts ready  

## 🔒 Security Notes

- Sessions clear on page refresh (by design)
- Credentials validated on backend
- CORS configured for development
- For production: Enable HTTPS, hash passwords, use real database

## 💡 Tips

- Backend runs on port **5000**
- Frontend runs on port **5173**
- Sessions are **not persistent** (cleared on refresh)
- Use `./start-servers.sh` for easiest startup
- Check `AUTH_SETUP.md` for detailed troubleshooting

## 🎨 UI Overview

- **Login:** Purple gradient, white card
- **App:** Dark theme with purple accents
- **Logout:** Top-right corner
- **User:** Displayed in header

## 📞 Need Help?

1. Check browser console for errors
2. Check backend terminal for logs
3. Run `python test_auth.py` to verify backend
4. See `AUTH_SETUP.md` for detailed guide
5. See `VISUAL_GUIDE.md` for UI reference

---

**Status:** ✅ Ready to use!  
**Version:** 1.0  
**Last Updated:** October 21, 2025


