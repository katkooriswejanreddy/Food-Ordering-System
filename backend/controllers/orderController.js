import Order from "../models/orderModel.js";
import Stripe from "stripe";
import { stripe } from "../server.js";

// 🛒 Place order (but mark as unpaid first)
export const placeOrder = async (req, res) => {
  try {
    const { cartItems, totalAmount, address } = req.body;
    const userId = req.user.id;

    const newOrder = new Order({
      userId,
      items: cartItems,
      amount: totalAmount,
      address,
      paymentStatus: "pending",
      orderStatus: "processing",
    });

    const savedOrder = await newOrder.save();

    res.json({ success: true, orderId: savedOrder._id });
  } catch (err) {
    console.log("Place order error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// 💳 Verify Stripe payment & mark order paid
export const verifyOrder = async (req, res) => {
  try {
    const { orderId, paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: "paid",
      });

      return res.json({ success: true, message: "Payment verified" });
    }

    res.json({ success: false, message: "Payment not completed" });
  } catch (err) {
    console.log("Verify order error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📦 Get orders of logged-in user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    console.log("User orders error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🧾 Admin: list all orders
export const listOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.log("List orders error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔄 Admin: update order status (processing → out for delivery → delivered)
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await Order.findByIdAndUpdate(orderId, {
      orderStatus: status,
    });

    res.json({ success: true, message: "Order status updated" });
  } catch (err) {
    console.log("Update status error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
