import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router

app = FastAPI(
    title="Bombay House Predictor AI API",
    description="REST API for predicting house prices in Mumbai using CatBoost ML model.",
    version="1.0.0"
)

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permits all origins for ease of local testing & deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(router)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "app": "Bombay House Predictor AI Backend",
        "endpoints": [
            "POST /predict",
            "GET /localities",
            "GET /analytics"
        ]
    }

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
