import { Link } from "react-router-dom";
import { useCart } from "../store/cartStore";
import { FiShoppingCart, FiUser } from "react-icons/fi";

export default function Navbar() {
  const cart = useCart((s) => s.cart);

  return (
    <nav
      className="
        fixed top-0 w-full z-50
        backdrop-blur-lg bg-white/70 shadow-lg
        border-b border-gray-200
        px-6 py-4 flex justify-between items-center
      "
    >
      {/* Logo */}
      <Link to="/" className="text-3xl font-bold text-red-600 tracking-wide">
        FoodieSam
      </Link>

      {/* RIGHT SIDE ICONS */}
      <div className="flex items-center gap-8">

        {/* Menu */}
        <Link
          to="/menu"
          className="text-gray-900 text-lg font-medium hover:text-red-600 transition"
        >
          Menu
        </Link>

        {/* Orders link (optional visible link) */}
        <Link
          to="/orders"
          className="text-gray-900 text-lg font-medium hover:text-red-600 transition hidden sm:block"
        >
          Orders
        </Link>

        {/* Cart Icon */}
        <Link to="/cart" className="relative">
          <FiShoppingCart
            size={26}
            className="text-gray-800 hover:text-red-600 transition"
          />

          {cart.length > 0 && (
            <span
              className="
                absolute -top-2 -right-2 bg-red-600 text-white text-xs
                w-5 h-5 flex items-center justify-center rounded-full
                shadow-md
              "
            >
              {cart.length}
            </span>
          )}
        </Link>

        {/* USER DROPDOWN */}
        <div className="relative group">
          {/* Avatar */}
          <div
            className="
              w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center
              hover:bg-red-600 transition shadow-md cursor-pointer
            "
          >
            <FiUser size={20} />
          </div>

          {/* DROPDOWN MENU */}
          <div
            className="
              absolute right-0 mt-3 w-48 bg-white shadow-xl rounded-xl py-2 
              opacity-0 invisible group-hover:opacity-100 group-hover:visible 
              transition-all duration-200 border border-gray-200
            "
          >
            <Link
              to="/profile"
              className="block px-4 py-3 text-gray-800 hover:bg-gray-100 hover:text-red-600 transition"
            >
              View Profile
            </Link>

            <Link
              to="/orders"
              className="block px-4 py-3 text-gray-800 hover:bg-gray-100 hover:text-red-600 transition"
            >
              My Orders
            </Link>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                window.location.href = "/login";
              }}
              className="block w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-100 hover:text-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
