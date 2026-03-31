import React from "react";
import { useCart } from "../store/cartStore";

// DEBUG – Shows which file is loaded
console.log("Loaded cartStore from FoodCard.jsx");

export default function FoodCard({ item }) {
  if (!item) return null;

  const addToCart = useCart((s) => s.addToCart);

  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden bg-[#111] shadow-lg hover:scale-[1.02] transition">
      <img
        src={item.image}
        alt={item.name}
        className="h-40 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold text-white">{item.name}</h2>
        <p className="text-gray-400 text-sm">{item.category}</p>
        <p className="text-gray-500 text-xs mt-1">{item.calories} kcal</p>

        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-bold text-white">
            £{item.price.toFixed(2)}
          </p>

          <button
            onClick={() => {
              console.log("ADD CLICKED:", item);
              addToCart(item);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
