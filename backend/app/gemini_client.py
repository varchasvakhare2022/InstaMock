import os
import re
import json
import google.generativeai as genai
from dotenv import load_dotenv
import base64
from PIL import Image
import io

load_dotenv()

# Configure Gemini API
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)


def generate_jsx_from_text(text_description: str) -> dict:
    """Generate JSX code from text description using Gemini Pro"""
    try:
        # Check if API key is configured
        if not api_key:
            return {
                "jsx_code": "",
                "component_name": "Error",
                "success": False,
                "message": "GEMINI_API_KEY is not configured. Please set it in your .env file."
            }
        
        # Get available models and use the best one
        try:
            available_models = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
            # Prefer stable models over previews, flash over pro for speed
            preferred = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.5-pro', 'gemini-1.5-flash', 'gemini-1.5-pro']
            
            model_name = None
            for pref in preferred:
                full_name = f'models/{pref}'
                if full_name in available_models:
                    model_name = pref
                    break
            
            # If no preferred model found, use first available
            if not model_name and available_models:
                model_name = available_models[0].split('/')[-1]
            
            if not model_name:
                return {
                    "jsx_code": "",
                    "component_name": "Error",
                    "success": False,
                    "message": "No Gemini models available. Please check your API key and permissions."
                }
            
            model = genai.GenerativeModel(model_name)
        except Exception as e:
            return {
                "jsx_code": "",
                "component_name": "Error",
                "success": False,
                "message": f"Error accessing Gemini models: {str(e)}"
            }
        
        prompt = f"""You are an expert React/Tailwind developer.
Convert the following UI description into clean, readable React JSX code.

Rules:
- Use functional components
- Use Tailwind CSS for all styling
- No external UI libraries (only React and Tailwind)
- Use semantic HTML
- Follow mobile-first responsive design
- Keep code minimal and production ready
- Avoid inline styles
- Name the component based on the page type
- Export the component as default
- Include proper imports (React, if needed)
- Use className instead of class
- Ensure proper indentation and formatting

User Description:
{text_description}

Output only the JSX code inside <jsx> tags. Do not include any explanation outside the tags.
The component should be a complete, runnable React component.

Example format:
<jsx>
import React from 'react';

const ComponentName = () => {{
  return (
    <div className="min-h-screen bg-gray-50">
      {{/* Component content */}}
    </div>
  );
}};

export default ComponentName;
</jsx>"""

        response = model.generate_content(prompt)
        
        # Handle case where response might be empty or None
        if not response or not hasattr(response, 'text') or not response.text:
            return {
                "jsx_code": "",
                "component_name": "Error",
                "success": False,
                "message": "Empty response from Gemini API"
            }
        
        response_text = response.text
        
        # Extract JSX from <jsx> tags
        if "<jsx>" in response_text and "</jsx>" in response_text:
            start = response_text.find("<jsx>") + 5
            end = response_text.find("</jsx>")
            jsx_code = response_text[start:end].strip()
        else:
            jsx_code = response_text.strip()
        
        # Extract component name from code
        component_name = "GeneratedComponent"
        if "const" in jsx_code and "=" in jsx_code:
            try:
                const_line = [line for line in jsx_code.split("\n") if "const" in line and "=" in line][0]
                component_name = const_line.split("const")[1].split("=")[0].strip()
            except:
                pass
        
        return {
            "jsx_code": jsx_code,
            "component_name": component_name,
            "success": True
        }
    except ValueError as e:
        # Configuration errors
        return {
            "jsx_code": "",
            "component_name": "Error",
            "success": False,
            "message": str(e)
        }
    except Exception as e:
        # Log the full error for debugging
        error_msg = str(e)
        error_type = type(e).__name__
        
        # Provide user-friendly error messages
        if "API key" in error_msg or "authentication" in error_msg.lower():
            error_msg = "Invalid or missing Gemini API key. Please check your GEMINI_API_KEY in .env file."
        elif "quota" in error_msg.lower() or "limit" in error_msg.lower():
            error_msg = "API quota exceeded. Please check your Gemini API usage limits."
        elif "network" in error_msg.lower() or "connection" in error_msg.lower():
            error_msg = "Network error. Please check your internet connection and try again."
        
        return {
            "jsx_code": "",
            "component_name": "Error",
            "success": False,
            "message": f"{error_type}: {error_msg}"
        }


def generate_jsx_from_image(image_bytes: bytes) -> dict:
    """Generate JSX code from image using Gemini Vision"""
    try:
        # Check if API key is configured
        if not api_key:
            return {
                "jsx_code": "",
                "component_name": "Error",
                "success": False,
                "message": "GEMINI_API_KEY is not configured. Please set it in your .env file."
            }
        
        # Get available models for vision (all newer Gemini models support vision)
        try:
            available_models = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
            # Prefer stable models over previews, flash over pro for speed
            preferred = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.5-pro', 'gemini-1.5-flash', 'gemini-1.5-pro']
            
            model_name = None
            for pref in preferred:
                full_name = f'models/{pref}'
                if full_name in available_models:
                    model_name = pref
                    break
            
            # If no preferred model found, use first available
            if not model_name and available_models:
                model_name = available_models[0].split('/')[-1]
            
            if not model_name:
                return {
                    "jsx_code": "",
                    "component_name": "Error",
                    "success": False,
                    "message": "No Gemini vision models available. Please check your API key and permissions."
                }
            
            model = genai.GenerativeModel(model_name)
        except Exception as e:
            return {
                "jsx_code": "",
                "component_name": "Error",
                "success": False,
                "message": f"Error accessing Gemini vision models: {str(e)}"
            }
        
        # Convert bytes to PIL Image
        image = Image.open(io.BytesIO(image_bytes))
        
        prompt = """You are an expert frontend engineer and UI analyzer.
Given an image, reverse-engineer the UI layout and generate accurate JSX + Tailwind code.

Steps:
1. Describe the UI structure (layout, sections, components)
2. Identify all components (buttons, inputs, cards, navbars, etc.)
3. Generate JSX layout matching the visual structure
4. Add appropriate Tailwind CSS classes for styling
5. Ensure clean and readable formatting

Rules:
- Use functional React components
- Use Tailwind CSS for all styling
- No external UI libraries
- Use semantic HTML
- Follow mobile-first responsive design
- Match colors, spacing, and layout as closely as possible
- Export the component as default
- Use className instead of class
- Include proper imports

Output format - provide a JSON object with this structure:
{{
  "component_name": "DescriptiveComponentName",
  "jsx": "complete JSX code here"
}}

The JSX should be a complete, runnable React component that recreates the UI shown in the image."""

        response = model.generate_content([prompt, image])
        
        # Handle case where response might be empty or None
        if not response or not hasattr(response, 'text') or not response.text:
            return {
                "jsx_code": "",
                "component_name": "Error",
                "success": False,
                "message": "Empty response from Gemini Vision API"
            }
        
        response_text = response.text.strip()
        
        # Remove markdown code blocks if present (common in AI responses)
        response_text = re.sub(r'```json\s*', '', response_text, flags=re.IGNORECASE)
        response_text = re.sub(r'```jsx\s*', '', response_text, flags=re.IGNORECASE)
        response_text = re.sub(r'```javascript\s*', '', response_text, flags=re.IGNORECASE)
        response_text = re.sub(r'```typescript\s*', '', response_text, flags=re.IGNORECASE)
        response_text = re.sub(r'```\s*$', '', response_text, flags=re.MULTILINE)
        response_text = response_text.strip()
        
        # Try to extract JSON from response
        # First, try to find and parse JSON object
        try:
            # Try to find JSON object - look for opening brace and try to parse
            # Find the first { and try to parse from there
            brace_start = response_text.find('{')
            if brace_start != -1:
                # Try to find matching closing brace
                brace_count = 0
                brace_end = -1
                for i in range(brace_start, len(response_text)):
                    if response_text[i] == '{':
                        brace_count += 1
                    elif response_text[i] == '}':
                        brace_count -= 1
                        if brace_count == 0:
                            brace_end = i + 1
                            break
                
                if brace_end > brace_start:
                    json_str = response_text[brace_start:brace_end]
                    try:
                        result = json.loads(json_str)
                        jsx_code = result.get("jsx", "")
                        component_name = result.get("component_name", "GeneratedComponent")
                        
                        # Clean up the JSX code - unescape if needed
                        if isinstance(jsx_code, str):
                            # Unescape common escape sequences
                            jsx_code = jsx_code.replace('\\n', '\n').replace('\\"', '"').replace("\\'", "'")
                            jsx_code = jsx_code.replace('\\t', '\t').replace('\\r', '\r')
                            # Remove any remaining markdown code blocks
                            jsx_code = re.sub(r'```[a-z]*\s*', '', jsx_code, flags=re.IGNORECASE)
                            jsx_code = re.sub(r'```\s*$', '', jsx_code, flags=re.MULTILINE)
                        
                        if jsx_code and jsx_code.strip():
                            return {
                                "jsx_code": jsx_code.strip(),
                                "component_name": component_name,
                                "success": True
                            }
                    except json.JSONDecodeError:
                        # JSON parsing failed, try regex approach
                        pass
        except Exception:
            pass
        
        # Fallback: Try regex patterns for JSON
        json_patterns = [
            r'\{"component_name"\s*:\s*"[^"]+",\s*"jsx"\s*:\s*"[^"]+"\}',
            r'\{"jsx"\s*:\s*"[^"]+",\s*"component_name"\s*:\s*"[^"]+"\}',
        ]
        
        for pattern in json_patterns:
            json_match = re.search(pattern, response_text, re.DOTALL)
            if json_match:
                try:
                    json_str = json_match.group()
                    result = json.loads(json_str)
                    jsx_code = result.get("jsx", "")
                    component_name = result.get("component_name", "GeneratedComponent")
                    
                    if isinstance(jsx_code, str):
                        jsx_code = jsx_code.replace('\\n', '\n').replace('\\"', '"').replace("\\'", "'")
                        jsx_code = jsx_code.replace('\\t', '\t').replace('\\r', '\r')
                        jsx_code = re.sub(r'```[a-z]*\s*', '', jsx_code, flags=re.IGNORECASE)
                        jsx_code = re.sub(r'```\s*$', '', jsx_code, flags=re.MULTILINE)
                    
                    if jsx_code and jsx_code.strip():
                        return {
                            "jsx_code": jsx_code.strip(),
                            "component_name": component_name,
                            "success": True
                        }
                except Exception:
                    continue
        
        # Fallback: try to extract JSX directly (if JSON extraction failed)
        # If response still looks like JSON, try to extract just the jsx field value
        if '"jsx"' in response_text and '"component_name"' in response_text:
            # Try to extract jsx value using regex
            jsx_match = re.search(r'"jsx"\s*:\s*"([^"]*(?:\\.[^"]*)*)"', response_text, re.DOTALL)
            name_match = re.search(r'"component_name"\s*:\s*"([^"]+)"', response_text)
            
            if jsx_match:
                jsx_code = jsx_match.group(1)
                # Unescape the JSX code
                jsx_code = jsx_code.replace('\\n', '\n').replace('\\"', '"').replace("\\'", "'")
                jsx_code = jsx_code.replace('\\t', '\t').replace('\\r', '\r')
                component_name = name_match.group(1) if name_match else "GeneratedComponent"
                
                # Clean up
                jsx_code = re.sub(r'```[a-z]*\s*', '', jsx_code, flags=re.IGNORECASE)
                jsx_code = re.sub(r'```\s*$', '', jsx_code, flags=re.MULTILINE)
                
                if jsx_code and jsx_code.strip():
                    return {
                        "jsx_code": jsx_code.strip(),
                        "component_name": component_name,
                        "success": True
                    }
        
        # Final fallback: try to extract JSX from <jsx> tags or use response as-is
        if "<jsx>" in response_text and "</jsx>" in response_text:
            start = response_text.find("<jsx>") + 5
            end = response_text.find("</jsx>")
            jsx_code = response_text[start:end].strip()
        else:
            # If it's still JSON-like, don't use it - return error
            if response_text.strip().startswith('{') and '"jsx"' in response_text:
                return {
                    "jsx_code": "",
                    "component_name": "Error",
                    "success": False,
                    "message": "Failed to extract JSX from JSON response. The AI returned JSON format that couldn't be parsed."
                }
            jsx_code = response_text.strip()
        
        # Clean up the code - remove markdown blocks and unescape
        jsx_code = re.sub(r'```[a-z]*\s*', '', jsx_code, flags=re.IGNORECASE)
        jsx_code = re.sub(r'```\s*$', '', jsx_code, flags=re.MULTILINE)
        jsx_code = jsx_code.replace('\\n', '\n').replace('\\"', '"').replace("\\'", "'")
        
        # Extract component name
        component_name = "GeneratedComponent"
        patterns = [
            r'const\s+(\w+)\s*=',
            r'function\s+(\w+)\s*\(',
            r'export\s+(?:const|function)\s+(\w+)',
        ]
        
        for pattern in patterns:
            match = re.search(pattern, jsx_code)
            if match:
                component_name = match.group(1)
                break
        
        return {
            "jsx_code": jsx_code,
            "component_name": component_name,
            "success": True
        }
    except ValueError as e:
        # Configuration errors
        return {
            "jsx_code": "",
            "component_name": "Error",
            "success": False,
            "message": str(e)
        }
    except Exception as e:
        # Log the full error for debugging
        error_msg = str(e)
        error_type = type(e).__name__
        
        # Provide user-friendly error messages
        if "API key" in error_msg or "authentication" in error_msg.lower():
            error_msg = "Invalid or missing Gemini API key. Please check your GEMINI_API_KEY in .env file."
        elif "quota" in error_msg.lower() or "limit" in error_msg.lower():
            error_msg = "API quota exceeded. Please check your Gemini API usage limits."
        elif "network" in error_msg.lower() or "connection" in error_msg.lower():
            error_msg = "Network error. Please check your internet connection and try again."
        
        return {
            "jsx_code": "",
            "component_name": "Error",
            "success": False,
            "message": f"{error_type}: {error_msg}"
        }

