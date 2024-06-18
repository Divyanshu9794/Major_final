import sys
import json
import numpy as np
import pandas as pd
import pickle

model = pickle.load(open('model.pkl', 'rb'))
df = pd.read_csv("Crop_recommendation.csv")

converts_dict = {
    'Nitrogen': 'N',
    'Phosphorus': 'P',
    'Potassium': 'K',
    'Temperature': 'temperature',
    'Humidity': 'humidity',
    'Rainfall': 'rainfall',
    'ph': 'ph'
}

def predict_crop(n, p, k, temperature, humidity, ph, rainfall):
    input = np.array([[n, p, k, temperature, humidity, ph, rainfall]]).astype(np.float64)
    prediction = model.predict(input)
    return prediction[0]

def main():
    n =sys.argv[1]
    p = sys.argv[2]
    k =sys.argv[3]
    temperature = sys.argv[4]
    humidity = sys.argv[5]
    ph = sys.argv[6]
    rainfall =sys.argv[7]

    n = int(n)
    p = int(p)
    k = int(k)
    temperature = float(temperature)
    humidity = float(humidity)
    ph = float(ph)
    rainfall = float(rainfall)

    crop_dict = {
        1: 'rice',
        2: 'maize',
        3: 'jute',
        4: 'cotton',
        5: 'coconut',
        6: 'papaya',
        7: 'orange',
        8: 'apple',
        9: 'muskmelon',
        10: 'watermelon',
        11: 'grapes',
        12: 'mango',
        13: 'banana',
        14: 'pomegranate',
        15: 'lentil',
        16: 'blackgram',
        17: 'mungbean',
        18: 'mothbeans',
        19: 'pigeonpeas',
        20: 'kidneybeans',
        21: 'chickpea',
        22: 'coffee'
    }
        
    output_number = predict_crop(n, p, k, temperature, humidity, ph, rainfall)
    resp ={
    "Response": 200,
    "Message": "Data from Python",
    "Data": output_number
    }
    print(json.dumps(resp))
    sys.stdout.flush()
    # print('The most suitable crop for your field is', output_number)

if __name__=='__main__':
    main()