import os
import pickle
import pandas as pd
from catboost import CatBoostRegressor

class ModelLoader:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(ModelLoader, cls).__new__(cls, *args, **kwargs)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
        
        # Calculate absolute paths relative to this file
        # This file: .../backend/app/model_loader.py
        # App dir: .../backend/app
        # Backend dir: .../backend
        # Project root: .../
        self.app_dir = os.path.dirname(os.path.abspath(__file__))
        self.project_root = os.path.dirname(os.path.dirname(self.app_dir))
        self.model_dir = os.path.join(self.project_root, "model")
        
        self.model_path = os.path.join(self.model_dir, "mumbai_house_model.cbm")
        self.pkl_path = os.path.join(self.model_dir, "lookup_data.pkl")
        self.csv_path = os.path.join(self.model_dir, "data.csv")
        self.localities_path = os.path.join(self.model_dir, "localities.txt")
        
        self.model = None
        self.locality_lookup = None
        self.localities = []
        self.df = None
        
        self.load_all()
        self._initialized = True

    def load_all(self):
        print(f"Loading CatBoost model from {self.model_path}...")
        self.model = CatBoostRegressor()
        self.model.load_model(self.model_path)
        
        print(f"Loading lookup pickle from {self.pkl_path}...")
        with open(self.pkl_path, "rb") as f:
            self.locality_lookup = pickle.load(f)
            
        print(f"Loading data CSV from {self.csv_path}...")
        self.df = pd.read_csv(self.csv_path)
        
        print(f"Loading localities from {self.localities_path}...")
        if os.path.exists(self.localities_path):
            with open(self.localities_path, "r", encoding="utf-8") as f:
                lines = [line.strip() for line in f if line.strip()]
            
            # Skip header "locality" if present
            if lines and lines[0].lower() == "locality":
                lines = lines[1:]
                
            # Filter to keep only unique localities and sort them
            self.localities = sorted(list(set(lines)))
        else:
            # Fallback to pickle keys if file is missing
            self.localities = sorted(list(self.locality_lookup.keys()))
            
        print("Model loader completed initialization successfully.")

    def get_model(self):
        return self.model

    def get_lookup(self):
        return self.locality_lookup

    def get_localities(self):
        return self.localities

    def get_dataframe(self):
        return self.df

# Global singleton instance
loader = ModelLoader()
