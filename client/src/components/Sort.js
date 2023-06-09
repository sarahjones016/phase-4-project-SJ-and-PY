import React, { useState } from "react";
import "./Sort.css";

function Sort({ setSortValue }) {
  return (
    <div className='sortbar'>
      <label>Sort Wines: </label>
      <select 
      className="select"
      defaultValue={"DEFAULT"}
      onChange={(e) => setSortValue(e.target.value)}
    >
      <option value="a.id > b.id">
        Bestselling
      </option>
      <option value="a.name > b.name">Alphabetical Ascending</option>
      <option value="b.name > a.name">Alphabetical Descending</option>
      <option value="a.price > b.price">Price Ascending</option>
      <option value="b.price > a.price">Price Descending</option>
      {/* <option value="b.best_selling > a.best_selling">Bestselling</option> */}
    </select>
    </div>
    
  );
}
export default Sort;
