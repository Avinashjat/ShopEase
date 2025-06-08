import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, quantity, onQuantityChange }) => {
  const navigate = useNavigate();

  const increment = () => onQuantityChange(product._id, (quantity || 0) + 1);
  const decrement = () => {
    if (quantity > 1) {
      onQuantityChange(product._id, quantity - 1);
    } else {
      onQuantityChange(product._id, 0); // remove from cart UI
    }
  };
  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-all p-4 flex flex-col">
      <div className="w-full h-96 overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="mt-3 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-green-600 font-bold text-base mt-1">
          ₹{product.price}
        </p>
        <p className="text-sm text-gray-600 mt-1 flex-grow">
          {product.description?.slice(0, 60)}...
        </p>

        {quantity === 0 || !quantity ? (
          <button
            onClick={increment}
            className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full py-2 px-6 shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 ease-in-out select-none"
          >
            Add to Cart
          </button>
        ) : (
          <div className="mt-4 flex items-center justify-between space-x-4">
            {/* Left side: Increment & Decrement */}
            <div className="flex items-center space-x-3 font-semibold text-gray-900">
              <button
                onClick={decrement}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                aria-label="Decrease quantity"
              >
                <span className="text-2xl select-none">−</span>
              </button>
              <span className="min-w-[24px] text-center text-lg">
                {quantity}
              </span>
              <button
                onClick={increment}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200"
                aria-label="Increase quantity"
              >
                <span className="text-2xl select-none">+</span>
              </button>
            </div>

            {/* Right side: Add button */}
            <button
              onClick={goToCart}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-full py-2 px-8 shadow-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 ease-in-out select-none"
              aria-label="Go to cart"
            >
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
