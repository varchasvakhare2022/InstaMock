# Quick Start Guide

Get Instamock up and running in 5 minutes!

## Prerequisites Check

- ✅ Node.js 18+ installed (`node --version`)
- ✅ Python 3.11+ installed (`python --version`)
- ✅ Google Gemini API Key ([Get it here](https://makersuite.google.com/app/apikey))

## Step-by-Step Setup

### 1. Backend Setup (2 minutes)

```bash
# Navigate to backend
cd backend

# Create and activate virtual environment
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp env.txt .env
# Edit .env and add your GEMINI_API_KEY
```

### 2. Frontend Setup (1 minute)

```bash
# Navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Setup environment (optional - defaults work for local)
cp env.txt .env
```

### 3. Start the Application (1 minute)

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
uvicorn app.main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 4. Open in Browser

- Frontend: http://localhost:5173
- Backend API Docs: http://localhost:8000/docs

## First Test

1. Go to http://localhost:5173
2. Click "Text to JSX"
3. Enter: "Create a simple button with blue background"
4. Click "Generate UI"
5. Wait a few seconds...
6. ✨ See your generated JSX code!

## Troubleshooting

**Backend won't start?**
- Check if port 8000 is available
- Verify GEMINI_API_KEY is set in `backend/.env`
- Make sure virtual environment is activated

**Frontend won't start?**
- Check if port 5173 is available
- Run `npm install` again
- Check `VITE_API_BASE_URL` in `frontend/.env`

**API errors?**
- Verify backend is running on port 8000
- Check browser console for CORS errors
- Ensure GEMINI_API_KEY is valid

## Next Steps

- Try "Image to JSX" with a screenshot
- Toggle dark mode
- Read the full [README.md](README.md) for deployment

Happy coding! 🚀

