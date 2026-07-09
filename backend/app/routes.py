import numpy as np
import pandas as pd
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field
from typing import List, Dict, Any

from app.model_loader import loader
from app.predict import predict_house_price

router = APIRouter()

# Input Validation Schema
class PredictionRequest(BaseModel):
    bhk: int = Field(..., ge=1, le=10, description="Number of Bedrooms (BHK)", example=2)
    area: float = Field(..., ge=10, le=25000, description="Super Built-up Area in square feet", example=850)
    locality: str = Field(..., description="Name of the locality in Mumbai", example="Andheri West")

class PredictionResponse(BaseModel):
    predicted_price: float

@router.post("/predict", response_model=PredictionResponse)
@router.post("/api/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    try:
        # Normalize/clean locality name
        cleaned_locality = request.locality.strip()
        
        # Verify locality
        lookup = loader.get_lookup()
        if cleaned_locality not in lookup:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid locality: '{cleaned_locality}'. Please choose a valid Mumbai locality."
            )
            
        price = predict_house_price(request.bhk, request.area, cleaned_locality)
        return PredictionResponse(predicted_price=price)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


@router.get("/localities", response_model=List[str])
@router.get("/api/localities", response_model=List[str])
def get_localities():
    try:
        return loader.get_localities()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch localities: {str(e)}")


@router.get("/analytics", response_model=Dict[str, Any])
@router.get("/api/analytics", response_model=Dict[str, Any])
def get_analytics():
    try:
        df = loader.get_dataframe()
        if df is None or df.empty:
            raise HTTPException(status_code=404, detail="No analytics data available.")

        # 1. Summary Statistics
        summary = {
            "total_listings": int(len(df)),
            "average_price": float(df["price"].mean()),
            "median_price": float(df["price"].median()),
            "average_area": float(df["area"].mean()),
            "min_price": float(df["price"].min()),
            "max_price": float(df["price"].max()),
        }

        # 2. Top Expensive Localities (Average Price)
        top_expensive_df = (
            df.groupby("locality")["price"]
            .agg(["mean", "count"])
            .reset_index()
            .rename(columns={"mean": "average_price", "count": "listings"})
        )
        # Sort and take top 10
        top_expensive = (
            top_expensive_df.sort_values(by="average_price", ascending=False)
            .head(10)
            .to_dict(orient="records")
        )

        # 3. Distribution of BHK (Counts)
        bhk_counts = df["bhk"].value_counts().sort_index()
        bhk_distribution = [
            {"bhk": int(k), "count": int(v)} for k, v in bhk_counts.items()
        ]

        # 4. Area vs Price (Scatter Plot Data)
        # Sample points to make chart rendering smooth and prevent large transfer sizes
        scatter_sample = df.sample(n=min(300, len(df)), random_state=42)
        area_vs_price = []
        for _, row in scatter_sample.iterrows():
            area_vs_price.append({
                "area": float(row["area"]),
                "price": float(row["price"]),
                "bhk": int(row["bhk"]),
                "locality": str(row["locality"])
            })

        # 5. Price Histogram (Bins)
        # Custom binning in Rupees
        # Bins: < 50L, 50L - 1Cr, 1Cr - 2Cr, 2Cr - 5Cr, 5Cr - 10Cr, 10Cr+
        bins = [0, 5000000, 10000000, 20000000, 50000000, 100000000, np.inf]
        labels = ["< 50 L", "50 L - 1 Cr", "1 Cr - 2 Cr", "2 Cr - 5 Cr", "5 Cr - 10 Cr", "10 Cr+"]
        df["price_bin"] = pd.cut(df["price"], bins=bins, labels=labels)
        bin_counts = df["price_bin"].value_counts().reindex(labels).fillna(0)
        price_histogram = [
            {"range": str(k), "count": int(v)} for k, v in bin_counts.items()
        ]

        # 6. Macro Locality Statistics
        macro_stats_df = (
            df.groupby("macro_locality")["price"]
            .mean()
            .reset_index()
            .rename(columns={"price": "average_price"})
            .sort_values(by="average_price", ascending=False)
        )
        macro_locality_stats = macro_stats_df.to_dict(orient="records")

        return {
            "summary": summary,
            "top_expensive": top_expensive,
            "bhk_distribution": bhk_distribution,
            "area_vs_price": area_vs_price,
            "price_histogram": price_histogram,
            "macro_locality_stats": macro_locality_stats
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate analytics: {str(e)}")
