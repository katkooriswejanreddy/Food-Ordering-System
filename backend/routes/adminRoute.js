import express from "express";
import Order from "../models/orderModel.js";

const router = express.Router();

// ---------------------------------------------------
// 1️⃣ ADMIN – Get ALL Orders
// ---------------------------------------------------
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.log("Admin Orders Fetch Error:", err);
    res.json({ success: false, orders: [] });
  }
});

// ---------------------------------------------------
// 2️⃣ ADMIN – Mark Order as PAID
// ---------------------------------------------------
router.put("/orders/:id/mark-paid", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order)
      return res.json({ success: false, message: "Order not found" });

    order.paymentStatus = "paid";
    await order.save();

    res.json({ success: true, message: "Payment marked as PAID" });
  } catch (err) {
    console.log("Mark Paid Error:", err);
    res.json({ success: false, error: err.message });
  }
});

// ---------------------------------------------------
// 3️⃣ ADMIN – Update Order Status (processing → preparing → delivered)
// ---------------------------------------------------
router.put("/orders/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order)
      return res.json({ success: false, message: "Order not found" });

    order.orderStatus = status;
    await order.save();

    res.json({ success: true, message: "Order status updated" });
  } catch (err) {
    console.log("Update Status Error:", err);
    res.json({ success: false, error: err.message });
  }
});

export default router;
