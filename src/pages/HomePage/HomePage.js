import React from "react";
import Navbar from "../../shared/NavBar/Navbar";
import TitleCard from "../../shared/Cards/TitleCard";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import "./HomePage.css";
import Footer from "../../shared/Footer/Footer";
import ModelViewer from "../../shared/ThreeDimensionalBuilding/ModelRenderer";
const HomePage = () => {
  const history = useHistory();

  const navigateToRoute = (route) => {
    history.push(route);
  };

  return (
    <div className="homePages">
      <Navbar />
      <div
        id="threedcomp"
        style={{ width: "240px", height: "200px", margin: "-60px 620px" }}
      >
        <ModelViewer scale="0.09" modelPath={"minecraft4.glb"} />
      </div>
      <div className="titleDisplay" style={{ margin: "170px 100px" }}>
        <div className="animatedTitle">
          <h1>
            <span>One</span> Crop
          </h1>
          <h2>
            Empowering Farmers with OneCrop: Your One-Stop Marketplace for
            Informed Farming Strategies
          </h2>
        </div>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid
            item
            xs={6}
            onClick={() => navigateToRoute("/CropPredictionPage")}
          >
            <TitleCard
              style={{
                background:
                  "radial-gradient(circle at 10% 20%, rgb(222, 168, 248) 0%, rgb(168, 222, 248) 21.8%, rgb(189, 250, 205) 35.6%, rgb(243, 250, 189) 52.9%, rgb(250, 227, 189) 66.8%, rgb(248, 172, 172) 90%, rgb(254, 211, 252) 99.7%)",
              }}
              title={"SHOPPING PAGE"}
              description={
                "Get shopping recommendations based on quality of soil and crop."
              }
              imageSrc={
                "https://www.kisaanhelpline.com/cat_images/rabi-crop-1.jpg"
              }
            />
          </Grid>
          <Grid
            item
            xs={6}
            onClick={() => navigateToRoute("/FertilizerPredictionPage")}
          >
            <TitleCard
              title={"FERTILIZER PREDICTION"}
              description={
                "Receive personalized fertilizer recommendations for your crops."
              }
              imageSrc={
                "https://site.samunnati.com/wp-content/uploads/2022/03/unlocking-agri-sector.jpg"
              }
            />
          </Grid>
          <Grid
            item
            xs={6}
            onClick={() => navigateToRoute("/CropDiseaseDetectionPage")}
          >
            <TitleCard
              title={"CROP DISEASE DETECTION"}
              description={
                "Identify crop diseases by uploading photos for analysis."
              }
              imageSrc={
                "https://indianseeds.in/wp-content/uploads/2021/07/common-plant-diseases-in-india-with-pictures-indian-seeds.png"
              }
            />
          </Grid>
          <Grid
            item
            xs={6}
            onClick={() => navigateToRoute("/CropDiseasePrediction")}
          >
            <TitleCard
              title={"CROP YIELD / PRICE PREDICTION"}
              description={
                "Predict crop yields and prices for better planning and decision-making."
              }
              imageSrc={
                "https://media.istockphoto.com/id/1226029166/photo/fruts-vegetables-at-market-india.jpg?s=612x612&w=0&k=20&c=2zOAPF32PTDonIvCUA1PyBhXQ1X0UcKDmQKtknz_sAA="
              }
            />
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
