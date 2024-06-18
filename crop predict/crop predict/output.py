import numpy as np
import pandas as pd

import pandas as pd

crop = pd.read_csv("Crop_recommendation.csv")
crop.head()

crop.shape

crop.info()

crop.isnull().sum()

crop.duplicated().sum()

crop.describe()

import pandas as pd
# Exclude non-numeric columns from correlation computation
numeric_crop = crop.select_dtypes(include=['number'])

# Compute correlation matrix
corr = numeric_crop.corr()
print(corr)

import seaborn as sns
sns.heatmap(corr,annot = True,cbar = True,cmap = 'coolwarm')

crop['label'].value_counts()

import matplotlib.pyplot as plt
sns.histplot(crop['N'])
plt.show()

crop_dict = {
    'rice': 1,
    'maize': 2,
    'jute': 3,
    'cotton': 4,
    'coconut': 5,
    'papaya': 6,
    'orange': 7,
    'apple': 8,
    'muskmelon': 9,
    'watermelon': 10,
    'grapes': 11,
    'mango': 12,
    'banana': 13,
    'pomegranate': 14,
    'lentil': 15,
    'blackgram': 16,
    'mungbean': 17,
    'mothbeans': 18,
    'pigeonpeas': 19,
    'kidneybeans': 20,
    'chickpea': 21,
    'coffee': 22
}
crop['crop_num'] = crop['label'].map(crop_dict)

crop['crop_num'].value_counts()

crop.drop(['label'],axis=1,inplace=True)
crop.head()

x = crop.drop('crop_num',axis = 1)
y = crop['crop_num']

x.shape

y.shape

from sklearn.model_selection import train_test_split

x_train, x_test,y_train,y_test = train_test_split(x,y,test_size = 0.2,random_state = 42)

x_train.shape

x_test.shape

from sklearn.preprocessing import MinMaxScaler
ms = MinMaxScaler()

ms.fit(x_train)
x_train = ms.transform(x_train)
x_test = ms.transform(x_test)

x_train

from sklearn.preprocessing import StandardScaler
sc = StandardScaler()

sc.fit(x_train)
x_train = sc.transform(x_train)
x_test = sc.transform(x_test)

x_train

from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.tree import ExtraTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import BaggingClassifier
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.ensemble import AdaBoostClassifier
from sklearn.metrics import accuracy_score

# Assuming x_train, y_train, x_test, y_test are defined

# Create instances of all models
models = {
    'Logistic Regression': LogisticRegression(),
    'Naive Bayes': GaussianNB(),
    'Support Vector Machine': SVC(),
    'K-Nearest Neighbors': KNeighborsClassifier(),
    'Decision-Tree': DecisionTreeClassifier(),
    'Random-Forest': RandomForestClassifier(),
    'Bagging': BaggingClassifier(),
    'AdaBoost': AdaBoostClassifier(),
    'Gradient Boosting': GradientBoostingClassifier(),
    'Extra Trees': ExtraTreeClassifier()
}

# Iterate over models
for name, md in models.items():
    md.fit(x_train, y_train)
    y_pred = md.predict(x_test)
    print(f"{name} with accuracy : {accuracy_score(y_test, y_pred)}")


rfc = RandomForestClassifier()
rfc.fit(x_train,y_train)
y_pred = md.predict(x_test)
accuracy_score(y_test,y_pred)

def recommendation(N, P, K, temperature, humidity, ph, rainfall):
    features = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
    prediction = rfc.predict(features).reshape(1, -1)
    return prediction[0]


N = 0
P = 0
K = 0
temperature = 0
humidity = 0
ph = 0
rainfall = 0

predict = recommendation(N, P, K, temperature, humidity, ph, rainfall)

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

if predict[0] in crop_dict:  # Removed [0] as predict is not an array
    crop = crop_dict[predict[0]]
    print("{} is the best crop to be cultivated".format(crop))
else:
    print("Sorry, the system is not able to recommend a proper crop for the environment")



import joblib

joblib.dump(rfc,'model_joblib_rfc')

model=joblib.load('model_joblib_rfc')

prediction=model.predict([[0,0,0,0.0,0,0,0]])

if prediction[0] in crop_dict:
    predicted_crop = crop_dict[prediction[0]]
    print(predicted_crop)



