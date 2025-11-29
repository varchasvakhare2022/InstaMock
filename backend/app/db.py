import os
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional
from datetime import datetime
from app.schemas import HistoryItem
from dotenv import load_dotenv

load_dotenv()

mongodb_uri = os.getenv("MONGODB_URI")
client = None
db = None

if mongodb_uri:
    try:
        client = AsyncIOMotorClient(mongodb_uri)
        db = client.get_database()
    except Exception as e:
        print(f"MongoDB connection failed: {e}. History feature will be disabled.")


async def save_history(item: HistoryItem) -> Optional[str]:
    """Save a history item to database"""
    if not db:
        return None
    
    try:
        history_collection = db.history
        document = {
            "type": item.type,
            "input": item.input,
            "jsx_code": item.jsx_code,
            "component_name": item.component_name,
            "created_at": datetime.utcnow().isoformat()
        }
        result = await history_collection.insert_one(document)
        return str(result.inserted_id)
    except Exception as e:
        print(f"Error saving history: {e}")
        return None


async def get_history(limit: int = 50) -> List[HistoryItem]:
    """Get history items from database"""
    if not db:
        return []
    
    try:
        history_collection = db.history
        cursor = history_collection.find().sort("created_at", -1).limit(limit)
        items = []
        async for doc in cursor:
            items.append(HistoryItem(
                id=str(doc["_id"]),
                type=doc.get("type", "text"),
                input=doc.get("input", ""),
                jsx_code=doc.get("jsx_code", ""),
                component_name=doc.get("component_name", "Component"),
                created_at=doc.get("created_at")
            ))
        return items
    except Exception as e:
        print(f"Error getting history: {e}")
        return []


async def delete_history_item(item_id: str) -> bool:
    """Delete a history item"""
    if not db:
        return False
    
    try:
        from bson import ObjectId
        history_collection = db.history
        result = await history_collection.delete_one({"_id": ObjectId(item_id)})
        return result.deleted_count > 0
    except Exception as e:
        print(f"Error deleting history item: {e}")
        return False

