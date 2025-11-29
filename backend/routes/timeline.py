# backend/routes/timeline.py
from fastapi import APIRouter
from datetime import datetime

router = APIRouter(prefix="/timeline", tags=["timeline"])

# Simple in-memory timeline events log (for demo)
_AGENT_TIMELINE = []

def add_event(agent: str, message: str):
    _AGENT_TIMELINE.insert(0, {  # newest first
        "time": datetime.utcnow().isoformat() + "Z",
        "agent": agent,
        "message": message
    })
    # limit length
    if len(_AGENT_TIMELINE) > 200:
        _AGENT_TIMELINE.pop()

@router.get("/")
def get_timeline(limit: int = 25):
    return {"timeline": _AGENT_TIMELINE[:limit]}

# Export add_event for other modules to call
router.add_event = add_event
