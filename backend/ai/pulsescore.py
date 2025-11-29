import random

def compute_pulsescore(text: str):
    sentiment_label = random.choice(["positive", "negative", "neutral"])
    confidence = round(random.uniform(0.65, 0.95), 2)

    return {
        "label": sentiment_label,
        "confidence": confidence,
        "summary": f"AI sentiment is {sentiment_label} with confidence {confidence}"
    }
