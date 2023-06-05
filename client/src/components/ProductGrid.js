import React, {useState, useEffect} from 'react'
import './ProductGrid.css';
import ProductCard from './ProductCard'

function ProductGrid() {

  const [wines, setWines] = useState([]);

  useEffect(() => {
    fetch("/products") // localhost works here too!
      .then((r) => r.json())
      .then(setWines);
  }, []);

  return (
    <div>
        <h1>ProductGrid</h1>
        <div className='product-grid'>
            {wines.map((wine) => {
                return <ProductCard wine={wine} key={wine.name} />
            })}
        </div>
    </div>
    
    
  )
}

export default ProductGrid