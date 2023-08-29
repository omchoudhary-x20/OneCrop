import React from "react";
import "./ProductCard.css";
import ImageDisplay from "../../ThreeDimensionalBuilding/ImageLoader"
const ProductCard = ({ CropImage, CropDisease }) => {
  return (
    <div>
      <div className="ProductMainCard">
        <div className="ProductDetailsSection">
          <div className="ProductCardTitle">{CropDisease}</div>
          <div className="ProductCardImage">
            <ImageDisplay
              imgpath=
              {CropImage}
            />
            {/* <img
              src={CropImage}
              style={{ width: "180px", height: "180px" }}
              alt="cropimage"
            /> */}
          </div>
          <button className="button-91" style={{ margin: "20px 20px" }}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
