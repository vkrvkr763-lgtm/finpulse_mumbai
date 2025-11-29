from fastapi import APIRouter
import random

router = APIRouter(prefix="/pulsescore", tags=["ai"])

@router.get("/")
async def get_pulse():
    sentiment = random.choice(["positive", "negative", "neutral"])
    score = round(random.uniform(65, 95), 2)
    momentum = round(random.uniform(-1, 1), 2)

    return {
        "sentiment_label": sentiment,
        "sentiment_score": score,
        "momentum": momentum
    }
