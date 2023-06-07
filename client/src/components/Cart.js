import React from 'react'
import './Cart.css';
// import ProductCard from './ProductCard';

function Cart({cartItems}) {

  const renderMyCart = cartItems.map((cartitem) => {
    return (
         <div className='cart-card' key={cartitem.id}>
          <div className="cart-card-detail">
            <img alt={cartitem.product.name} src={cartitem.product.image_url}></img>
          </div>
          <h3>{cartitem.product.name}</h3>
          <p>${cartitem.product.price}</p>
          <p>{cartitem.product.units} units in stock</p>
          <button>Remove From Cart</button>
        </div>
    )
    
  })
  console.log(cartItems)

  return (
    <div>
        <h1>Cart</h1>
        <p>Total: $</p>
        <div className='cart-grid'>
          {renderMyCart}
        </div>
    </div>
  )
}

export default Cart