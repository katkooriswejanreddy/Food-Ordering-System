import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// -----------------------------
// SIGNUP
// -----------------------------
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.json({ success: false, message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token, user });
  } catch (err) {
    console.log("Signup Error:", err);
    res.json({ success: false, message: "Signup failed" });
  }
});

// -----------------------------
// LOGIN
// -----------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ success: false, message: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token, user });
  } catch (err) {
    console.log("Login Error:", err);
    res.json({ success: false, message: "Login failed" });
  }
});

// -----------------------------
// GET USER PROFILE
// -----------------------------
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, message: "Could not fetch user" });
  }
});

// -----------------------------
// UPDATE PROFILE
// -----------------------------
router.put("/:id", async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone, address },
      { new: true }
    ).select("-password");

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.json({ success: false, message: "Profile update failed" });
  }
});

export default router;
