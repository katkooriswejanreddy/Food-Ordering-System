import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Bell, MessageSquare, User, Receipt } from "lucide-react";

export default function AdminLayout() {
  const { pathname } = useLocation();

  const menu = [
    { label: "Dashboard", icon: <LayoutDashboard />, path: "/" },
    { label: "Orders", icon: <Receipt />, path: "/orders" },
    { label: "Notifications", icon: <Bell />, path: "/notifications" },
    { label: "Feedback", icon: <MessageSquare />, path: "/feedback" },
    { label: "Profile", icon: <User />, path: "/profile" },
  ];

  return (
    <div className="flex">

      {/* Sidebar */}
      <div className="w-64 bg-[#0A0F1C] text-white min-h-screen p-6 shadow-xl">
        <h1 className="text-2xl font-bold mb-10">FoodieSam Admin</h1>

        <ul className="space-y-4 text-lg">

          {menu.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition 
                  ${pathname === item.path ? "bg-blue-600 text-white" : "hover:bg-[#141b2d]"}`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}

        </ul>
      </div>

      {/* Page Content */}
      <div className="flex-1 p-10 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
