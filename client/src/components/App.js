import React, { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home.js'
import ProductGrid from './ProductGrid'
import Login from './Login'
import ProductDetails from './ProductDetails'
import Cart from './Cart'
import Header from './Header'
import SignUp from './Signup';



function App() {

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null)
  const [wines, setWines] = useState([]);
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
  }

  function handleLogout() {
    setUser(null)
  }

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
      <Header user={user} onLogout={handleLogout}/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<ProductGrid user={user} session={session} wines={wines} />}></Route>
        <Route path='/login' element={<Login onLogin={handleLogin} user={user}/>}></Route>
        <Route path='/create-account' element={<SignUp user={user} onLogin={handleLogin} setSession={setSession}/>}></Route>
        <Route path='/products/:id' element={<ProductDetails session={session} />} ></Route>
        <Route path='/cart' element ={<Cart user={user} session={session}/>}></Route>
      </Routes>
      </div> 
    </div>
  );
}

export default App;
