# 🏠 Bombay House Predictor

An AI-powered web application that predicts residential property prices across Mumbai using Machine Learning. Built with **React**, **FastAPI**, and **CatBoost**, it provides fast and accurate price estimations through a modern, responsive interface.

![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-009688.svg)
![CatBoost](https://img.shields.io/badge/CatBoost-FFD400.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

---

## ✨ Features

- 🤖 AI-powered property price prediction
- 📍 Supports Mumbai localities
- ⚡ Fast prediction using CatBoost
- 🎨 Modern glassmorphism UI
- 📱 Fully responsive design
- 📊 Beautiful analytics dashboard
- 🔍 Smart locality search
- 🚀 FastAPI backend with REST API
- ⚛️ React + Vite frontend

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios

### Backend
- FastAPI
- Uvicorn
- Pandas
- NumPy
- CatBoost
- Scikit-learn

### Machine Learning
- CatBoost Regressor
- Feature Engineering
- Data Preprocessing

---

## 📂 Project Structure

```
bombay_house_predictor/
│
├── backend/
│   ├── app/
│   ├── model/
│   ├── requirements.txt
│   └── main.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── data/
├── README.md
└── .gitignore
```

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/sridhantDalai/bombay_house_predictor.git
cd bombay_house_predictor
```

---

## Backend Setup

Create a virtual environment

```bash
python -m venv .venv
```

Activate it

### Windows

```bash
.venv\Scripts\activate
```

### Linux / macOS

```bash
source .venv/bin/activate
```

Install dependencies

```bash
pip install -r backend/requirements.txt
```

Run the FastAPI server

```bash
uvicorn backend.app.main:app --reload
```

Backend runs on

```
http://localhost:8000
```

---

## Frontend Setup

Move into frontend

```bash
cd frontend
```

Install packages

```bash
npm install
```

Run development server

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

## API Endpoint

### Predict Property Price

```
POST /predict
```

Example JSON

```json
{
  "bhk": 2,
  "area": 950,
  "locality": "Andheri West"
}
```

Example Response

```json
{
  "predicted_price": 18500000
}
```

---

## Machine Learning Model

The prediction model is trained using **CatBoost Regressor** on Mumbai residential property data.

Features include:

- Locality
- BHK
- Carpet Area
- Property Type
- Furnishing
- Bathrooms
- Balconies
- Property Age
- Floor Details

---

## Screenshots

> Add screenshots of your homepage, prediction page, and analytics dashboard here.

```
screenshots/
├── home.png
├── prediction.png
└── analytics.png
```

---

## Future Improvements

- Interactive Map View
- Nearby Amenities
- Market Trend Analysis
- Rental Price Prediction
- AI Property Insights
- Price History Graphs
- User Authentication
- Saved Predictions

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## Author

**Sridhant Dalai**

- GitHub: https://github.com/sridhantDalai
- LinkedIn: https://www.linkedin.com/in/sridhantdalai

---

## License

This project is licensed under the MIT License.

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
