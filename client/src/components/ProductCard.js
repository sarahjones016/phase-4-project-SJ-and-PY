import React from "react";
import "./ProductCard.css";
// import ProductDetails from "./ProductDetails";
import { useNavigate } from "react-router-dom";

function ProductCard({ wine, session, handleCartItems }) {
  // const [itemInCart, setItemInCart] = useState(false)

  const navigate = useNavigate();
  function handleCardClick() {
    console.log(wine)
    navigate(`/products/${wine.id}`, {state: wine})
  }

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
        product_id: wine.id
      })
    })
    .then(resp => resp.json())
    .then(data => handleCartItems(data))
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
          <button onClick={handleAddToCartClick}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
