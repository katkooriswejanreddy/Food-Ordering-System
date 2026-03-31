import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPanel() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const res = await axios.get("http://localhost:4000/api/order/all");
    setOrders(res.data.data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:4000/api/order/update-status/${id}`, {
      status,
    });
    loadOrders();
  };

  const stages = [
    "Accepted",
    "Preparing",
    "Out for delivery",
    "Completed",
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border p-4 bg-white rounded-xl shadow mb-4"
        >
          <h2 className="text-xl font-semibold">
            Order #{order._id.slice(-5)}
          </h2>

          <p className="text-gray-700">
            Status: <b>{order.status}</b>
          </p>

          <div className="mt-3 space-x-3">
            {stages.map((stage) => (
              <button
                key={stage}
                onClick={() => updateStatus(order._id, stage)}
                className="px-4 py-2 bg-gray-800 text-white rounded"
              >
                Mark {stage}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
