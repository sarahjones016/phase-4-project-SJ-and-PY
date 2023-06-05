import React, { useEffect, useState } from "react";
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './Home.js'
import ProductGrid from './ProductGrid'
import Login from './Login'
import ProductDetails from './ProductDetails'
import Cart from './Cart'

function App() {
  return (
    <div>
      <header className="header">
        <nav>
          <ul className="nav-bar">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='products'>Wines</Link></li>
            <li><Link to='cart'>Cart</Link></li>
            <li><Link to='login'>Login</Link></li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<ProductGrid />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/products/:id' element={<ProductDetails />} ></Route>
        <Route path='/cart' element ={<Cart />}></Route>
      </Routes>

    </div> 
  )
}

export default App;
