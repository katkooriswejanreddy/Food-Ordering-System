import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

export default function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/admin/orders")
      .then((res) => {
        if (res.data.success) {
          setOrders(res.data.orders);
        }
      });
  }, []);

  // Stats
  const total = orders.length;
  const completed = orders.filter((o) => o.status === "Completed").length;
  const pending = orders.filter((o) => o.status === "Pending").length;
  const revenue = orders
    .filter((o) => o.paymentStatus === "paid" || o.paymentStatus === "Paid")
    .reduce((sum, o) => sum + o.amount, 0)
    .toFixed(2);

  // Chart Data
  const barData = {
    labels: ["Pending", "Completed"],
    datasets: [
      {
        label: "Orders",
        data: [pending, completed],
        backgroundColor: ["#facc15", "#22c55e"],
      },
    ],
  };

  const lineData = {
    labels: orders.map((o) => new Date(o.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: "Daily Sales (£)",
        data: orders.map((o) => o.amount),
        borderColor: "#3b82f6",
        tension: 0.3,
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-5 shadow rounded-xl">
          <h2 className="text-xl font-bold">Total Orders</h2>
          <p className="text-3xl mt-2">{total}</p>
        </div>
        <div className="bg-white p-5 shadow rounded-xl">
          <h2 className="text-xl font-bold">Completed</h2>
          <p className="text-3xl mt-2 text-green-600">{completed}</p>
        </div>
        <div className="bg-white p-5 shadow rounded-xl">
          <h2 className="text-xl font-bold">Pending</h2>
          <p className="text-3xl mt-2 text-yellow-500">{pending}</p>
        </div>
        <div className="bg-white p-5 shadow rounded-xl">
          <h2 className="text-xl font-bold">Total Revenue</h2>
          <p className="text-3xl mt-2 text-blue-600">£{revenue}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <Bar data={barData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Daily Sales Trend</h2>
          <Line data={lineData} />
        </div>
      </div>
    </div>
  );
}
