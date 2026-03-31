import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    category: String,
    image: String,
    description: String,

    calories: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Food", foodSchema);