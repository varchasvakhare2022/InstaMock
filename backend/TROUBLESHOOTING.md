# Troubleshooting Guide

## Common Issues and Solutions

### 404 Model Not Found Error

**Error Message:** `404 models/gemini-pro is not found for API version v1beta`

**Solution:**
The code has been updated to use the latest Gemini model names:
- `gemini-1.5-flash` (default - faster and cheaper)
- `gemini-1.5-pro` (fallback - more capable)

If you still get model errors:
1. Check Google's [Gemini API documentation](https://ai.google.dev/docs) for current model names
2. You can manually change the model name in `app/gemini_client.py`
3. Verify your API key has access to the models you're trying to use

**To check available models:**
```python
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

for model in genai.list_models():
    if 'generateContent' in model.supported_generation_methods:
        print(f"Model: {model.name}")
```

### 500 Internal Server Error

If you're getting a 500 error when trying to generate JSX, check the following:

#### 1. **Missing or Invalid API Key**

**Error Message:** `GEMINI_API_KEY is not configured` or `Invalid or missing Gemini API key`

**Solution:**
1. Make sure you have a `.env` file in the `backend/` directory
2. Copy `env.txt` to `.env`: `cp env.txt .env`
3. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
4. Add it to `.env`:
   ```
   GEMINI_API_KEY=your-actual-api-key-here
   ```
5. Restart the backend server

#### 2. **API Quota Exceeded**

**Error Message:** `API quota exceeded`

**Solution:**
- Check your Gemini API usage limits
- Wait for quota reset or upgrade your plan
- Verify your API key has sufficient credits

#### 3. **Network Issues**

**Error Message:** `Network error` or `Connection error`

**Solution:**
- Check your internet connection
- Verify you can access Google's services
- Check firewall settings
- Try again after a few moments

#### 4. **Empty Response from API**

**Error Message:** `Empty response from Gemini API`

**Solution:**
- The API might be temporarily unavailable
- Try again after a few moments
- Check Google's API status page

### How to Check Your API Key

1. **Verify .env file exists:**
   ```bash
   cd backend
   ls -la .env  # Should show the file
   ```

2. **Check if API key is loaded:**
   ```bash
   python -c "from dotenv import load_dotenv; import os; load_dotenv(); print('API Key:', 'SET' if os.getenv('GEMINI_API_KEY') else 'NOT SET')"
   ```

3. **Test API connection:**
   ```python
   import google.generativeai as genai
   import os
   from dotenv import load_dotenv
   
   load_dotenv()
   api_key = os.getenv("GEMINI_API_KEY")
   if api_key:
       genai.configure(api_key=api_key)
       model = genai.GenerativeModel('gemini-pro')
       response = model.generate_content("Say hello")
       print("API works! Response:", response.text[:50])
   else:
       print("API key not found!")
   ```

### Backend Server Not Starting

1. **Check if port 8000 is available:**
   ```bash
   # Windows
   netstat -ano | findstr :8000
   
   # Mac/Linux
   lsof -i :8000
   ```

2. **Check Python version:**
   ```bash
   python --version  # Should be 3.11+
   ```

3. **Reinstall dependencies:**
   ```bash
   pip install -r requirements.txt --upgrade
   ```

### Frontend Can't Connect to Backend

1. **Check backend is running:**
   - Visit http://localhost:8000/docs
   - Should see FastAPI documentation

2. **Check CORS settings:**
   - In `backend/.env`, make sure `CORS_ORIGINS` includes your frontend URL
   - Default: `CORS_ORIGINS=http://localhost:5173,http://localhost:3000`

3. **Check frontend environment:**
   - In `frontend/.env`, verify `VITE_API_BASE_URL=http://localhost:8000`

### Still Having Issues?

1. Check the backend logs for detailed error messages
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly
4. Make sure virtual environment is activated
5. Try restarting both frontend and backend servers

