import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HeroSection from "./components/Hero";
import Login from "./components/Login";
import Cart from "./pages/Cart";
import About from "./components/About";
import ContactUs from "./components/ContactUS";
import "./App.css";
import Shop from "./components/shop";
import AllProducts from "./components/AllProducts";
import RegisterPage from "./components/Register";
import ProductDetails from "./components/ProductDetails";
import Checkout from "./components/Checkoout";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <Navigation user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/shop" element={<AllProducts />} />
        <Route path="/shop/:gender/:category" element={<Shop />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
};

export default App;
