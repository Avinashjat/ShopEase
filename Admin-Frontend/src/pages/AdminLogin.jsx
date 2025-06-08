import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });
      localStorage.setItem("adminToken", res.data.Atoken);
      navigate("/add-product");
      window.location.reload();
    } catch (err) {
      setError("Invalid credentials");
      console.error(err);
    }
  };

  return (
    <>
      {!token && (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <form
            onSubmit={handleLogin}
            className="bg-white p-8 rounded shadow-md w-full max-w-sm mt-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
              Admin Login
            </h2>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-6 px-4 py-2 border rounded focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AdminLogin;
