from pydantic import BaseModel
from typing import Optional


class TextToJSXRequest(BaseModel):
    text_description: str


class TextToJSXResponse(BaseModel):
    jsx_code: str
    component_name: str
    success: bool
    message: Optional[str] = None


class ImageToJSXResponse(BaseModel):
    jsx_code: str
    component_name: str
    success: bool
    message: Optional[str] = None

