import { useEffect, useState } from "react";
import axios from "axios";
import { Bell, Clock } from "lucide-react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/admin/notifications")
      .then(res => setNotifications(res.data.notifications || []))
      .catch(err => console.log("Notification error:", err));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Bell /> Notifications
      </h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        {notifications.length === 0 && (
          <p className="text-gray-600">No new notifications.</p>
        )}

        {notifications.map((n) => (
          <div
            key={n._id}
            className="border p-4 rounded-lg hover:bg-gray-50 transition"
          >
            <h2 className="font-semibold text-lg">{n.title}</h2>
            <p className="text-gray-700">{n.message}</p>

            <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
              <Clock size={16} />
              {new Date(n.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
