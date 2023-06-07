import React from 'react'
import './ProductGrid.css';
import ProductCard from './ProductCard'

function ProductGrid({user, session, wines}) {

  return (
    <div>
        <div className='product-grid'>
            {wines.map((wine) => {
                return <ProductCard wine={wine} key={wine.name} user={user} session={session} />
            })}
        </div>
    </div>
    
    
  )
}

export default ProductGrid