import React, { useState } from "react";
import Navbar from "../../shared/NavBar/Navbar";
import { useHistory } from "react-router-dom";
import "./CropYieldPredictionPage.css";

const CropYieldPredictionPage = () => {
  const [soilDepth, setSoilDepth] = useState("");
  const [irrigation, setIrrigation] = useState("");
  const [rain, setRain] = useState("");
  const [temperatureMax, setTemperatureMax] = useState("");
  const [temperatureMin, setTemperatureMin] = useState("");
  const [crop, setCrop] = useState("");
  const [yieldResult, setYieldResult] = useState("");
  const [productListing, setProductListing] = useState(false);
  const history = useHistory();

  function navigateToRoute(route) {
    history.push(route);
  }

  const handleSoilDepthChange = (e) => {
    setSoilDepth(e.target.value);
  };

  const handleIrrigationChange = (e) => {
    setIrrigation(e.target.value);
  };

  const handleRainChange = (e) => {
    setRain(e.target.value);
  };

  const handleTemperatureMaxChange = (e) => {
    setTemperatureMax(e.target.value);
  };

  const handleTemperatureMinChange = (e) => {
    setTemperatureMin(e.target.value);
  };

  const handleCropChange = (e) => {
    setCrop(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    if (!soilDepth || !irrigation || !rain || !temperatureMax || !temperatureMin) {
      alert("Please fill in all fields");
      return;
    }

    // Create the request payload
    const data = new FormData();
    data.append("mean_soil_depth", soilDepth);
    data.append("irrigation", irrigation);
    data.append("rain", rain);
    data.append("T_max", temperatureMax);
    data.append("T_min", temperatureMin);

    // Send the POST request to the Flask backend
    fetch("http://localhost:5000/crop-yield", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((predictions) => {
        // Update the state with the received predictions
        setYieldResult(predictions.yield);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleProductListingChange = () => {
    setProductListing(!productListing);
  };

  return (
    <>
      <Navbar />
      <div className="crop-yield-prediction-container">
        <form onSubmit={handleSubmit} className="prediction-form" style={{backgroundColor: "whitesmoke", padding:"30px"}}>
          <h1 className="page-heading">Crop Yield Prediction 🌾</h1>
          <div className="form-group">
            <label htmlFor="soilDepth">Mean Soil Depth (in cm)</label>
            <input
              type="number"
              id="soilDepth"
              name="soilDepth"
              className="form-control"
              value={soilDepth}
              onChange={handleSoilDepthChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="irrigation">Irrigation</label>
            <input
              type="number"
              id="irrigation"
              name="irrigation"
              className="form-control"
              value={irrigation}
              onChange={handleIrrigationChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="rain">Rainfall (in mm)</label>
            <input
              type="number"
              id="rain"
              name="rain"
              className="form-control"
              value={rain}
              onChange={handleRainChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="temperatureMax">Maximum Temperature (in °C)</label>
            <input
              type="number"
              id="temperatureMax"
              name="temperatureMax"
              className="form-control"
              value={temperatureMax}
              onChange={handleTemperatureMaxChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="temperatureMin">Minimum Temperature (in °C)</label>
            <input
              type="number"
              id="temperatureMin"
              name="temperatureMin"
              className="form-control"
              value={temperatureMin}
              onChange={handleTemperatureMinChange}
              required
            />
          </div>
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
              <option value="">Select Crop</option>
              <option value="wheat">Wheat</option>
              <option value="sunflower">Sunflower</option>
              <option value="maize">Maize</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Predict Yield
          </button>
          {yieldResult && (
          <div className="prediction-result">
            <h2 className="result-heading"><strong>Yield Prediction Result</strong></h2>
            <p className="result-value">{yieldResult} tons</p>
          </div>
        )}
        </form>
      </div>
    </>
  );
};

export default CropYieldPredictionPage;
