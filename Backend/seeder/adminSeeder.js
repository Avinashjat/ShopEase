import connectDB from './config/mongoDb.js';
import dotenv from "dotenv";
import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs";

dotenv.config();

connectDB(); 

const seedAdmin = async () => {
  await connectDB();

  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  const existingAdmin = await Admin.findOne({ email: adminEmail });

  if (existingAdmin) {
    console.log("Admin already exists");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = new Admin({
    email: adminEmail,
    password: hashedPassword,
  });

  await admin.save();

  console.log("Admin created:", adminEmail);
  process.exit(0);
};

seedAdmin();
