from fastapi import APIRouter, HTTPException
from app.schemas import TextToJSXRequest, TextToJSXResponse
from app.gemini_client import generate_jsx_from_text

router = APIRouter()


@router.post("/text", response_model=TextToJSXResponse)
async def text_to_jsx(request: TextToJSXRequest):
    """Generate JSX code from text description"""
    if not request.text_description or not request.text_description.strip():
        raise HTTPException(status_code=400, detail="Text description is required")
    
    try:
        result = generate_jsx_from_text(request.text_description)
        
        if not result["success"]:
            error_message = result.get("message", "Failed to generate JSX code")
            # Return 400 for configuration errors, 500 for API errors
            status_code = 400 if "API key" in error_message or "configured" in error_message else 500
            raise HTTPException(
                status_code=status_code,
                detail=error_message
            )
        
        return TextToJSXResponse(
            jsx_code=result["jsx_code"],
            component_name=result["component_name"],
            success=True
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unexpected error: {str(e)}"
        )

