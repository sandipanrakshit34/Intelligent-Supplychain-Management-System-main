from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from sklearn.ensemble import RandomForestRegressor
import pandas as pd
import numpy as np


app = Flask(__name__)
CORS(app)


@app.route('/predictMonthly', methods=['GET', 'POST'])
def monthlyPrediction():
    if "month" not in request.args or "year" not in request.args:
        return jsonify({"error": "Invalid arguments passed. Must include 'month' and 'year'."})
        
    month = int(request.args["month"])
    year = int(request.args["year"])
    
    X_test = pd.DataFrame(np.array([year, month]).reshape(1, -1), columns=["Year", "Month"])
    
    # Load the model
    loaded_model = joblib.load("sparkathon-randomforest-monthly.pkl")
    
    # Make predictions
    y_pred = loaded_model.predict(X_test)
    
    json_output = {
        "P1": int(y_pred[0][0]),
        "P2": int(y_pred[0][1]),
        "P3": int(y_pred[0][2]),
        "P4": int(y_pred[0][3]),
    }
    
    return jsonify(json_output)
    
    
@app.route('/')
def home():
    return jsonify({"status": 1})
