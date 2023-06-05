import React, { useState } from "react";
import "./ProductDetails.css";
import { useLocation } from "react-router-dom";
function ProductDetails() {

  // const [cart, setCart] = useState();
  const location = useLocation()
  const state = location.state

  const handleAddToCart = () => {};
  return (
    <div>
      <h1>Product Details</h1>
      <div className="product-detail">
        <img src={state.image_url} alt={state.name} className="product-detail-img"/>
        <h3 className="product-detail-name">{state.name}</h3>
        <p className="product-detail-description">{state.description}</p>
        <p className="product-detail-price" >${state.price}</p>
        <button className="product-detail-button" onClick={handleAddToCart}>Add To Cart</button>
      </div>
    </div>
  );
}

export default ProductDetails;
