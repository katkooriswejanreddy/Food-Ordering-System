import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    // ⭐ NEW FIELDS ⭐
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
  },
  { timestamps: true }
);

// Prevent OverwriteModelError
export default mongoose.models.User || mongoose.model("User", userSchema);
