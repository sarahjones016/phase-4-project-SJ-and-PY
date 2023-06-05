import React, { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home.js'
import ProductGrid from './ProductGrid'
import Login from './Login'
import ProductDetails from './ProductDetails'
import Cart from './Cart'
import Header from './Header'

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  function handleLogin(user) {
    setUser(user);
  }

  function handleLogout() {
    setUser(null);
  }

  return (
    <div className="App">
      <div>
      <Header user={user} onLogout={handleLogout}/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<ProductGrid />}></Route>
        <Route path='/account' element={<Login onLogin={handleLogin} user={user}/>}></Route>
        <Route path='/products/:id' element={<ProductDetails />} ></Route>
        <Route path='/cart' element ={<Cart />}></Route>
      </Routes>
      </div> 
    </div>
  );
}

export default App;
