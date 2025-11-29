from fastapi import APIRouter, HTTPException, UploadFile, File
from app.schemas import ImageToJSXResponse
from app.gemini_client import generate_jsx_from_image

router = APIRouter()


@router.post("/image", response_model=ImageToJSXResponse)
async def image_to_jsx(file: UploadFile = File(...)):
    """Generate JSX code from uploaded image"""
    # Validate file type
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    # Read image bytes
    try:
        image_bytes = await file.read()
        if len(image_bytes) == 0:
            raise HTTPException(status_code=400, detail="Empty file")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading file: {str(e)}")
    
    # Generate JSX from image
    try:
        result = generate_jsx_from_image(image_bytes)
        
        if not result["success"]:
            error_message = result.get("message", "Failed to generate JSX code from image")
            # Return 400 for configuration errors, 500 for API errors
            status_code = 400 if "API key" in error_message or "configured" in error_message else 500
            raise HTTPException(
                status_code=status_code,
                detail=error_message
            )
        
        return ImageToJSXResponse(
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

