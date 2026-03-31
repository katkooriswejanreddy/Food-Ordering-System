import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useCart } from "../store/cartStore";

export default function Success() {
  const [params] = useSearchParams();
  const orderId = params.get("orderId");

  const clearCart = useCart((state) => state.clearCart);

  useEffect(() => {
    if (!orderId) return;

    // 1. Verify payment in backend
    fetch("http://localhost:4000/api/payment/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Payment verification:", data);

        // 2. Clear local Zustand cart
        clearCart();

        // 3. Remove from localStorage cart-storage
        localStorage.removeItem("cart-storage");
      })
      .catch((err) => console.error("Verify error:", err));
  }, [orderId]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-5 pt-24">
      <h1 className="text-4xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>

      <p className="text-gray-700 text-lg mt-4">
        Thank you! Your order ID is:
        <span className="font-bold ml-2">{orderId}</span>
      </p>

      <Link
        to="/orders"
        className="mt-6 px-6 py-3 bg-black text-white rounded-xl text-lg hover:bg-gray-900"
      >
        View All Orders
      </Link>
    </div>
  );
}
