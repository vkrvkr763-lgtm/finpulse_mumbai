# backend/routes/risk_radar.py
from fastapi import APIRouter
from typing import List, Dict
from agents.risk_agent import compute_risk_heatmap

router = APIRouter(prefix="/risk-radar", tags=["risk"])

@router.post("/heatmap")
def get_risk_heatmap(portfolio: List[Dict]):
    """
    Input: portfolio list of holdings with weight field.
    Output: heatmap clusters.
    """
    clusters = compute_risk_heatmap(portfolio)
    return {"clusters": clusters}
