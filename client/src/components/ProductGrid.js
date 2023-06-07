
import React, { useState, useEffect } from "react";
import "./ProductGrid.css";
import ProductCard from "./ProductCard";
import Search from "./Search";
import Sort from "./Sort";

function ProductGrid({ user, session, wines, searchInput, onSearch,  }) {
  // const [sortState, setSortState] = useState("none");
  // const [wines, setWines] = useState([]);
  const [sortValue, setSortValue] = useState("");


  // useEffect(() => {
  //   fetch("/products") // localhost works here too!
  //     .then((r) => r.json())
  //     .then(setWines);
  // }, []);


  //sort function sort by alphabetical, by price, and by amount sold

  // const sortMethods = {
  //   none: {method: (a,b) => null},
  //   ascending: {method: undefined },
  //   descending: {method: (a, b) => (a > b ? -1 :1)}
  // }
  console.log(sortValue)
  return (
    <div>

      <Search searchInput={searchInput} onSearch={onSearch} />
      <Sort setSortValue={setSortValue}/>
      <div className="product-grid">
        {[...wines]
          .sort((a, b) => (eval(sortValue) ? 1 : -1))
          .map((wine) => {
            return (
              <ProductCard
                wine={wine}
                key={wine.name}
                user={user}
                session={session}
              />
            );
          })}
      </div>

    </div>
  );
}

export default ProductGrid;
