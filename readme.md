# FinPulse – AI-Powered Investment Intelligence Platform

FinPulse is an advanced investment analysis platform that uses machine learning, financial APIs, risk assessment engines, and intelligent simulations to help users make informed investment decisions.
It provides PulseScore, Opportunities, Risk Radar, Hedging Suggestions, Digital Twin Simulations, and Quantum Portfolio Optimization — all in one place.

# ⭐ Key Features

🔹 PulseScore Engine
AI-generated score for any stock combining:
Market sentiment
Volatility
Technical indicators
Fundamental metrics
News & trend intelligence

🔹 Opportunities Explorer
Identifies profitable investment opportunities using:
Breakout signals
Volume surges
Trend momentum
AI anomaly detection

🔹 Risk Radar
Comprehensive risk analysis:
Downside probability
Stress testing
Portfolio exposure
Volatility checks

🔹 Hedging Assistant
Generates risk-reducing portfolio hedge strategies.

🔹 Digital Twin Simulator
Simulates portfolio behavior under future market scenarios:
Crash simulations
Growth predictions
Monte-Carlo modeling

🔹 Quantum Optimize
AI + quantum-inspired portfolio optimization engine:
Balance risk vs return
Optimal allocation suggestions

# 📁 Project Structure

finpulse/
│── backend/
│   ├── main.py
│   ├── routes/
│   │   ├── pulsescore.py
│   │   ├── opportunities.py
│   │   ├── risk_radar.py
│   │   ├── hedge.py
│   │   ├── digital_twin.py
│   │   ├── quantum_optimize.py
│   ├── utils/ (optional)
│   └── requirements.txt
│
│── frontend/
│   ├── index.html
│   ├── styles/
│   ├── js/
│   ├── assets/
│
│── business/
│── docs/
│── nanda-agents/
│── horizon-nodes/
│── readme.md

# ⚙️ Setup Instructions

1️⃣ Create Virtual Environment
python -m venv venv

2️⃣ Activate Virtual Environment

Windows:
.\venv\Scripts\activate

Mac/Linux:
source venv/bin/activate

3️⃣ Install Dependencies
pip install -r requirements.txt

▶️ Run the Backend (FastAPI)
Navigate to backend folder:

cd backend

Start the backend server:
uvicorn main:app --reload

Backend runs at:

http://127.0.0.1:8000

💻 Run the Frontend
To run frontend on port 5500:

cd frontend
python -m http.server 5500

Then open in browser:
http://localhost:5500



# 🧩 Available API Endpoints
Module	Endpoint	Type
PulseScore	/pulsescore/{symbol}	GET
Opportunities	/opportunities	GET
Risk Radar	/risk-radar/analyze	POST
Hedge Engine	/hedge/strategy	POST
Digital Twin	/digital-twin/simulate	POST
Quantum Optimization	/quantum-optimize/portfolio	

# 🚀 Future Enhancements
Automated portfolio rebalancing
User login + personalization
Historical backtesting
Full AI advisor

Real-time market alerts
