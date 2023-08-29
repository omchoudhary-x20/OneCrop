import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./FertilizerPredictionPage.css";
import Navbar from "../../shared/NavBar/Navbar";
const FertilizerPredictionPage = () => {
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [cropType, setCropType] = useState("");
  const [soilType, setSoilType] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [moisture, setMoisture] = useState("");
  const [fertilizerName, setFertilizerName] = useState("");

  const history = useHistory();

  const handleNitrogenChange = (e) => {
    setNitrogen(e.target.value);
  };

  const handlePhosphorusChange = (e) => {
    setPhosphorus(e.target.value);
  };

  const handlePotassiumChange = (e) => {
    setPotassium(e.target.value);
  };

  const handleCropTypeChange = (e) => {
    setCropType(e.target.value);
  };

  const handleSoilTypeChange = (e) => {
    setSoilType(e.target.value);
  };

  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
  };

  const handleHumidityChange = (e) => {
    setHumidity(e.target.value);
  };

  const handleMoistureChange = (e) => {
    setMoisture(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the form data
    const formData = new FormData(e.target);

    // Prepare the request body
    const requestBody = {};
    for (let [key, value] of formData.entries()) {
      requestBody[key] = value;
    }

    console.log(requestBody);

    // Make a POST request to the fertilizer prediction API
    const response = await fetch("http://localhost:5000/predictFertilizer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    // Get the prediction result
    const prediction = await response.json();

    // Update the state with the prediction result
    setFertilizerName(prediction.predicted_fertilizer);
  };

  return (
    <>
      <Navbar></Navbar>
      <div
        style={{
          backgroundColor: "whitesmoke",
          margin: "150px 300px",
          borderRadius: "30px",
        }}
      >
        <div className="fertilizer-prediction-container">
          <form
            onSubmit={handleSubmit}
            className="prediction-form"
            style={{ margin: "20px auto" }}
          >
            <h1 className="page-title" style={{ margin: "50px auto", textAlign:"center" }}>Fertilizer Recommendation 🌱</h1>
            <div className="form-group">
              <label htmlFor="nitrogen">Nitrogen</label>
              <input
                type="number"
                id="nitrogen"
                name="Nitrogen"
                placeholder="Enter Nitrogen"
                className="form-control"
                value={nitrogen}
                onChange={handleNitrogenChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phosphorus">Phosphorus</label>
              <input
                type="number"
                id="phosphorus"
                name="Phosphorus"
                placeholder="Enter Phosphorus"
                className="form-control"
                value={phosphorus}
                onChange={handlePhosphorusChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="potassium">Potassium</label>
              <input
                type="number"
                id="potassium"
                name="Potassium"
                placeholder="Enter Potassium"
                className="form-control"
                value={potassium}
                onChange={handlePotassiumChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cropType">Crop Type</label>
              <input
                type="text"
                id="cropType"
                name="Crop Type"
                placeholder="Enter Crop Type"
                className="form-control"
                value={cropType}
                onChange={handleCropTypeChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="soilType">Soil Type</label>
              <input
                type="text"
                id="soilType"
                name="Soil Type"
                placeholder="Enter Soil Type"
                className="form-control"
                value={soilType}
                onChange={handleSoilTypeChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="temperature">Temperature</label>
              <input
                type="number"
                id="temperature"
                name="Temparature"
                placeholder="Enter Temperature"
                className="form-control"
                value={temperature}
                onChange={handleTemperatureChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="humidity">Humidity</label>
              <input
                type="number"
                id="humidity"
                name="Humidity "
                placeholder="Enter Humidity"
                className="form-control"
                value={humidity}
                onChange={handleHumidityChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="moisture">Moisture</label>
              <input
                type="number"
                id="moisture"
                name="Moisture"
                placeholder="Enter Moisture"
                className="form-control"
                value={moisture}
                onChange={handleMoistureChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                margin: "10px 50px",
                borderRadius: "15px",
                width: "300px",
              }}
            >
              Predict
            </button>
          </form>
          {fertilizerName && (
            <div className="prediction-result" style={{ margin: "20px auto" }}>
              <h3 style={{ textAlign: "center" }}>
                Recommended Fertilizer: <strong>{fertilizerName}</strong>
              </h3>
              <button className="button-91" style={{ margin: "10px 180px" }}>
                Shop {fertilizerName} Now
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FertilizerPredictionPage;
