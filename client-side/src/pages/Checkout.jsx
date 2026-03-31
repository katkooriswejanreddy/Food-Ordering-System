import { useEffect, useState } from "react";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart-storage"));
setCart(stored?.state?.cart || []);

    setUser(JSON.parse(localStorage.getItem("user")) || {});
  }, []);

  const handleCheckout = async () => {
    console.log("🚀 Sending checkout request with:", { cart, user });

    try {
      const res = await fetch(
        "http://localhost:4000/api/payment/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cart,
            userId: user?._id,
          }),
        }
      );

      console.log("📥 RAW RESPONSE:", res);

      const data = await res.json();
      console.log("📦 PARSED RESPONSE:", data);

      if (!data.url) {
        alert("❌ Stripe URL missing. Backend did not return 'url'.");
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      console.error("🔥 Checkout error:", err);
    }
  };

  return (
    <div className="p-10 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-5">Checkout</h1>

      <button
        onClick={handleCheckout}
        className="bg-white text-black px-6 py-3 rounded-xl hover:bg-gray-200"
      >
        Pay Now
      </button>
    </div>
  );
}
