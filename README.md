# 🚀 InstaMock - AI-Powered UI to JSX Generator

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-AGPL--3.0-green.svg)
![Python](https://img.shields.io/badge/python-3.11+-blue.svg)
![Node](https://img.shields.io/badge/node-18+-green.svg)
![React](https://img.shields.io/badge/react-18.2-blue.svg)
![FastAPI](https://img.shields.io/badge/fastapi-0.104-green.svg)

**Transform your ideas into production-ready React components with AI**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Deployment](#-deployment) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

**InstaMock** is a full-stack AI-powered application that converts natural language descriptions or UI screenshots into production-ready React JSX code with Tailwind CSS styling. Built with modern web technologies, it leverages Google's Gemini AI to understand design intent and generate clean, maintainable component code.

### What Makes InstaMock Special?

- ✨ **AI-Powered Generation**: Uses Google Gemini AI for intelligent code generation
- 🎨 **Production-Ready Code**: Generates clean, well-structured React components
- 🖼️ **Image Analysis**: Reverse-engineer UI designs from screenshots
- 💻 **Live Preview**: See your generated components in real-time
- 🌓 **Modern UI**: Beautiful, responsive interface with dark/light mode
- ⚡ **Fast & Efficient**: Built with Vite and FastAPI for optimal performance

---

## ✨ Features

### Core Capabilities

- **Text to JSX**: Describe your UI in plain English and get instant React components
- **Image to JSX**: Upload screenshots or design mockups and convert them to code
- **Live Preview**: Real-time preview of generated components in an isolated iframe
- **Code Export**: Copy or download generated components as `.jsx` files
- **Smart Component Detection**: Automatically extracts and names components
- **Tailwind CSS Integration**: All generated code uses Tailwind for styling

### User Experience

- 🎨 **Premium UI Design**: Modern, professional interface with smooth animations
- 🌓 **Dark/Light Mode**: Toggle between themes with persistent preferences
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Fast Performance**: Optimized for speed with code splitting and lazy loading
- 🔔 **Toast Notifications**: User-friendly feedback for all actions
- 🎯 **Drag & Drop**: Intuitive file upload with visual feedback

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 18.2.0 |
| **TypeScript** | Type Safety | 5.2.2 |
| **Vite** | Build Tool | 5.0.8 |
| **Tailwind CSS** | Styling | 3.3.6 |
| **React Router** | Routing | 6.20.0 |
| **Zustand** | State Management | 4.4.7 |
| **Axios** | HTTP Client | 1.6.2 |
| **react-hot-toast** | Notifications | 2.4.1 |
| **react-dropzone** | File Uploads | 14.2.3 |
| **Lucide React** | Icons | 0.294.0 |

### Backend

| Technology | Purpose | Version |
|------------|---------|---------|
| **FastAPI** | Web Framework | 0.104.1 |
| **Python** | Runtime | 3.11+ |
| **Google Gemini AI** | AI Engine | 0.3.1 |
| **Pydantic** | Data Validation | 2.5.0 |
| **Pillow** | Image Processing | 10.1.0 |
| **Uvicorn** | ASGI Server | 0.24.0 |

---

## 🏗️ Architecture

### How It Works

```
┌─────────────────┐
│   User Input    │
│  (Text/Image)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  React Frontend │
│  (Vite + TS)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  FastAPI Backend│
│  (Python)       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Gemini AI API  │
│  (Google)       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Generated JSX  │
│  + Tailwind CSS │
└─────────────────┘
```

### Project Structure

```
instamock/
├── backend/                    # FastAPI Backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py            # FastAPI application entry point
│   │   ├── schemas.py          # Pydantic models for validation
│   │   ├── gemini_client.py    # Gemini AI integration & prompt engineering
│   │   └── routes/
│   │       ├── __init__.py
│   │       ├── text_to_jsx.py  # Text-to-JSX API endpoint
│   │       └── image_to_jsx.py # Image-to-JSX API endpoint
│   ├── requirements.txt        # Python dependencies
│   ├── Dockerfile              # Container configuration
│   └── TROUBLESHOOTING.md      # Backend troubleshooting guide
│
├── frontend/                    # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   ├── Navbar.tsx      # Navigation bar with theme toggle
│   │   │   ├── CodePreviewer.tsx # Code display with copy/download
│   │   │   ├── LivePreview.tsx  # Real-time component preview
│   │   │   ├── ResultPanel.tsx  # Results display container
│   │   │   ├── DropzoneUploader.tsx # File upload component
│   │   │   └── Spinner.tsx      # Loading indicator
│   │   ├── pages/              # Page components
│   │   │   ├── Home.tsx         # Landing page
│   │   │   ├── TextToJSX.tsx    # Text input page
│   │   │   └── ImageToJSX.tsx   # Image upload page
│   │   ├── api/
│   │   │   └── client.ts        # Axios API client
│   │   ├── store/
│   │   │   └── useStore.ts      # Zustand global state
│   │   ├── App.tsx              # Main app component
│   │   ├── main.tsx             # React entry point
│   │   └── index.css            # Global styles & Tailwind
│   ├── package.json
│   ├── vite.config.ts          # Vite configuration
│   ├── tailwind.config.js       # Tailwind CSS config
│   ├── tsconfig.json            # TypeScript config
│   └── Dockerfile               # Container configuration
│
├── docker/
│   └── docker-compose.yml       # Docker Compose for local dev
│
├── LICENSE                      # GNU Affero General Public License v3
├── README.md                    # This file
└── QUICKSTART.md                # Quick setup guide
```

### Key Design Decisions

1. **Separation of Concerns**: Clear separation between frontend and backend
2. **Type Safety**: TypeScript on frontend, Pydantic on backend
3. **AI Integration**: Centralized Gemini client with error handling
4. **State Management**: Zustand for lightweight global state
5. **Build Tools**: Vite for fast frontend builds, Uvicorn for backend
6. **Code Generation**: Base64 encoding for safe code embedding in preview

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher ([Download](https://nodejs.org/))
- **Python** 3.11 or higher ([Download](https://www.python.org/downloads/))
- **npm** or **yarn** (comes with Node.js)
- **pip** (comes with Python)
- **Git** ([Download](https://git-scm.com/))
- **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))

### Verify Installation

```bash
# Check Node.js version
node --version  # Should be 18.0 or higher

# Check Python version
python --version  # Should be 3.11 or higher

# Check npm version
npm --version

# Check pip version
pip --version
```

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/varchasvakhare2022/InstaMock.git
cd InstaMock
```

### 2. Backend Setup

```bash
# Navigate to backend directory
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

# Create environment file
# Windows (PowerShell):
Copy-Item env.txt .env
# macOS/Linux:
cp env.txt .env

# Edit .env and add your Gemini API key
# Use your preferred text editor:
# nano .env
# or
# code .env
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd ../frontend

# Install dependencies
npm install

# Create environment file (optional for local development)
# Windows (PowerShell):
Copy-Item env.txt .env
# macOS/Linux:
cp env.txt .env

# Edit .env if needed (defaults work for local development)
```

### 4. Configure Environment Variables

#### Backend `.env` File

Create `backend/.env` with the following:

```env
# Required: Google Gemini API Key
GEMINI_API_KEY=your-gemini-api-key-here

# Optional: Gemini Project Configuration
GEMINI_PROJECT_ID=your-project-id
GEMINI_LOCATION=us-central1

# Server Configuration
PORT=8000

# CORS Configuration (comma-separated URLs)
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

#### Frontend `.env` File

Create `frontend/.env` with the following:

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:8000
```

### 5. Get Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated key
5. Paste it into `backend/.env` as `GEMINI_API_KEY`

> **Note**: Keep your API key secure and never commit it to version control.

---

## 🏃 Running Locally

### Option 1: Run Separately (Recommended for Development)

**Terminal 1 - Start Backend:**

```bash
cd backend

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Start Frontend:**

```bash
cd frontend

# Start development server
npm run dev
```

### Option 2: Docker Compose

```bash
# From project root
docker-compose -f docker/docker-compose.yml up --build
```

### Access the Application

Once both servers are running:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Alternative API Docs**: http://localhost:8000/redoc

---

## 📖 Usage Guide

### Text to JSX

1. Navigate to the **"Text to JSX"** page
2. Enter a description of the UI you want to create
   - Example: `"Create a modern login page with email, password, remember me, submit button, and side illustration"`
3. Click **"Generate UI"**
4. Wait for the AI to process (usually 5-15 seconds)
5. View the generated code or preview it live
6. Copy or download the component

### Image to JSX

1. Navigate to the **"Image to JSX"** page
2. Drag and drop an image or click to browse
   - Supported formats: PNG, JPG, JPEG, GIF, WEBP
   - Maximum size: 10MB
3. Click **"Generate JSX"**
4. Wait for the AI to analyze and generate code
5. Review the generated component
6. Copy or download the code

### Tips for Best Results

**Text Descriptions:**
- Be specific about layout and components
- Mention styling preferences (colors, spacing, etc.)
- Include responsive design requirements if needed
- Example: `"Create a dashboard header with logo on left, navigation menu in center, user avatar and notification bell on right"`

**Image Uploads:**
- Use clear, high-quality screenshots
- Ensure good contrast and visibility
- Single-page layouts work best
- Avoid complex nested designs for initial tests

---

## 🔌 API Documentation

### Base URL

```
http://localhost:8000
```

### Endpoints

#### POST `/api/generate/text`

Generate JSX code from a text description.

**Request Body:**
```json
{
  "text_description": "Create a modern login page with email, password, remember me, submit button, and side illustration"
}
```

**Response:**
```json
{
  "jsx_code": "const LoginPage = () => { ... }",
  "component_name": "LoginPage",
  "success": true,
  "message": null
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "jsx_code": "",
  "component_name": ""
}
```

#### POST `/api/generate/image`

Generate JSX code from an uploaded image.

**Request:** `multipart/form-data`
- `file`: Image file (PNG, JPG, JPEG, GIF, WEBP)

**Response:**
```json
{
  "jsx_code": "const GeneratedComponent = () => { ... }",
  "component_name": "GeneratedComponent",
  "success": true,
  "message": null
}
```

#### GET `/health`

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "version": "1.0.0"
}
```

### Interactive API Documentation

Visit http://localhost:8000/docs for interactive Swagger UI documentation where you can test endpoints directly.

---

## 🧪 Testing

### Test Backend API

```bash
# Health check
curl http://localhost:8000/health

# Text to JSX
curl -X POST http://localhost:8000/api/generate/text \
  -H "Content-Type: application/json" \
  -d '{"text_description": "Create a simple button with blue background"}'

# Image to JSX (with file)
curl -X POST http://localhost:8000/api/generate/image \
  -F "file=@path/to/your/image.png"
```

### Test Frontend

```bash
cd frontend

# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🚢 Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy `dist` folder:**
   - **Vercel**: Connect your GitHub repo and deploy
   - **Netlify**: Drag and drop the `dist` folder

3. **Set environment variable:**
   - `VITE_API_BASE_URL` = your backend URL (e.g., `https://api.instamock.com`)

### Backend Deployment (Render/Railway/Cloud Run)

#### Render.com

1. Create a new **Web Service**
2. Connect your GitHub repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables:
   - `GEMINI_API_KEY`
   - `CORS_ORIGINS` (your frontend URL)
   - `PORT` (auto-set by Render)

#### Railway

1. Create a new project from GitHub
2. Add environment variables in the dashboard
3. Railway will auto-detect Python and install dependencies
4. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

#### Google Cloud Run

1. Build Docker image:
   ```bash
   docker build -t instamock-backend ./backend
   ```

2. Push to Google Container Registry:
   ```bash
   gcloud builds submit --tag gcr.io/PROJECT_ID/instamock-backend
   ```

3. Deploy to Cloud Run:
   ```bash
   gcloud run deploy instamock-backend \
     --image gcr.io/PROJECT_ID/instamock-backend \
     --platform managed \
     --region us-central1 \
     --set-env-vars GEMINI_API_KEY=your-key,CORS_ORIGINS=your-frontend-url
   ```

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose -f docker/docker-compose.yml up -d

# Or build individually
docker build -t instamock-backend ./backend
docker build -t instamock-frontend ./frontend
```

---

## 🐛 Troubleshooting

### Common Issues

#### Backend Issues

**Problem**: `ModuleNotFoundError` or import errors
- **Solution**: Ensure virtual environment is activated and dependencies are installed:
  ```bash
  pip install -r requirements.txt
  ```

**Problem**: `GEMINI_API_KEY` not found
- **Solution**: Verify `.env` file exists in `backend/` directory and contains `GEMINI_API_KEY=your-key`

**Problem**: CORS errors
- **Solution**: Check `CORS_ORIGINS` in `.env` includes your frontend URL

**Problem**: Port 8000 already in use
- **Solution**: Change `PORT` in `.env` or kill the process using port 8000:
  ```bash
  # Windows
  netstat -ano | findstr :8000
  taskkill /PID <PID> /F
  
  # macOS/Linux
  lsof -ti:8000 | xargs kill
  ```

#### Frontend Issues

**Problem**: Cannot connect to API
- **Solution**: Verify `VITE_API_BASE_URL` in `frontend/.env` matches your backend URL

**Problem**: Build errors
- **Solution**: Clear cache and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

**Problem**: TypeScript errors
- **Solution**: Run linter to see detailed errors:
  ```bash
  npm run lint
  ```

#### AI Generation Issues

**Problem**: Empty or invalid code generation
- **Solution**: 
  - Check Gemini API key is valid
  - Verify API quota hasn't been exceeded
  - Try a simpler description
  - Check backend logs for error messages

For more detailed troubleshooting, see [TROUBLESHOOTING.md](backend/TROUBLESHOOTING.md)

---

## 🔐 Environment Variables Reference

### Backend Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GEMINI_API_KEY` | ✅ Yes | - | Google Gemini API key |
| `GEMINI_PROJECT_ID` | ❌ No | - | Google Cloud project ID |
| `GEMINI_LOCATION` | ❌ No | `us-central1` | Gemini API location |
| `PORT` | ❌ No | `8000` | Server port |
| `CORS_ORIGINS` | ❌ No | `http://localhost:5173` | Allowed CORS origins (comma-separated) |

### Frontend Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_BASE_URL` | ❌ No | `http://localhost:8000` | Backend API URL |

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes:**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Write clear commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is licensed under the **GNU Affero General Public License v3.0** (AGPL-3.0).

See [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini AI** for providing powerful AI capabilities
- **FastAPI** team for the excellent Python web framework
- **React & Vite** teams for the modern frontend tooling
- **Tailwind CSS** for the utility-first CSS framework
- All open-source contributors and libraries used in this project

---

## 📞 Support & Contact

- **GitHub Issues**: [Report a bug or request a feature](https://github.com/varchasvakhare2022/InstaMock/issues)
- **Documentation**: See [QUICKSTART.md](QUICKSTART.md) for quick setup guide
- **Troubleshooting**: Check [backend/TROUBLESHOOTING.md](backend/TROUBLESHOOTING.md)

---

## 🗺️ Roadmap

Future enhancements planned:

- [ ] Component library export
- [ ] Multiple component generation in one request
- [ ] Code customization options (preferred libraries, styling approach)
- [ ] Integration with popular design tools (Figma, Sketch)
- [ ] Component versioning and history
- [ ] Team collaboration features
- [ ] CLI tool for batch processing

---

<div align="center">

**Made with ❤️ using AI**

[⭐ Star us on GitHub](https://github.com/varchasvakhare2022/InstaMock) • [🐛 Report Bug](https://github.com/varchasvakhare2022/InstaMock/issues) • [💡 Request Feature](https://github.com/varchasvakhare2022/InstaMock/issues)

</div>
