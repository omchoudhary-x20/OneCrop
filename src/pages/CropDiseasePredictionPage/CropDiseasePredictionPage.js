import React, { useState } from "react";
import Navbar from "../../shared/NavBar/Navbar";
import { useHistory } from "react-router-dom";
import "./CropDiseasePredictionPage.css";
import ProductCard from "../../shared/Cards/ProductCard/ProductCard";

const CropDiseasePredictionPage = () => {
  const [crop, setCrop] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictionResult, setPredictionResult] = useState("");
  const history = useHistory();

  function navigateToRoute(route) {
    history.push(route);
  }

  const handleCropChange = (e) => {
    setCrop(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    if (!crop || !selectedFile) {
      alert("Please select a crop and upload a photo");
      return;
    }

    // Create form data
    const formData = new FormData();

    // Make a POST request to the corresponding prediction API based on crop
    let predictionAPI = "";
    if (crop === "wheat") {
      formData.append("photo", selectedFile);
      predictionAPI = "http://localhost:5000/predict-disease-wheat";
    } else if (crop === "maize") {
      formData.append("image", selectedFile);
      predictionAPI = "http://localhost:5000/predict-disease-maize";
    } else if (crop === "sunflower") {
      formData.append("photo", selectedFile);
      predictionAPI = "http://localhost:5000/predict-disease-sunflower";
    }

    const response = await fetch(predictionAPI, {
      method: "POST",
      body: formData,
    });

    // Get the prediction result
    const prediction = await response.json();
    console.log(prediction);

    // Update the state with the prediction result
    if (crop === "wheat") {
      setPredictionResult(prediction.predicted_class);
    } else if (crop === "maize") {
      setPredictionResult(prediction.class);
    } else if (crop === "sunflower") {
      setPredictionResult(prediction.predicted_class);
    }
  };

  const handleAddToCart = () => {
    navigateToRoute("/shopping");
  };

  return (
    <>
      <Navbar />
      <div
        className="crop-disease-prediction-container"
        style={{ backgroundColor: "white", margin: "200px 400px" }}
      >
        <h1 className="page-heading">Crop Disease Prediction 🌾🦠</h1>
        <form
          onSubmit={handleSubmit}
          className="prediction-form"
          style={{ backgroundColor: "white", margin: "20px auto" }}
        >
          <div className="form-group">
            <label htmlFor="crop">Select Crop</label>
            <select
              id="crop"
              name="crop"
              className="form-control"
              value={crop}
              onChange={handleCropChange}
              required
            >
              <option value="">-- Select Crop --</option>
              <option value="wheat">Wheat</option>
              <option value="maize">Maize</option>
              <option value="sunflower">Sunflower</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="photo">Upload Photo (JPEG/PNG/JPG)</label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept=".jpeg, .png, .jpg"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Predict Disease
          </button>
        </form>

        {predictionResult && (
          <div>
            <h4 style={{margin:"30px 140px", textAlign:"center"}}> The predicted disease is <strong>{predictionResult}.</strong></h4>
            <div style={{ margin: "80px 130px" }}>
              <ProductCard
                CropImage={URL.createObjectURL(selectedFile)}
                CropDisease={`${predictionResult} Remedy`}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CropDiseasePredictionPage;
