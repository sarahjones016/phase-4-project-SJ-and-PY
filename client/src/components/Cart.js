import React from 'react'
import './Cart.css';
// import ProductCard from './ProductCard';

function Cart({cartItems}) {
  const renderMyCart = cartItems.map((wine) => {
    return <p>{wine.name}</p>
  })

  return (
    <div>
        <h1>Cart</h1>
        <div>
          {renderMyCart}
        </div>
    </div>
  )
}

export default Cart