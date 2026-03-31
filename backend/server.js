// --------------------------------------
//  Foodiesam Backend – server.js
// --------------------------------------

// ❗ Load ENV FIRST (must be the very first lines)
import dotenv from "dotenv";
dotenv.config();

// Debug check AFTER dotenv loads
console.log("🔥 STRIPE SECRET LOADED:", process.env.STRIPE_SECRET_KEY);

import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import Stripe from "stripe";

// Routers
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import adminRouter from "./routes/adminRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// -------------------------------
//  STRIPE INIT
// -------------------------------
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// -------------------------------
//  MIDDLEWARE
// -------------------------------
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5177",
    ],
    credentials: true,
  })
);

app.use(express.json());

// -------------------------------
//  DATABASE CONNECTION
// -------------------------------
connectDB();

// -------------------------------
//  STATIC ASSETS
// -------------------------------
app.use("/uploads", express.static("uploads"));

// -------------------------------
//  PAYMENT ROUTES (before others)
// -------------------------------
app.use("/api/payment", paymentRouter);

// -------------------------------
//  OTHER API ROUTES
// -------------------------------
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);


// -------------------------------
//  DEFAULT ROOT ROUTE
// -------------------------------
app.get("/", (req, res) => {
  res.send("✅ Foodiesam Backend API is running successfully!");
});

// -------------------------------
//  START SERVER
// -------------------------------
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

// -------------------------------
//  CLEAN EXIT
// -------------------------------
process.on("SIGINT", () => {
  console.log("\n🛑 Server shutting down...");
  process.exit();
});
