import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Bell,
  MessageSquare,
  User,
  Moon,
  Sun,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [dark, setDark] = useState(false);

  const navItemStyle = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition-all duration-200
     ${isActive ? "bg-blue-600 text-white shadow-md" : "hover:bg-gray-200"}
    `;

  return (
    <div
      className={`h-screen w-64 flex flex-col shadow-xl transition-all duration-300 ${
        dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Logo */}
      <div className="p-6 text-2xl font-bold tracking-tight">
        FoodieSam Admin
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-2 px-4">
        <NavLink to="/" className={navItemStyle}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/orders" className={navItemStyle}>
          <ClipboardList size={20} />
          Orders
        </NavLink>

        <NavLink to="/notifications" className={navItemStyle}>
          <Bell size={20} />
          Notifications
        </NavLink>

        <NavLink to="/feedback" className={navItemStyle}>
          <MessageSquare size={20} />
          Feedback
        </NavLink>

        <NavLink to="/profile" className={navItemStyle}>
          <User size={20} />
          Profile
        </NavLink>
      </nav>

      {/* Dark Mode Toggle */}
      <div className="mt-auto p-4">
        <button
          className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-gray-200 transition"
          onClick={() => setDark(!dark)}
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
}
