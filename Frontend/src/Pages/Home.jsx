import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import ProductCard from "../Components/ProductCard";

const Home = () => {
  const dispatch = useDispatch();
  const { items: products, status, error } = useSelector((state) => state.products);

  // Cart quantities: { productId: quantity }
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleQuantityChange = (productId, quantity) => {
    setCartItems((prev) => {
      // If quantity is zero, remove from cartItems
      if (quantity === 0) {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      }
      return { ...prev, [productId]: quantity };
    });
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          quantity={cartItems[product._id] || 0}
          onQuantityChange={handleQuantityChange}
        />
      ))}
    </div>
  );
};

export default Home;
