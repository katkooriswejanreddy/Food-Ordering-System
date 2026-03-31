// routes/foodRoute.js
import express from "express";
import multer from "multer";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";

const foodRouter = express.Router();


// -------------------------------------
// MULTER STORAGE (file uploads)
// -------------------------------------
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


// -------------------------------------
// ROUTES
// -------------------------------------

// Add food item (with image upload)
foodRouter.post("/add", upload.single("image"), addFood);

// Get all food items
foodRouter.get("/list", listFood);

// Remove food item
foodRouter.post("/remove", removeFood);


export default foodRouter;
