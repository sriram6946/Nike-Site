import { useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import HeroSection from "./components/Hero";
import ContactUs from "./components/ContactUS";
import { Route, Routes } from "react-router-dom";
import AboutPage from "./components/About";
import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";
import Shop from "./components/shop.jsx"
import AllProducts from "./components/AllProducts.jsx";
import Cart from "./pages/Cart.jsx";


const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element = {<HeroSection/>}/>
        <Route path="/ContactUs" element = {<ContactUs/>}/>
        <Route path ="/About" element = {<AboutPage/>}/>
        <Route path ="/Login" element = {<LoginPage/>}/>
        <Route path ="/register" element = {<RegisterPage/>}/>
        <Route path="/shop/:gender/:category" element={<Shop />} />
        <Route path="/shop" element={<AllProducts />} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </>
  );
};

export default App;
