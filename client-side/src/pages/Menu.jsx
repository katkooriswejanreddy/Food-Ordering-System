import { useCart } from "../store/cartStore";
import { menuData } from "../data/menuData";

export default function Menu() {
  const addToCart = useCart((s) => s.addToCart);

  // Helper to get local image URL
  const getImg = (key) => `http://localhost:4000/uploads/${key}.jpg`;

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10">
        Explore Our Menu 🍽️
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {menuData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-4 border border-gray-200"
          >
            {/* FOOD IMAGE */}
            <img
              src={getImg(item.imageKey)}
              alt={item.name}
              className="w-full h-52 object-cover rounded-xl"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `http://localhost:4000/uploads/${item.imageKey}.png`;
              }}
            />

            {/* FOOD DETAILS */}
            <h3 className="mt-4 font-bold text-xl text-gray-900">
              {item.name}
            </h3>
            <p className="text-gray-600 mb-2">£{item.price.toFixed(2)}</p>

            {/* ADD TO CART BUTTON */}
            <button
              onClick={() => addToCart(item)}
              className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
