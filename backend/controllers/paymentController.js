// backend/controllers/paymentController.js
import { stripe } from "../server.js";
import Order from "../models/orderModel.js";

export const createCheckoutSession = async (req, res) => {
  console.log("🔥 Checkout API hit:", req.body);

  try {
    const { cart, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID missing" });
    }

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Create order
    const order = await Order.create({
      user: userId,
      items: cart,
      amount: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
      paymentStatus: "pending",
      orderStatus: "processing",
    });

    // STRIPE SESSION (2025 CORRECT SYNTAX)
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],  // ⭐ REQUIRED (new API)
      line_items: cart.map((item) => ({
        price_data: {
          currency: "gbp",
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.qty,
      })),
      success_url: `${process.env.CLIENT_URL}/success?orderId=${order._id}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    return res.json({ url: session.url });
  } catch (err) {
    console.error("❌ Checkout session error:", err);
    return res.status(500).json({ error: err.message });
  }
};

// VERIFY PAYMENT
export const verifyPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId)
      return res.status(400).json({ success: false, message: "Order ID missing" });

    const order = await Order.findById(orderId);
    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });

    order.paymentStatus = "paid";
    await order.save();

    return res.json({ success: true, message: "Payment verified!", order });
  } catch (err) {
    console.error("❌ Verify payment error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
