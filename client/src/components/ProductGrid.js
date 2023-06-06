import React, {useState, useEffect} from 'react'
import './ProductGrid.css';
import ProductCard from './ProductCard'

function ProductGrid({user, session}) {

  const [wines, setWines] = useState([]);

  useEffect(() => {
    fetch("/products") // localhost works here too!
      .then((r) => r.json())
      .then(setWines);
  }, []);

  return (
    <div>
        <div className='product-grid'>
            {wines.map((wine) => {
                return <ProductCard wine={wine} key={wine.name} user={user} session={session}/>
            })}
        </div>
    </div>
    
    
  )
}

export default ProductGrid