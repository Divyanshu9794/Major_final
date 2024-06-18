import numpy as np
import pandas as pd
import streamlit as st
import pickle
import seaborn as sns
import matplotlib.pyplot as plt
import plotly.figure_factory as ff

with open('model.pkl', 'rb') as file:
    # Load the data from the pickle file
    model = pickle.load(file)
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

def scatterPlotDrawer(x,y):
    fig = plt.figure(figsize=(20,15))
    sns.set_style("whitegrid")
    sns.scatterplot(data=df, x=x, y=y, hue="label", size="label", palette="deep", sizes=(20, 200), legend="full")
    plt.xlabel(x, fontsize=22)
    plt.ylabel(y, fontsize=22)
    plt.xticks(rotation=90, fontsize=18)
    plt.legend(prop={'size': 18})
    plt.yticks(fontsize=16)
    st.write(fig)

def barPlotDrawer(x,y):
    fig = plt.figure(figsize=(20,15))
    sns.set_style("whitegrid")
    sns.barplot(data=df, x=x, y=y)
    plt.xlabel("Crops", fontsize=22)
    plt.ylabel(y, fontsize=22)
    plt.xticks(rotation=90, fontsize=18)
    plt.legend(prop={'size': 18})
    plt.yticks(fontsize=16)
    st.write(fig)

def boxPlotDrawer(x,y):
    fig = plt.figure(figsize=(20,15))
    sns.set_style("whitegrid")
    sns.boxplot(x=x, y=y, data=df)
    sns.despine(offset=10, trim=True)
    plt.xlabel("Crops", fontsize=22)
    plt.ylabel(y, fontsize=22)
    plt.xticks(rotation=90, fontsize=18)
    plt.legend(prop={'size': 18})
    plt.yticks(fontsize=16)
    st.write(fig)

def main():
    html_temp_vis = """
    <div style="background-color:#025246 ;padding:10px;margin-bottom:30px">
    <h2 style="color:white;text-align:center;"> Visualize Soil Properties </h2>
    </div>
    """

    html_temp_pred = """
    <div style="background-color:#025246 ;padding:10px;margin-bottom:30px">
    <h2 style="color:white;text-align:center;"> Which Crop To Cultivate? </h2>
    </div>
    """

    # st.sidebar.title("Select One")
    # select_type = st.sidebar.radio("", ('Predict Your Crop'))

    
    # if select_type == "Predict Your Crop":
    st.markdown(html_temp_pred, unsafe_allow_html=True)
    st.header("To predict your crop give values")
    st.subheader("Drag to Give Values")
        # n = st.slider('Nitrogen', 0, 140)
        # p = st.slider('Phosphorus', 5, 145)
        # k = st.slider('Potassium', 5, 205)
        # temperature = st.slider('Temperature', 8.83, 43.68)
        # humidity = st.slider('Humidity', 14.26, 99.98)
        # ph = st.slider('pH', 3.50, 9.94)
        # rainfall = st.slider('Rainfall', 20.21, 298.56)

    n = st.text_input('Nitrogen', '0')
    p = st.text_input('Phosphorus', '0')
    k = st.text_input('Potassium', '0')
    temperature = st.text_input('Temperature', '0.0')
    humidity = st.text_input('Humidity', '0.0')
    ph = st.text_input('pH', '0.0')
    rainfall = st.text_input('Rainfall', '0.0')

    # Convert to desired types
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
        
    if st.button("Predict your crop"):
        output_number = predict_crop(n, p, k, temperature, humidity, ph, rainfall)
        # Map the output number to the corresponding crop name
        
        print(output_number)
        st.success('The most suitable crop for your field is {}'.format(output_number))

if __name__=='__main__':
    main()
    