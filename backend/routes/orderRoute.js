import express from "express";
import Order from "../models/orderModel.js";

const router = express.Router();
// --------------------------------------------
// 0️⃣ Admin: Get ALL orders
// --------------------------------------------
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.json({ success: true, data: orders });
  } catch (err) {
    console.log("Admin Order Fetch Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// --------------------------------------------
// 1️⃣ Get all orders for a specific user
// --------------------------------------------
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({
      createdAt: -1,
    });

    res.json({ success: true, data: orders });
  } catch (err) {
    console.log("Order Fetch Error:", err);
    res.json({ success: false, data: [] });
  }
});

// --------------------------------------------
// 2️⃣ Get a single order by ID (for Success Page)
// --------------------------------------------
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, order });
  } catch (err) {
    console.log("Order Fetch Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
// --------------------------------------------
// 3️⃣ Update order status (ADMIN)
// --------------------------------------------
router.put("/status/:orderId", async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { orderStatus: status },
      { new: true }
    );

    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Status updated", order });
  } catch (err) {
    console.log("Order Status Update Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

