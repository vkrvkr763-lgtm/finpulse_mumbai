# backend/routes/action_center.py
from fastapi import APIRouter
from typing import List, Dict
from datetime import datetime
from routes.timeline import add_event  # use the timeline helper

router = APIRouter(prefix="/action-center", tags=["action-center"])

# In-memory storage for dem
_PENDING_ACTIONS = []
_APPROVED_ACTIONS = []

@router.post("/create")
def create_pending_action(symbol: str, action: str, allocation: float):
    item = {
        "id": len(_PENDING_ACTIONS) + 1,
        "symbol": symbol,
        "action": action,
        "allocation": allocation,
        "created_at": datetime.utcnow().isoformat() + "Z"
    }
    _PENDING_ACTIONS.append(item)
    add_event("Advisor", f"Pending action created: {symbol} {action} {allocation}%")
    return {"status": "created", "item": item}

@router.post("/approve")
def approve_action(item_id: int):
    # find pending
    item = next((x for x in list(_PENDING_ACTIONS) if x["id"] == item_id), None)
    if not item:
        return {"status": "error", "message": "item not found"}
    _PENDING_ACTIONS.remove(item)
    _APPROVED_ACTIONS.append(item)
    add_event("Guardian", f"Action approved: {item['symbol']} {item['action']} {item['allocation']}%")
    # (Here you could call broker API)
    return {"status": "approved", "item": item}

@router.post("/ignore")
def ignore_action(item_id: int):
    item = next((x for x in list(_PENDING_ACTIONS) if x["id"] == item_id), None)
    if not item:
        return {"status": "error", "message": "item not found"}
    _PENDING_ACTIONS.remove(item)
    add_event("Advisor", f"Action ignored: {item['symbol']}")
    return {"status": "ignored", "item": item}

@router.get("/pending")
def list_pending():
    return {"pending": _PENDING_ACTIONS}

@router.get("/approved")
def list_approved():
    return {"approved": _APPROVED_ACTIONS}
