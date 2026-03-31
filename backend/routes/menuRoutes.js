import express from "express";
import Menu from "../models/Menu.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const items = await Menu.find();
  res.json(items);
});

export default router;
