// src/pages/Orders.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      axios
        .get(`http://localhost:4000/api/order/user/${userId}`)
        .then((res) => setOrders(res.data.data))
        .catch((err) => console.log(err));
    }
  }, []);

  // Helper to normalize admin status values
  const normalize = (str) => str?.toLowerCase().trim();

  const getStatusColor = (status) => {
    const s = normalize(status);

    switch (s) {
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "preparing":
        return "text-blue-600 bg-blue-100";
      case "out for delivery":
        return "text-purple-600 bg-purple-100";
      case "delivered":
      case "completed":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-200";
    }
  };

  return (
    <div className="pt-28 px-5 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-10">
        My Orders 🍽️
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-lg">You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => {

            // FIXED ✔ reads both fields
            const rawStatus = order.status || order.orderStatus || "Pending";

            const finalStatus =
              rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1);

            return (
              <div
                key={order._id}
                className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Order #{order._id.substring(order._id.length - 6)}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      finalStatus
                    )}`}
                  >
                    {finalStatus}
                  </span>
                </div>

                {/* Amount */}
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Amount:{" "}
                  <span className="font-bold text-gray-900">
                    £{order.amount.toFixed(2)}
                  </span>
                </p>

                {/* Items */}
                <div className="mt-4 border-t border-gray-200 pt-4 space-y-2">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-gray-800 text-[15px]"
                    >
                      <span>
                        {item.qty} × {item.name}
                      </span>
                      <span>£{item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Delivery Progress Bar */}
                <div className="mt-6">
                  <p className="text-sm text-gray-500 mb-1">Delivery Progress:</p>

                  <div className="relative w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        normalize(finalStatus) === "pending"
                          ? "w-1/6 bg-yellow-500"
                          : normalize(finalStatus) === "preparing"
                          ? "w-1/2 bg-blue-500"
                          : normalize(finalStatus) === "out for delivery"
                          ? "w-5/6 bg-purple-500"
                          : "w-full bg-green-600"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
