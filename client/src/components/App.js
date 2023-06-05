import React, { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home.js'
import ProductGrid from './ProductGrid'
import Login from './Login'
import ProductDetails from './ProductDetails'
import Cart from './Cart'

function App() {
  return (
    <div>
      <h1>App</h1>

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/product-grid' element={<ProductGrid />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/products/:id' element={<ProductDetails />} ></Route>
        <Route path='/cart' element ={<Cart />}></Route>
      </Routes>

    </div> 
  )
}

export default App;
