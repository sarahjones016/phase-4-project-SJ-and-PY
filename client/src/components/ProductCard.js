import React from "react";
import "./ProductCard.css";
// import ProductDetails from "./ProductDetails";
import { useNavigate } from "react-router-dom";

function ProductCard({ wine }) {
  const navigate = useNavigate();
  function handleCardClick() {
    console.log(wine.id)
    navigate(`/products/${wine.name}`, {state: wine})
  }

  return (
    <div>
      <div className="wine-card">
        <div className="wine-card-detail">
          <img
            src={wine.image_url}
            alt={wine.name}
            onClick={handleCardClick}
          />

          <h3>{wine.name}</h3>
          <p>${wine.price}</p>
          <button>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
