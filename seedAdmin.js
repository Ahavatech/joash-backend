import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt"; // or bcryptjs
import Admin from "./models/Admin.js";

dotenv.config();

const mongoUri = process.env.MONGO_URI;

const seedAdmin = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri);

    const existingAdmin = await Admin.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("Admin already exists ✅");
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash("securepassword123", 10);

    const admin = new Admin({
      username: "joashAdmin",            // ✅ required field
      password: hashedPassword,
    });

    await admin.save();
    console.log("✅ Admin created successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding admin:", err);
    process.exit(1);
  }
};

seedAdmin();
