import React, { useEffect, useState, useMemo } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./Home.js";
import ProductGrid from "./ProductGrid";
import Login from "./Login";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import Header from "./Header";
import SignUp from "./Signup";
import Sort from "./Sort";
import Checkout from "./Checkout";

function App() {
  const [user, setUser] = useState(null);

  const [session, setSession] = useState(null)
  const [wines, setWines] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [wineSort, setWineSort] = useState();
  const [sortType, setSortType] = useState("default");
  const navigate = useNavigate();

  // const [cartItems, setCartItems] = useState([])
  // const [deleteItems, setDeleteItems] = useState([])

  useEffect(() => {
    fetch("/products") // localhost works here too!
      .then((r) => r.json())
      .then(setWines);
  }, []);

  useEffect(() => {
    fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);
  function handleLogin(user) {
    setUser(user)
    navigate("/")
  }
  
  useEffect(() => {
    fetch("/products") // localhost works here too!
      .then((r) => r.json())
      .then(setWines);
  }, []);
  function handleLogout() {
    setUser(null);
  }
  // const sortedWines= useMemo(() => {
  //   let result = wines

  //   if (sortType === "descending") {
  //     result = [...wines].sort((a, b) => {
  //       return b.name.localeCompare(a.name);
  //     });
  //   } else if (sortType === "ascending") {
  //     result = [...wines].sort((a, b) => {
  //       return a.name.localeCompare(b.name);
  //     });
  //   }
  // }, [wines, sortType])
  function onSearch(input) {
    console.log(input);
    setSearchInput(input);
  }
  const filteredWines = wines.filter((wine) => {
    var wineNames = wine.name.toLowerCase().includes(searchInput.toLowerCase());

    return wineNames;
  });

  const wineAscending = [...wines].sort((a, b) => (a.name > b.name ? 1 : -1));
  const wineDescending = [...wines].sort((b, a) => (b.name > a.name ? 1 : -1));

  const winePriceAscending = [...wines].sort((a, b) =>
    b.price > a.price ? 1 : -1
  );
  const winePriceDescending = [...wines].sort((a, b) =>
    a.price > b.price ? 1 : -1
  );
  const bestSelling = [...wines].sort((a, b) =>
    a.units_sold > b.units_sold ? 1 : -1
  );
  const defaultSort = [...wines].sort((a, b) => (a.id > b.id ? 1 : -1));
  function handleSortType(sort){
    if (sort === "ascending alphabetical"){
      setSortType(wineAscending)
    } else if (sort === "descending alphabetical"){
      setSortType(wineDescending)
    }
    
  }

  console.log(defaultSort);
  
    // function handleCartItems(cartitem) {
  //   console.log("handle cart items function has run")
  //   console.log(cartitem)

  //   // const filteredCartItems = wines.filter((item) => item.id === wine.product.id)
    
  //   // console.log(filteredCartItems)
  //   // console.log(wine)
  //   // console.log(wines)

  //   setCartItems([...cartItems, cartitem]);
  // }

  return (
    <div className="App">
      <div>
        <Header user={user} onLogout={handleLogout} />
        {/* <Search searchInput={searchInput} onSearch={onSearch}/> */}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/products"
            element={
              <ProductGrid
                searchInput={searchInput}
                onSearch={onSearch}
                wines={filteredWines}
                user={user}
                session={session}
              />
            }
          ></Route>
          {user ? null : 
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} user={user} />}
          ></Route>}
          {user ? null : <Route
            path="/create-account"
            element={<SignUp user={user} onLogin={handleLogin} setSession={setSession} />}
          ></Route>}
          <Route
            path="/products/:id"
            element={<ProductDetails session={session} />}
          ></Route>
          <Route path="/cart" element={<Cart user={user} session={session} />}></Route>
          <Route path='/checkout' element={<Checkout />}></Route>
        </Routes>
      </div>

    </div>
  );
}

export default App;
