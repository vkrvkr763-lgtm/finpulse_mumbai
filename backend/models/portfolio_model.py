from pydantic import BaseModel

class Portfolio(BaseModel):
    symbol: str
    quantity: int
    avg_price: float
