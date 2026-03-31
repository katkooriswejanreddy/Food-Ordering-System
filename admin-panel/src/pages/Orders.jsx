import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPanel() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get("http://localhost:4000/api/admin/orders")
      .then((res) => {
        if (res.data.success) setOrders(res.data.orders);
      })
      .catch((err) => console.log("Admin orders fetch error:", err));
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/admin/orders/${orderId}`,
        { status: newStatus }
      );

      if (res.data.success) {
        alert("Order status updated!");
        fetchOrders();
      }
    } catch (err) {
      console.log("Status update error:", err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-3">Order ID</th>
              <th className="p-3">User ID</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              // ⭐ Correct single line
              const currentStatus = order.status || "processing";

              return (
                <tr key={order._id} className="border-b">
                  <td className="p-3">{order._id}</td>
                  <td className="p-3">{order.user}</td>
                  <td className="p-3">£{order.amount}</td>

                  <td className="p-3">
                    {order.paymentStatus === "paid" ? (
                      <span className="px-3 py-1 bg-green-600 text-white rounded">
                        Paid
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-red-600 text-white rounded">
                        Pending
                      </span>
                    )}
                  </td>

                  {/* Dropdown */}
                  <td className="p-3">
                    <select
                      value={currentStatus}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="processing">Processing</option>
                      <option value="preparing">Preparing</option>
                      <option value="out for delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() =>
                        updateStatus(order._id, currentStatus)
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
