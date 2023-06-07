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
  const [cartItems, setCartItems] = useState([])

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

    fetch("/shopping_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        user_id: user.id,
      }),
    })
      .then((r) => r.json())
      .then((session) => setSession(session));
  }

  function handleLogout() {
    setUser(null)
  }

  function handleCartItems(id) {
    console.log("handle cart items function has run")

    // const filteredCartItems = wines.filter((wine) => wine.id === id)

    // console.log(filteredCartItems)

    // setCartItems([...cartItems, filteredCartItems]);

    // console.log(cartItems)

  }

  return (
    <div className="App">
      <div>
      <Header user={user} onLogout={handleLogout}/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<ProductGrid user={user} session={session} wines={wines} handleCartItems={handleCartItems}/>}></Route>
        <Route path='/login' element={<Login onLogin={handleLogin} user={user}/>}></Route>
        <Route path='/create-account' element={<SignUp user={user} onLogin={handleLogin} />}></Route>
        <Route path='/products/:id' element={<ProductDetails session={session} handleCartItems={handleCartItems}/>} ></Route>
        <Route path='/cart' element ={<Cart cartItems={cartItems} />}></Route>
      </Routes>
      </div> 
    </div>
  );
}

export default App;
