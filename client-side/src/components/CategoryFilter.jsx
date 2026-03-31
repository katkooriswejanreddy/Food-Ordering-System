import React from "react";

const categories = [
  "All",
  "Burgers",
  "Pizza",
  "Wraps",
  "Biryani",
  "Sides",
  "Drinks",
  "Dessert",
];

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="flex gap-3 overflow-x-auto py-3 no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`
            px-5 py-2 rounded-full border text-sm font-medium transition
            ${
              selected === cat
                ? "bg-black text-white border-black shadow"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
