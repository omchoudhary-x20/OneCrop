import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
import joblib
import tensorflow as tf
from tensorflow.keras.models import model_from_json
import pickle
from flask_cors import CORS
from PIL import Image
import io

app = Flask(__name__)
CORS(app)



# Load the trained model and label encoders for fertilizer prediction
fertilizer_model = joblib.load("crop_fertilizer/fertilizer.pkl")
soil_type_label_encoder = joblib.load("crop_fertilizer/soil_type_label_encoder.pkl")
crop_type_label_encoder = joblib.load("crop_fertilizer/crop_type_label_encoder.pkl")
fertname_label_encoder = joblib.load("crop_fertilizer/fertname_label_encoder.pkl")

# Load the label binarizer and model for sunflower disease prediction
label_binarizer_path = "crop_disease_sunflower/label_binarizer.pkl"
with open(label_binarizer_path, "rb") as file:
    label_binarizer = pickle.load(file)

model_architecture_path = "crop_disease_sunflower/model_architecture.json"
with open(model_architecture_path, "r") as json_file:
    loaded_model_json = json_file.read()
model_sunflower = tf.keras.models.model_from_json(loaded_model_json)

weights_path = "crop_disease_sunflower/model_weights.pkl"
model_sunflower.load_weights(weights_path)

# Load the label binarizer and model for wheat disease prediction
wheat_label_binarizer_path = "crop_disease_wheat/wheat_label_binarizer.pkl"
with open(wheat_label_binarizer_path, "rb") as file:
    wheat_label_binarizer = pickle.load(file)

wheat_model_architecture_path = "crop_disease_wheat/wheat_model_architecture.json"
with open(wheat_model_architecture_path, "r") as json_file:
    wheat_loaded_model_json = json_file.read()
model_wheat = tf.keras.models.model_from_json(wheat_loaded_model_json)

wheat_weights_path = "crop_disease_wheat/wheat_model_weights.pkl"
model_wheat.load_weights(wheat_weights_path)

# Load the trained model for crop yield prediction
crop_yield_model = joblib.load('crop_yield/random_forest_model.pkl')


# Load the model architecture for crop diease detection maize
maize_model_architecture_file = "crop_disease_maize/crop_disease_model_architecture.json"
with open(maize_model_architecture_file, 'r') as file:
    maize_model_json = file.read()
maize_model = model_from_json(maize_model_json)

# Load the model weights
maize_model_weights_file = "crop_disease_maize/crop_disease_model_weights.json"
maize_model.load_weights(maize_model_weights_file)

# Load the model labels
maize_labels_file = "crop_disease_maize/crop_disease_model_labels.pkl"
with open(maize_labels_file, 'rb') as file:
    maize_labels = pickle.load(file)

@app.route('/predictFertilizer', methods=['POST'])
def predict_fertilizer():
    data = request.get_json()
    # Create a DataFrame from the received JSON data
    df = pd.DataFrame([data], columns=['Temparature', 'Humidity ', 'Moisture', 'Soil Type', 'Crop Type', 'Nitrogen', 'Potassium', 'Phosphorous'])

    # Perform the necessary preprocessing on the DataFrame
    df["Soil Type"] = soil_type_label_encoder.transform(df["Soil Type"])
    df["Crop Type"] = crop_type_label_encoder.transform(df["Crop Type"])

    # Make predictions using the trained model
    predictions = fertilizer_model.predict(df)

    # Convert the predictions to the corresponding fertilizer names
    predicted_fertilizers = fertname_label_encoder.inverse_transform(predictions)

    # Return the predicted fertilizer as a JSON response
    return jsonify({'predicted_fertilizer': predicted_fertilizers[0]})


@app.route('/predict-disease-sunflower', methods=['POST'])
def predict_disease_sunflower():
    # Get the photo from the request
    photo = request.files["photo"]

    # Load and preprocess the image
    image = Image.open(photo)
    image = image.convert("RGB")
    image = image.resize((224, 224))
    image = np.array(image)
    image = image.astype("float32") / 255.0
    image = np.expand_dims(image, axis=0)

    # Make the prediction
    prediction = model_sunflower.predict(image)
    predicted_class = label_binarizer.inverse_transform(prediction)[0]

    # Return the prediction result as JSON
    result = {"predicted_class": predicted_class}
    return jsonify(result)


@app.route('/predict-disease-wheat', methods=['POST'])
def predict_disease_wheat():
    # Get the photo from the request
    photo = request.files["photo"]

    # Load and preprocess the image
    image = Image.open(photo)
    image = image.convert("RGB")
    image = image.resize((224, 224))
    image = np.array(image)
    image = image.astype("float32") / 255.0
    image = np.expand_dims(image, axis=0)

    # Make the prediction
    prediction = model_wheat.predict(image)
    predicted_class = wheat_label_binarizer.inverse_transform(prediction)[0]

    # Return the prediction result as JSON
    result = {"predicted_class": predicted_class}
    return jsonify(result)


# API endpoint for making predictions
@app.route('/predict-disease-maize', methods=['POST'])
def predict():
    # Get the image file from the request
    file = request.files['image']

    # Preprocess the image
    image_stream = io.BytesIO(file.read())
    img = tf.keras.preprocessing.image.load_img(image_stream, target_size=(256, 256))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0

    # Make predictions
    predictions = maize_model.predict(img_array)
    predicted_class_index = np.argmax(predictions[0])
    predicted_class = maize_labels[predicted_class_index]

    # Prepare the response
    response = {
        'class': predicted_class
    }

    return jsonify(response)


@app.route('/crop-yield', methods=['POST'])
def predict_yield():

    data = request.form

    # Retrieve input values from the request
    mean_soil_depth = float(data['mean_soil_depth'])
    irrigation = float(data['irrigation'])
    rain = float(data['rain'])
    T_max = float(data['T_max'])
    T_min = float(data['T_min'])

    # Perform prediction using the loaded model
    prediction = crop_yield_model.predict([[mean_soil_depth, irrigation, rain, T_max, T_min]])
    predicted_yield = prediction[0]

    # Prepare the response
    response = {
        'yield': predicted_yield
    }
    
    return jsonify(response)



if __name__ == '__main__':
    app.run(debug=True)
