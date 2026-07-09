import numpy as np
import pandas as pd
from app.model_loader import loader

def predict_house_price(bhk: int, area: float, locality: str) -> float:
    """
    Perform house price prediction using the pre-loaded CatBoost regressor
    and the lookup mapping for macro-locality details.
    """
    model = loader.get_model()
    lookup = loader.get_lookup()
    
    if locality not in lookup:
        raise ValueError(f"Locality '{locality}' not found in model lookup data.")
        
    macro_loc = lookup[locality]['macro_locality']
    macro_avg = lookup[locality]['macro_locality_avg_price']
    
    # Construct DataFrame with feature columns in the exact order/shape expected by CatBoost
    input_df = pd.DataFrame([{
        'bhk': bhk,
        'area': area,
        'locality': locality,
        'macro_locality': macro_loc,
        'macro_locality_avg_price': macro_avg
    }])
    
    # Run prediction (log price) and convert back using expm1
    log_pred = model.predict(input_df)
    predicted_price = np.expm1(log_pred)[0]
    
    # Return as standard Python float
    return float(predicted_price)
