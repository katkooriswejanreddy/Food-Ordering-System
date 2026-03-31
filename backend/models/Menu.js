import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: String,
  price: Number,
  img: String,
  category: String,
  rating: Number
});

export default mongoose.model("Menu", menuSchema);
