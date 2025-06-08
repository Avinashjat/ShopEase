import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "./features/auth/authSlice"; // Import getProfile thunk

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";
import Product from "./Pages/Product";
import Profile from "./Pages/Profile";
import Cart from "./Pages/Cart";
import Footer from "./Components/Footer";
import Contact from "./Pages/Contact";
import About from "./Pages/About";

const App = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  // Dispatch getProfile on initial load if token exists but user data is not in Redux
  useEffect(() => {
    if (token && !user) {
      dispatch(getProfile());
    }
  }, [token, user, dispatch]);

  return (
    <Router>
      <Navbar />
      <div className="pt-16 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-cart" element={<Cart />} />
          <Route path="/all-products" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;