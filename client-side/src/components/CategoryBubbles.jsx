import { Link } from "react-router-dom";
import {
  FaHamburger,
  FaPizzaSlice,
  FaDrumstickBite,
  FaLeaf,
  FaGlassWhiskey,
  FaCookieBite,
} from "react-icons/fa";

const categories = [
  { name: "Burgers", icon: <FaHamburger className="text-red-600" /> },
  { name: "Pizza", icon: <FaPizzaSlice className="text-orange-500" /> },
  { name: "Wraps", icon: <FaDrumstickBite className="text-yellow-600" /> },
  { name: "Biryani", icon: <FaLeaf className="text-green-600" /> },
  { name: "Drinks", icon: <FaGlassWhiskey className="text-blue-500" /> },
  { name: "Desserts", icon: <FaCookieBite className="text-pink-500" /> },
];

export default function CategoryBubbles() {
  return (
    <div className="w-full flex justify-center mt-6">
      <div className="flex gap-4 overflow-x-auto px-4 py-3 no-scrollbar">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/menu?cat=${cat.name}`}
            className="flex flex-col items-center bg-white shadow-md border 
            text-black px-5 py-3 rounded-2xl hover:scale-105 transition cursor-pointer"
          >
            <div className="text-3xl">{cat.icon}</div>
            <p className="text-sm font-semibold mt-1">{cat.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
