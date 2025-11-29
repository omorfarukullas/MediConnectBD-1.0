# 🏥 MediConnect BD - Complete System

## ✅ System Status
Your MediConnect system is fully set up with:
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + TypeScript + Express
- **Database**: MySQL (Docker)

## 🚀 Quick Start

### Option 1: Run in PowerShell (Recommended)

**Terminal 1 - Backend:**
```powershell
cd backend
npx ts-node src/server.ts
```

**Terminal 2 - Frontend:**
```powershell
npm run dev
```

### Option 2: Run Batch Scripts (Windows)

1. Open Command Prompt
2. **Run Backend**: Double-click `start-backend.bat`
3. **Run Frontend**: Double-click `start-frontend.bat` (in another Command Prompt)

## 🌐 Access Your System

- **Frontend UI**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database**: MySQL on localhost:3306

## 👤 Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Patient | john@patient.com | password123 |
| Doctor | ahmed@mediconnect.com | password123 |
| Admin | admin@mediconnect.com | password123 |

## 📋 Available API Endpoints

- `GET /api/doctors` - List all doctors
- `GET /api/emergency/nearby?lat=23.8103&lng=90.4125` - Find nearby ambulances
- `GET /api/queue/:doctorId` - Get doctor's queue status
- `POST /api/queue/:doctorId/next` - Mark next patient

## 🛠️ Troubleshooting

**White blank page?**
- Hard refresh: `Ctrl + Shift + R`
- Check browser console: `F12`
- Verify backend is running on port 5000
- Check that both services started without errors

**Backend won't start?**
- Ensure Docker MySQL is running: `docker ps`
- Check if port 5000 is available
- Verify database credentials in `backend/.env`

**Frontend won't start?**
- Verify port 3000 is available
- Try: `npm install` then `npm run dev`
- Check Node.js version: `node -v` (should be 16+)

## 📦 Dependencies

### Frontend
- React 19.2.0
- Vite 6.4.1
- Tailwind CSS 4.1.17
- TypeScript 5.8

### Backend
- Node.js (ts-node)
- Express 4.18
- MySQL2 3.15
- Socket.IO 4.7

### Database
- MySQL 8.0 (Docker)

## 🔄 System Architecture

```
User Browser (localhost:3000)
    ↓
React Frontend (Vite Dev Server)
    ↓
API Calls (HTTP/WebSocket)
    ↓
Node.js Backend (localhost:5000)
    ↓
MySQL Database (localhost:3306)
```

## 📝 Next Steps

1. Open http://localhost:3000 in your browser
2. Try logging in with test credentials
3. Explore patient portal, doctor portal, etc.
4. Test API endpoints with backend running

---

**Happy coding! 🚀**
