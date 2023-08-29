import React from "react";
import Navbar from "../../shared/NavBar/Navbar";
import ProductCard from "../../shared/Cards/ProductCard/ProductCard";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import Picture1 from "../../assets/Picture1.jpg"
import "./ShoppingPage.css";
import Picture2 from "../../assets/Picture2.jpg"
import Picture3 from "../../assets/Picture3.jpg"
import Picture4 from "../../assets/Picture4.jpg"
import Picture5 from "../../assets/Picture5.jpg"
const ProductPage = () => {
  const history = useHistory();

  function navigateToRoute(route) {
    history.push(route);
  }

  return (
    <div>
      <Navbar />
      <div className="ProductHeading">
        <h1>
          <span>FAR</span> MER <span>SHOPS</span>
        </h1>
        <h4>
          Buy Crops,<span> Seeds, </span> Vegetables
          <span> at reasonable prices</span>
        </h4>
      </div>
      <div className="titleDisplay">
        <Grid container rowSpacing={5} columnSpacing={10}>
          <Grid item xs={3}>
            <div style={{ margin: "0px -50px" }}>
              <ProductCard
                CropImage={Picture1}
                CropDisease="Urea"
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div style={{ margin: "0px -50px" }}>
              <ProductCard
                CropImage={Picture4}
                CropDisease="Potassium Fertilizer"
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div style={{ margin: "0px -50px" }}>
              <ProductCard
                CropImage={Picture2}
                CropDisease="Calcium Fertilizer"
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div style={{ margin: "0px -50px" }}>
              <ProductCard
                CropImage={Picture3}
                CropDisease="Potassium Nitrate"
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div style={{ margin: "0px -50px" }}>
              <ProductCard
                CropImage={Picture5}
                CropDisease="Ammonium Sulphate"
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div style={{ margin: "0px -50px" }}>
              <ProductCard
                CropImage={Picture1}
                CropDisease="Urea"
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div style={{ margin: "0px -50px" }}>
              <ProductCard
                CropImage={Picture4}
                CropDisease="Potassium Fertilizer"
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div style={{ margin: "0px -50px" }}>
              <ProductCard
                CropImage={Picture2}
                CropDisease="Calcium Fertilizer"
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div style={{ margin: "0px -50px" }}>
              <ProductCard
                CropImage={Picture3}
                CropDisease="Potassium Nitrate"
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div style={{ margin: "0px -50px" }}>
              <ProductCard
                CropImage={Picture5}
                CropDisease="Ammonium Sulphate"
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ProductPage;
