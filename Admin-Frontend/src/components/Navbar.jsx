import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    setToken(adminToken);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogin = () => {
    navigate("/admin/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center relative">
          <div className="text-xl font-bold text-blue-600">Admin</div>

          {/* Center Menu (Desktop) */}
          <div className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            {token && (
              <Link to="/add-product" className="text-gray-600 hover:text-blue-600">Add Product</Link>
            )}
          </div>

          {/* Right Button */}
          <div className="hidden md:flex gap-4 items-center">
            {!token ? (
              <button
                onClick={handleLogin}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Login
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-2 shadow-md">
          <Link to="/" className="block text-gray-700 hover:text-blue-600">Home</Link>
          {token && (
            <Link to="/add-product" className="block text-gray-700 hover:text-blue-600">Add Product</Link>
          )}
          {!token ? (
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
