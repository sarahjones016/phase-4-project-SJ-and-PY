import React from "react";
import "./Search.css";

function Search({onSearch, searchInput}) {


  return (
    <div className="searchbar">
      <label htmlFor="search">Search Wines: </label>
      <input
        className='bar'
        value={searchInput}
        type="text"
        id="search"
        placeholder="    Type a name to search..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default Search;
