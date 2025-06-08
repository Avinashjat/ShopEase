import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, getProfile } from "../features/auth/authSlice"; // Import getProfile thunk
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth); // Get user from state

  // Fetch user profile on component mount if token exists but user data is missing
  useEffect(() => {
    if (token && !user) {
      dispatch(getProfile());
    }
  }, [token, user, dispatch]); // Depend on token and user state

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setIsOpen(false);
  };

  const defaultAvatar = "/default-avatar.png"; // Make sure you have this image in your public folder

  return (
    <nav className="bg-white fixed top-0 left-0 right-0 shadow-md z-50 px-6 py-3 font-sans text-gray-800">
      <div className="flex items-center justify-between relative md:justify-start md:space-x-8">
        {/* Hamburger menu (mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden z-50"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-blue-600 absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none"
        >
          ShopEase
        </Link>

        {/* Navigation links */}
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex md:flex-grow md:justify-center md:items-center md:static absolute top-16 left-0 w-full md:w-auto bg-white md:bg-transparent px-6 md:px-0 py-4 md:py-0 gap-4 flex-col md:flex-row`}
        >
          {["/", "/my-cart", "/all-products"].map((path, i) => {
            const label =
              path === "/"
                ? "Home"
                : path === "/my-cart"
                ? "Cart"
                : "All Products";
            return (
              <Link
                key={i}
                to={path}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 text-center hover:text-blue-600 transition"
              >
                {label}
              </Link>
            );
          })}

          {/* Logout button in mobile menu */}
          {token && (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 md:hidden transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Desktop logout and profile */}
        {token ? (
          <div className="hidden md:flex items-center space-x-4 ml-auto">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
            <Link
              to="/profile"
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500"
              onClick={() => setIsOpen(false)}
            >
              <img
                src={user?.profilePhoto || defaultAvatar}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hidden md:block bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 ml-auto transition"
          >
            Login
          </button>
        )}

        {/* Mobile login button */}
        {!token && (
          <button
            onClick={() => navigate("/login")}
            className="ml-auto md:hidden bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        )}

        {/* Mobile profile button */}
        {token && (
          <Link
            to="/profile"
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 ml-auto md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <img
              src={user?.profilePhoto || defaultAvatar}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;