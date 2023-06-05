import React from 'react'
import './ProductCard.css';

function ProductCard({wine}) {
  return (
    <div>
      <div className='wine-card'>
          <div className='wine-card-detail'>
            <img src={wine.image_url} alt={wine.name} />
            <h3>{wine.name}</h3>
            <p>${wine.price}</p>
            <button>Add To Cart</button>
          </div>
      </div>
    </div>
    
  )
}

export default ProductCard