import { useState } from "react";
import { User } from "lucide-react";

export default function Profile() {
  const [admin, setAdmin] = useState({
    name: "Admin User",
    email: "admin@foodiesam.com",
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <User /> Admin Profile
      </h1>

      <div className="bg-white shadow rounded-xl p-6 max-w-lg">

        <label className="block text-sm font-semibold">Name</label>
        <input
          type="text"
          value={admin.name}
          className="mt-1 w-full p-3 bg-gray-100 rounded-lg"
          readOnly
        />

        <label className="block text-sm font-semibold mt-4">Email</label>
        <input
          type="text"
          value={admin.email}
          className="mt-1 w-full p-3 bg-gray-100 rounded-lg"
          readOnly
        />

        <button className="mt-6 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900">
          Logout
        </button>
      </div>
    </div>
  );
}
