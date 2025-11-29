from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# Load model ONCE (fast)
tokenizer = AutoTokenizer.from_pretrained("ProsusAI/finbert")
model = AutoModelForSequenceClassification.from_pretrained("ProsusAI/finbert")

labels = ["negative", "neutral", "positive"]

def analyze_sentiment(text: str):
    inputs = tokenizer(text, return_tensors='pt', padding=True, truncation=True)
    outputs = model(**inputs)
    scores = torch.nn.functional.softmax(outputs.logits, dim=1)
    scores = scores.detach().numpy()[0]

    sentiment = labels[scores.argmax()]
    confidence = float(scores.max())

    return {
        "sentiment": sentiment,
        "confidence": confidence
    }
