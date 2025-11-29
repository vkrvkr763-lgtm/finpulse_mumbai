from fastapi import APIRouter
from agents.scout_agent import detect_opportunities
from datetime import datetime

router = APIRouter(prefix="/opportunities", tags=["opportunities"])

@router.get("/")
def list_opportunities():
    opps = detect_opportunities()

    formatted = []
    for o in opps:
        formatted.append({
            "symbol": o["symbol"],
            "name": f"{o['symbol']} Corp",
            "action": o["action"],
            "suggested_allocation_percent": o["allocation"],
            "reason": o["reason"],
            "confidence": o["confidence"],
            "detected_at": datetime.utcnow().isoformat() + "Z"
        })

    return {"opportunities": formatted}
