import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Food from "./models/foodModel.js";

const menu = [
  // BURGERS
  {
    name: "Classic Chicken Burger",
    price: 6.99,
    category: "Burgers",
    calories: 620,
    image: "https://res.cloudinary.com/demo/image/upload/burger1.jpg",
    description: "Grilled chicken, lettuce, cheese & house sauce."
  },
  {
    name: "Spicy Zinger Burger",
    price: 7.49,
    category: "Burgers",
    calories: 740,
    image: "https://res.cloudinary.com/demo/image/upload/burger2.jpg",
    description: "Crispy spicy chicken fillet layered with creamy mayo."
  },
  {
    name: "Double Beef Smash",
    price: 8.99,
    category: "Burgers",
    calories: 920,
    image: "https://res.cloudinary.com/demo/image/upload/burger3.jpg",
    description: "Double smashed beef patties with melted cheese."
  },

  // PIZZA
  {
    name: "Margherita Pizza",
    price: 9.99,
    category: "Pizza",
    calories: 890,
    image: "https://res.cloudinary.com/demo/image/upload/pizza1.jpg",
    description: "Classic pizza with mozzarella, basil & tomato."
  },
  {
    name: "Pepperoni Feast",
    price: 11.49,
    category: "Pizza",
    calories: 1050,
    image: "https://res.cloudinary.com/demo/image/upload/pizza2.jpg",
    description: "Loaded pepperoni with premium cheese blend."
  },
  {
    name: "Tandoori Chicken Pizza",
    price: 12.49,
    category: "Pizza",
    calories: 1150,
    image: "https://res.cloudinary.com/demo/image/upload/pizza3.jpg",
    description: "Tandoori marinated chicken with peppers & onions."
  },

  // WRAPS
  {
    name: "Shawarma Wrap",
    price: 5.99,
    category: "Wraps",
    calories: 540,
    image: "https://res.cloudinary.com/demo/image/upload/wrap1.jpg",
    description: "Middle Eastern chicken wrapped fresh & juicy."
  },
  {
    name: "Crispy Chicken Wrap",
    price: 6.49,
    category: "Wraps",
    calories: 680,
    image: "https://res.cloudinary.com/demo/image/upload/wrap2.jpg",
    description: "Crispy fried chicken, lettuce & mayonnaise."
  },
  {
    name: "Paneer Roll",
    price: 4.99,
    category: "Wraps",
    calories: 480,
    image: "https://res.cloudinary.com/demo/image/upload/wrap3.jpg",
    description: "Indian-style paneer cooked with rich spices."
  },

  // BIRYANI
  {
    name: "Chicken Biryani",
    price: 9.99,
    category: "Biryani",
    calories: 890,
    image: "https://res.cloudinary.com/demo/image/upload/biryani1.jpg",
    description: "Hyderabadi chicken biryani, aromatic & rich."
  },
  {
    name: "Lamb Biryani",
    price: 11.99,
    category: "Biryani",
    calories: 1020,
    image: "https://res.cloudinary.com/demo/image/upload/biryani2.jpg",
    description: "Slow-cooked lamb biryani with deep spices."
  },
  {
    name: "Veg Biryani",
    price: 8.49,
    category: "Biryani",
    calories: 720,
    image: "https://res.cloudinary.com/demo/image/upload/biryani3.jpg",
    description: "Fresh veggies layered with fragrant rice."
  },

  // SIDES
  {
    name: "Fries",
    price: 2.49,
    category: "Sides",
    calories: 320,
    image: "https://res.cloudinary.com/demo/image/upload/fries1.jpg",
    description: "Crispy golden salted fries."
  },
  {
    name: "Masala Fries",
    price: 2.99,
    category: "Sides",
    calories: 350,
    image: "https://res.cloudinary.com/demo/image/upload/fries2.jpg",
    description: "Fries tossed in spicy Indian masala."
  },
  {
    name: "Popcorn Chicken",
    price: 4.99,
    category: "Sides",
    calories: 540,
    image: "https://res.cloudinary.com/demo/image/upload/popcorn1.jpg",
    description: "Bite-sized crispy chicken pieces."
  },

  // DRINKS
  {
    name: "Coke",
    price: 1.49,
    category: "Drinks",
    calories: 140,
    image: "https://res.cloudinary.com/demo/image/upload/drink1.jpg",
    description: "Chilled Coca-Cola."
  },
  {
    name: "Mango Lassi",
    price: 2.99,
    category: "Drinks",
    calories: 260,
    image: "https://res.cloudinary.com/demo/image/upload/drink2.jpg",
    description: "Creamy mango yoghurt drink."
  },

  // DESSERT
  {
    name: "Lava Cake",
    price: 4.49,
    category: "Dessert",
    calories: 510,
    image: "https://res.cloudinary.com/demo/image/upload/dessert1.jpg",
    description: "Molten chocolate lava cake."
  },
  {
    name: "Baklava",
    price: 3.99,
    category: "Dessert",
    calories: 430,
    image: "https://res.cloudinary.com/demo/image/upload/dessert2.jpg",
    description: "Sweet Middle Eastern pastry with nuts & honey."
  }
];

const start = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  await Food.deleteMany({});
  await Food.insertMany(menu);
  console.log("Menu seeded with unique calories ✔");
  process.exit();
};

start();