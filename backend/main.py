# finpulse/backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# import routers
from routes import pulsescore, opportunities
from routes import action_center 
from routes import quantum_optimize
# backend/main.py (add these imports near your other routers)
from routes import hedge, risk_radar, timeline, action_center, quantum_optimize



app = FastAPI(title="FinPulse API", version="1.0")
app.include_router(quantum_optimize.router)
app.include_router(hedge.router)
app.include_router(risk_radar.router)
app.include_router(timeline.router)
app.include_router(action_center.router)
app.include_router(pulsescore.router)
app.include_router(opportunities.router)

# quantum_optimize already included earli
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev/hackathon only. Restrict in prod.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "FinPulse API is running!"}
