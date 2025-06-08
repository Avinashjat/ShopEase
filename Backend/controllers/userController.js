


import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateOTP } from "../utils/otpUtils.js";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../utils/cloudnary.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';


// SEND OTP
const sendOtp = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({ success: false, message: "Invalid or missing mobile number" });
    }

    const { otp, expiresAt } = generateOTP();
    const hashedOtp = await bcrypt.hash(otp, 10);

    let user = await User.findOne({ mobile });

    if (!user) {
      user = new User({ mobile, otp: { code: hashedOtp, expiresAt } });
    } else {
      user.otp = { code: hashedOtp, expiresAt };
    }

    await user.save();

    // TODO: Integrate real SMS provider here
    console.log(`OTP for ${mobile}: ${otp}`);

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// VERIFY OTP
const verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) {
      return res.status(400).json({ success: false, message: "Mobile and OTP are required" });
    }

    const user = await User.findOne({ mobile });

    if (!user || !user.otp?.code) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    const isValidOtp = await bcrypt.compare(otp, user.otp.code);
    const isExpired = user.otp.expiresAt < new Date();

    if (!isValidOtp) {
      return res.status(400).json({ success: false, message: "Incorrect OTP" });
    }

    if (isExpired) {
      return res.status(400).json({ success: false, message: "OTP has expired" });
    }

    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    const token = generateToken(user._id);

    if (user.name && user.email && user.profilePhoto) {
      return res.status(200).json({
        success: true,
        message: "OTP verified successfully",
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          profilePhoto: user.profilePhoto,
        },
      });
    }

    // New or incomplete profile
    return res.status(200).json({
      success: true,
      message: "OTP verified. Please complete your profile.",
      token,
      userId: user._id,
      nextStep: "completeProfile",
    });
  } catch (error) {
    console.error("Verify OTP Error:", error.message);
    res.status(500).json({ success: false, message: "OTP verification failed" });
  }
};

// COMPLETE PROFILE
const completeProfile = async (req, res) => {
  try {
    const { userId, name, email } = req.body; // ✅ Extract userId, name, email

    if (!userId || !name || !email || !req.file) {
      return res.status(400).json({ success: false, message: "All fields including profile photo are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid userId" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Upload image to Cloudinary using buffer
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image", folder: "user_profiles" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(fileBuffer);
      });
    };

    const uploadedImage = await streamUpload(req.file.buffer);

    user.name = name;
    user.email = email;
    user.profilePhoto = uploadedImage.secure_url;

    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Profile completed successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        profilePhoto: user.profilePhoto,
      },
      token,
    });

  } catch (error) {
    console.error("Complete Profile Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to complete profile: " + error.message });
  }
};



const getProfile = async (req, res) => {
  try {
   
    const user = req.user; 

    if (!user) {
      
      return res.status(404).json({ message: 'User not found in request (authMiddleware issue)' });
    }

    // Send user profile data
    res.json({
      _id: user._id, 
      name: user.name,
      email: user.email,
      mobile: user.mobile, 
      profilePhoto: user.profilePhoto,
      
    });

  } catch (error) {
    console.error('Get Profile Error:', error);

    res.status(500).json({ message: 'Server error fetching profile data' });
  }
};
export { sendOtp, verifyOtp, completeProfile , getProfile };
