import React from "react";
import "./ProductDetails.css";
import { useLocation } from "react-router-dom";

function ProductDetails({session, handleCartItems}) {

  // const [cart, setCart] = useState();
  const location = useLocation()
  const state = location.state

  function handleAddToCartClick() {
    console.log("added to cart")

    // setItemInCart(true)

    fetch("/cart_items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        shopping_session_id: session.id,
        product_id: state.id
      })
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
  }

  return (
    <div>
      <div className="product-detail">
        <img src={state.image_url} alt={state.name} className="product-detail-img"/>
        <h3 className="product-detail-name">{state.name}</h3>
        <p className="product-detail-description">{state.description}</p>
        <p className="product-detail-price">${state.price}</p>
        <button className="product-detail-button" onClick={handleAddToCartClick}>Add To Cart</button>
      </div>
    </div>
  );
}

export default ProductDetails;
