# backend/agents/risk_agent.py
import numpy as np
from typing import List, Dict

def compute_risk_heatmap(portfolio: List[Dict]):
    """
    Simple mock correlation/volatility-based heatmap generator.
    Returns list of clusters with status 'low', 'medium', 'high'.
    """
    # For hackathon: generate cluster labels from weights and random volatility
    clusters = []
    for h in portfolio:
        weight = h.get("weight", 10)
        vol = np.clip( (weight / 100.0) * (0.5 + np.random.rand()), 0.05, 0.9)
        if vol < 0.2:
            label = "low"
        elif vol < 0.45:
            label = "medium"
        else:
            label = "high"
        clusters.append({
            "symbol": h.get("symbol"),
            "weight": weight,
            "volatility": round(float(vol), 2),
            "status": label
        })
    return clusters
