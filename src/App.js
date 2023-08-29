import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import FertilizerPredictionPage from "./pages/FertilizerPredictionPage/FertilizerPredictionPage";
import CropDiseasePredictionPage from "./pages/CropDiseasePredictionPage/CropDiseasePredictionPage";
import CropYieldPredictionPage from "./pages/CropYieldPredictionPage/CropYieldPredictionPage";
import ShoppingPage from "./pages/ShoppingPage/ShoppingPage";
import NoPageFound from "./pages/NoPageFound";

function App() {
  return (
    <div>
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              path="/FertilizerPage"
              component={FertilizerPredictionPage}
            />
            <Route
              path="/CropDiseasePredictionPage"
              component={CropDiseasePredictionPage}
            />
            <Route
              path="/CropYieldPredictionPage"
              component={CropYieldPredictionPage}
            />
            <Route path="/ShoppingPage" component={ShoppingPage} />
            <Route component={NoPageFound} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
