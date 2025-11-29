# Instamock - AI UI to JSX Generator

Instamock is an AI-powered full-stack application that converts text descriptions or UI screenshots into production-ready React JSX code with Tailwind CSS styling.

## 🚀 Features

- **Text to JSX**: Describe your UI in plain English and get clean React components
- **Image to JSX**: Upload screenshots or design mockups and reverse-engineer them into JSX
- **Smart Component Generation**: AI-powered code generation using Google Gemini API
- **Code Preview & Download**: View, copy, and download generated components
- **Dark/Light Mode**: Toggle between themes
- **Modern UI**: Built with Tailwind CSS and shadcn/ui patterns

## 🛠️ Tech Stack

### Frontend
- React 18 + Vite + TypeScript
- Tailwind CSS
- React Router
- Zustand (state management)
- Axios
- react-hot-toast
- react-dropzone
- Lucide React (icons)

### Backend
- FastAPI (Python)
- Google Gemini API (gemini-pro & gemini-pro-vision)
- Pydantic
- Pillow (image processing)

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Python 3.11+
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd instamock
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp env.txt .env

# Edit .env and add your Gemini API key
# GEMINI_API_KEY=your-actual-api-key-here
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Copy environment file
cp env.txt .env

# Edit .env if needed (default should work for local development)
# VITE_API_BASE_URL=http://localhost:8000
```

### 4. Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to `backend/.env`

## 🚀 Running the Application

### Option 1: Run Separately

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

### Option 2: Docker Compose

```bash
# From project root
docker-compose -f docker/docker-compose.yml up
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 📁 Project Structure

```
instamock/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app entry point
│   │   ├── schemas.py           # Pydantic models
│   │   ├── gemini_client.py     # Gemini API integration
│   │   └── routes/
│   │       ├── text_to_jsx.py   # Text to JSX endpoint
│   │       └── image_to_jsx.py  # Image to JSX endpoint
│   ├── requirements.txt
│   ├── env.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/               # Page components
│   │   ├── store/               # Zustand store
│   │   ├── api/                 # API client
│   │   └── App.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── env.txt
├── docker/
│   └── docker-compose.yml
└── README.md
```

## 🔌 API Endpoints

### POST `/api/generate/text`
Generate JSX from text description.

**Request:**
```json
{
  "text_description": "Create a modern login page with email, password, remember me, submit button, and side illustration"
}
```

**Response:**
```json
{
  "jsx_code": "...",
  "component_name": "LoginPage",
  "success": true
}
```

### POST `/api/generate/image`
Generate JSX from uploaded image.

**Request:** Multipart form data with `file` field

**Response:**
```json
{
  "jsx_code": "...",
  "component_name": "GeneratedComponent",
  "success": true
}
```

## 🌐 Deployment

### Frontend (Vercel/Netlify)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy `dist` folder to Vercel or Netlify

3. Set environment variable:
   - `VITE_API_BASE_URL` = your backend URL

### Backend (Render/Railway/Cloud Run)

1. Set environment variables in your hosting platform:
   - `GEMINI_API_KEY`
   - `CORS_ORIGINS` (your frontend URL)
   - `MONGODB_URI` (optional)

2. Deploy using Docker or directly with Python

**Example for Render:**
- Build Command: `pip install -r requirements.txt`
- Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

## 🧪 Testing

### Test Backend API

```bash
# Health check
curl http://localhost:8000/health

# Text to JSX
curl -X POST http://localhost:8000/api/generate/text \
  -H "Content-Type: application/json" \
  -d '{"text_description": "Create a simple button"}'
```

## 🐛 Troubleshooting

### Backend Issues

1. **Gemini API Key Error**: Make sure your API key is correctly set in `.env`
2. **Import Errors**: Ensure all dependencies are installed: `pip install -r requirements.txt`
3. **CORS Errors**: Check `CORS_ORIGINS` in `.env` matches your frontend URL

### Frontend Issues

1. **API Connection Error**: Verify `VITE_API_BASE_URL` in `.env` points to your backend
2. **Build Errors**: Clear node_modules and reinstall: `rm -rf node_modules && npm install`
3. **TypeScript Errors**: Run `npm run lint` to see detailed errors

## 📝 Environment Variables

### Backend (.env)
```env
GEMINI_API_KEY=your-gemini-key-here
GEMINI_PROJECT_ID=your-project-id (optional)
GEMINI_LOCATION=us-central1 (optional)
PORT=8000
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/instamock (optional)
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:8000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- FastAPI for the excellent Python framework
- React and Vite for the modern frontend stack

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Made with ❤️ using AI**

