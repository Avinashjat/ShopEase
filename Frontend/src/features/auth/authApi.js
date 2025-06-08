import axios from "axios";

const BASE_URL = "http://localhost:5000/api/users";

 const sendOtpAPI = async (mobile) => {
  return axios.post(`${BASE_URL}/send-otp`, { mobile });
};

 const verifyOtpAPI = async ({ mobile, otp }) => {
  return axios.post(`${BASE_URL}/verify-otp`, { mobile, otp });
};

const completeProfileAPI = async ({ userId, name, email, profilePhoto }) => {
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("name", name);
  formData.append("email", email);
  formData.append("profilePhoto", profilePhoto); // multer field name

  // Ensure token is passed if available, though backend uses authMiddleware
  // For update, we rely on authMiddleware. We just need to ensure the client-side
  // has a token to fetch the profile later.
  return axios.post(`${BASE_URL}/complete-profile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`, // Good practice to include this
    },
  });
};

// NEW API CALL: Fetch user profile
 const getProfileAPI = async (token) => {
  return axios.get(`${BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  sendOtpAPI,
  verifyOtpAPI,
  completeProfileAPI,
  getProfileAPI
}