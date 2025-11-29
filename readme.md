# FinPulse

FinPulse is an AI-powered investment analysis platform that provides stock insights, risk analysis, opportunities, portfolio simulations, and optimization tools.

---

## Project Structure

backend/      → FastAPI backend  
frontend/     → HTML, JS, TailwindCSS frontend  
business/  
docs/  
nanda-agents/  
horizon-nodes/  

---

## How to Run the Project

### 1. Create Virtual Environment
python -m venv venv

### 2. Activate Environment
Windows:
.\venv\Scripts\activate

### 3. Install Requirements
pip install -r requirements.txt

---

## Run Backend
cd backend  
uvicorn main:app --reload

Backend URL:  
http://127.0.0.1:8000

---

## Run Frontend
cd frontend  
python -m http.server 5500

Frontend URL:  
http://localhost:5500/pages

# Hardcorded Details:
User 1:
Email: user1@finpulse.com
Password: password123

User 2:
Email: user2@finpulse.com
Password: password456
