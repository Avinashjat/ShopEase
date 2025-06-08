import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, verifyOtp } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { step, status, error, token } = useSelector((state) => state.auth);

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (token && step === "authenticated") {
      // If authenticated, go home
      navigate("/");
    }
  }, [token, step, navigate]);

  useEffect(() => {
    if (step === "completeProfile") {
      // If user needs to complete profile, redirect to profile page
      navigate("/profile");
    }
  }, [step, navigate]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    dispatch(sendOtp(mobile));
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    dispatch(verifyOtp({ mobile, otp }));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white shadow-md p-8 rounded w-full max-w-sm">
        {step === "sendOtp" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Enter Mobile Number</h2>
            <form onSubmit={handleSendOtp}>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter 10-digit mobile"
                maxLength={10}
                pattern="[6-9]{1}[0-9]{9}"
                required
                className="w-full px-4 py-2 border rounded mb-4"
              />
              {error && <p className="text-red-600">{error}</p>}
              <button type="submit" disabled={status === "loading"} className="w-full bg-blue-600 text-white py-2 rounded">
                {status === "loading" ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          </>
        )}

        {step === "verifyOtp" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Enter OTP</h2>
            <form onSubmit={handleVerifyOtp}>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                maxLength={6}
                required
                className="w-full px-4 py-2 border rounded mb-4"
              />
              {error && <p className="text-red-600">{error}</p>}
              <button type="submit" disabled={status === "loading"} className="w-full bg-blue-600 text-white py-2 rounded">
                {status === "loading" ? "Verifying OTP..." : "Verify OTP"}
              </button>
            </form>
          </>
        )}

        {/* Optionally, show some message or UI for completeProfile or authenticated state */}
      </div>
    </div>
  );
};

export default Login;
