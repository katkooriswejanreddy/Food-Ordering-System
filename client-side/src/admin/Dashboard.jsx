import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { day: "Mon", sales: 22 },
  { day: "Tue", sales: 40 },
  { day: "Wed", sales: 30 },
  { day: "Thu", sales: 55 },
  { day: "Fri", sales: 70 },
  { day: "Sat", sales: 90 },
  { day: "Sun", sales: 50 },
];

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="card p-6">
          <h2 className="text-gray-500 dark:text-gray-300 text-sm">Total Orders</h2>
          <p className="text-3xl font-bold mt-2">128</p>
        </div>

        <div className="card p-6">
          <h2 className="text-gray-500 dark:text-gray-300 text-sm">Revenue</h2>
          <p className="text-3xl font-bold mt-2">₹ 42,300</p>
        </div>

        <div className="card p-6">
          <h2 className="text-gray-500 dark:text-gray-300 text-sm">Menu Items</h2>
          <p className="text-3xl font-bold mt-2">34</p>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Weekly Sales</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <XAxis dataKey="day" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
