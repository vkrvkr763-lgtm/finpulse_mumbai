# backend/agents/hedge_agent.py
from typing import List, Dict
import random

def suggest_hedges(portfolio: List[Dict], risk_profile: str = "moderate"):
    """
    Simple heuristic hedging suggestions:
    - If high equity exposure: suggest utilities ETF, gold, short-duration bonds
    - Return list of instruments with estimated impact and cost.
    """
    total_equity = sum([p.get("weight", 0) for p in portfolio])
    hedges = []

    # Basic rules
    if total_equity >= 60:
        hedges.append({
            "instrument": "Utilities ETF",
            "purpose": "Reduce cyclical exposure",
            "impact_estimated_drawdown_reduction_pct": round(random.uniform(8, 18), 1),
            "cost_bps": round(random.uniform(3, 12), 1)
        })
        hedges.append({
            "instrument": "Gold ETF",
            "purpose": "Tail risk / inflation hedge",
            "impact_estimated_drawdown_reduction_pct": round(random.uniform(6, 14), 1),
            "cost_bps": round(random.uniform(2, 10), 1)
        })
    else:
        hedges.append({
            "instrument": "Short-duration Govt Bonds",
            "purpose": "Liquidity buffer",
            "impact_estimated_drawdown_reduction_pct": round(random.uniform(3, 7), 1),
            "cost_bps": round(random.uniform(1, 4), 1)
        })

    # Add a "tail overlay" suggestion sometimes
    if random.random() > 0.7:
        hedges.append({
            "instrument": "Tail-risk Put Overlay (small)",
            "purpose": "Protect against large downside",
            "impact_estimated_drawdown_reduction_pct": round(random.uniform(10, 25), 1),
            "cost_bps": round(random.uniform(12, 40), 1)
        })

    return hedges
