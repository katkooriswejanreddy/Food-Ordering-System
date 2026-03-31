// backend/routes/paymentRoute.js
import express from "express";
import {
  createCheckoutSession,
  verifyPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

// Create Stripe Checkout session
router.post("/create-checkout-session", createCheckoutSession);

// (Optional) Verify payment endpoint
router.post("/verify", verifyPayment);

export default router;
