import random

def detect_opportunities():
    """
    Simple rule:
    If PulseScore > 70, give BUY recommendation.
    """

    # Mock symbols
    symbols = ["HydroGen", "SolarTech", "WindCorp"]

    opps = []
    for s in symbols:
        pulse = random.randint(40, 95)

        if pulse > 70:
            opps.append({
                "symbol": s,
                "action": "BUY",
                "allocation": random.randint(8, 15),
                "confidence": pulse / 100,
                "reason": "PulseScore strongly bullish",
            })
    
    return opps
