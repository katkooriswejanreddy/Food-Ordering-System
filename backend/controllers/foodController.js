// controllers/foodController.js
import foodModel from "../models/foodModel.js";
import fs from "fs";

// -------------------------
// Add Food
// -------------------------
export const addFood = async (req, res) => {
  try {
    const image_filename = req.file ? req.file.filename : req.body.image;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      calories: req.body.calories || 0,
      image: image_filename,
    });

    await food.save();
    res.json({ success: true, message: "Food added" });
  } catch (error) {
    console.log("Error adding food:", error);
    res.json({ success: false, message: "Error adding food" });
  }
};

// -------------------------
// List Foods (fix image URLs)
// -------------------------
export const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});

    const formatted = foods.map((item) => {
      let image = item.image;

      // If it's an uploaded file → convert to URL
      if (image && !image.startsWith("http")) {
        image = `http://localhost:4000/uploads/${image}`;
      }

      return { ...item._doc, image };
    });

    res.json({ success: true, data: formatted });
  } catch (error) {
    console.log("Error listing food:", error);
    res.json({ success: false, message: "Error fetching food list" });
  }
};

// -------------------------
// Remove Food
// -------------------------
export const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (food && food.image && !food.image.startsWith("http")) {
      fs.unlink(`uploads/${food.image}`, () => {});
    }

    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food removed" });
  } catch (error) {
    console.log("Error removing food:", error);
    res.json({ success: false, message: "Error removing food" });
  }
};
