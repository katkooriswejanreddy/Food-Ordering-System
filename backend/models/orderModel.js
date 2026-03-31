import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   // <-- This is correct
    required: true,
  },
  items: [
    {
      name: String,
      price: Number,
      qty: Number,
    }
  ],
  amount: Number,
  status: { type: String, default: "Pending" },
  paymentStatus: { type: String, default: "Pending" }
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
