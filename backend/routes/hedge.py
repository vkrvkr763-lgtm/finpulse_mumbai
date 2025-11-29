# backend/routes/hedge.py
from fastapi import APIRouter
from typing import List, Dict
from agents.hedge_agent import suggest_hedges
from datetime import datetime

router = APIRouter(prefix="/hedge", tags=["hedge"])

@router.post("/suggest")
def get_hedge_suggestions(portfolio: List[Dict]):
    """
    Input: JSON list of holdings like [{ "symbol": "SolarTech", "weight": 40 }, ...]
    Output: list of hedge suggestions.
    """
    suggestions = suggest_hedges(portfolio)
    return {
        "suggestions": suggestions,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }
