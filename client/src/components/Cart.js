import React, { useState, useEffect } from "react";
import "./Cart.css";
import { Link } from 'react-router-dom';
// import ProductCard from './ProductCard';

function Cart({ user }) {
  // console.log(session)

  // const [shoppingSession, setShoppingSession] = useState(session.id)

  const [cartItems, setCartItems] = useState([]);
  // const [deletedItems, setDeletedItems] = useState([])

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
  
  function onCartDelete(id) {
    const filteredAndDeletedItens = filteredCartItems.filter((item) => {
      return item.id !== id
    })
    setCartItems(filteredAndDeletedItens);
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
        <h3 className="cart-card-name" >{cartitem?.product?.name}</h3>
        <p className="cart-card-price" >${cartitem?.product?.price}</p>
        <p></p>
        <p className="cart-card-units" >{cartitem?.product?.units} units in stock</p>
        <button className="cart-delete-button" onClick={() => 
        fetch(`/cart_items/${cartitem.id}`, { 
          method: "DELETE" 
        })
          .then((res) => console.log(res))
          .then(() => onCartDelete(cartitem.id))
        }>Remove From Cart</button>
      </div>
    );
  });
 
  function onCheckoutClick() {
    console.log("checkout click")

    fetch(`/shopping_sessions/${localStorage.getItem("shopping_session")}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({purchased: true})
    })
    // .then((res) => res.json())
    .then((data) => console.log(data))
  }

  return (
    <div className='cart-grid-holder'>
        <h1 className="cart-h1">Cart</h1>
        <p className="cart-price">Total: ${totalprice.toFixed(2)}</p>
        <button className="checkout-button" onClick={onCheckoutClick}><Link to='/checkout'>Checkout</Link></button>
        <div className='cart-grid'>
          {renderMyCart}
        </div>
    </div>
  );
}

export default Cart;
