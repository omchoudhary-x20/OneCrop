import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlask,
  faSeedling,
  faMicroscope,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useAccount, useDisconnect } from "wagmi";
import { useHistory } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/logo.png";
const Navbar = () => {
  const history = useHistory();

  function navigateToRoute(route) {
    history.push(route);
  }

  const { address, isConnected } = useAccount({
    onConnect: ({ address, isReconnected }) => {
      if (!isReconnected) {
        alert("Wallet has been connected. " + address);
      }
    },
  });

  const { disconnect } = useDisconnect();
  const disconnectElement = () => {
    if (isConnected) {
      return (
        <button className="button1" onClick={() => disconnect()}>
          Disconnect
        </button>
      );
    }
  };

  return (
    <div className="NavBar">
      <div className="navTitles">
        <img src={Logo} alt="Logo" width="105px" height="65px"></img>

        <div
          className="headingText"
          onClick={() => navigateToRoute("/")}
        >
          Home
        </div>

        <div
          className="headingText"
          onClick={() => navigateToRoute("/FertilizerPage")}
        >
          <FontAwesomeIcon icon={faFlask} className="navIcon" />
          Fertilizer Prediction
        </div>
        <div
          className="headingText"
          onClick={() => navigateToRoute("/CropDiseasePredictionPage")}
        >
          <FontAwesomeIcon icon={faMicroscope} className="navIcon" />
          Crop Disease Prediction
        </div>
        <div
          className="headingText"
          onClick={() => navigateToRoute("/CropYieldPredictionPage")}
        >
          <FontAwesomeIcon icon={faFlask} className="navIcon" />
          Crop Yield Prediction
        </div>
        <div
          className="headingText"
          onClick={() => navigateToRoute("/ShoppingPage")}
        >
          <FontAwesomeIcon icon={faShoppingCart} className="navIcon" />
          Shop
        </div>
      </div>
      <div className="rainbow">

      </div>
    </div>
  );
};

export default Navbar;
