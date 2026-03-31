import { useCart } from "../store/cartStore";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="pt-24 px-5 max-w-4xl mx-auto text-black">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {cart.length === 0 && (
        <p className="text-gray-700 text-lg">Your cart is empty.</p>
      )}

      {cart.length > 0 && (
        <>
          <div className="space-y-4">
            {cart.map((item) => {
              const safeId = item.id || item._id;

              return (
                <div
                  key={safeId}
                  className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md border border-gray-200"
                >
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-700">£{item.price.toFixed(2)}</p>

                    <div className="flex items-center gap-3 mt-3">
                      <button
                        type="button"
                        onClick={() => decreaseQty(safeId)}
                        className="px-3 py-1 bg-gray-200 text-black rounded-lg font-bold hover:bg-gray-300"
                      >
                        –
                      </button>

                      <span className="text-black font-semibold">
                        {item.qty}
                      </span>

                      <button
                        type="button"
                        onClick={() => increaseQty(safeId)}
                        className="px-3 py-1 bg-gray-200 text-black rounded-lg font-bold hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(safeId)}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-8 border-t border-gray-200 pt-4">
            <h3 className="text-2xl font-bold">
              Total: £{total.toFixed(2)}
            </h3>

            <Link
              to="/checkout"
              className="inline-block bg-black text-white mt-4 px-6 py-3 rounded-lg text-lg hover:bg-gray-900"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
