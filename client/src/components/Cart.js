import React, { useState, useEffect } from "react";
import "./Cart.css";
// import ProductCard from './ProductCard';

function Cart({ user }) {
  // console.log(session)

  // const [shoppingSession, setShoppingSession] = useState(session.id)

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // if (!session){
    //   setShoppingSession(localStorage.getItem("shopping_session").id)
    //   console.log(localStorage.getItem("shopping_session").id)
    // }
    fetch("/cart_items") // localhost works here too!
      .then((r) => r.json())
      .then((data) => setCartItems(data));
  }, []);
  // console.log(cartItems)
  console.log(
    "This is the cart id: ",
    localStorage.getItem("shopping_session")
  );
  const filteredCartItems = cartItems.filter(
    (item) =>
      localStorage.getItem("shopping_session") == item.shopping_session_id
  );

  console.log(filteredCartItems);

  var totalprice = 0;
  const renderprices = filteredCartItems.map((cartitem) => {
    var prices = [cartitem?.product?.price];
    
    totalprice = parseFloat(totalprice) + parseFloat(prices);
    
    console.log(totalprice.toFixed(2));
  });
  
  function handleDelete(cartitem) {
    fetch(`/cart_items/${cartitem}`, { method: "DELETE" })
      .then((r) => r.json())
      .then((data) => console.log(data));
  }
  const renderMyCart = filteredCartItems.map((cartitem) => {
    return (
      <div className="cart-card" key={cartitem?.id}>
        <div className="cart-card-detail">
          <img
            alt={cartitem?.product?.name}
            src={cartitem?.product?.image_url}
          ></img>
        </div>
        <h3>{cartitem?.product?.name}</h3>
        <p>${cartitem?.product?.price}</p>
        <p></p>
        <p>{cartitem?.product?.units} units in stock</p>
        <button onClick={handleDelete(cartitem?.id)}>Remove From Cart</button>
      </div>
    );
  });
  console.log(cartItems);

  return (
    <div>
        <h1>Cart</h1>
        <p>Total: ${totalprice.toFixed(2)}</p>
        <div className='cart-grid'>
          {renderMyCart}
        </div>
    </div>
  );
}

export default Cart;
