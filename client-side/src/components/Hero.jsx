import { Link } from "react-router-dom";
import CategoryBubbles from "./CategoryBubbles";

export default function Hero() {
  return (
    <>
      <div className="relative w-full h-[380px] rounded-xl overflow-hidden shadow mb-6">
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1600&auto=format"
          alt="FoodieSam London"
          className="w-full h-full object-cover opacity-90"
        />

        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-5xl font-bold">FoodieSam</h1>

          <p className="text-lg mt-3">
            Authentic London restaurant with online ordering & fast pickup.
          </p>

          <Link
            to="/menu"
            className="mt-6 bg-red-600 text-white px-8 py-3 rounded-lg text-xl hover:bg-red-700 transition"
          >
            Order Online
          </Link>
        </div>
      </div>

      {/* ⭐ Category bubbles added below */}
      <CategoryBubbles />
    </>
  );
}
