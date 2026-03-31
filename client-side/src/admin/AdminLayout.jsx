import { Link, Outlet, useLocation } from "react-router-dom";
import { FiHome, FiShoppingBag, FiPlus, FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import { useThemeStore } from "../store/theme";

export default function AdminLayout() {
  const location = useLocation();
  const { dark, toggleTheme } = useThemeStore();

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FiHome /> },
    { name: "Orders", path: "/admin/orders", icon: <FiShoppingBag /> },
    { name: "Add Item", path: "/admin/add-item", icon: <FiPlus /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-800 shadow-md">
        <div className="p-6 text-xl font-extrabold border-b dark:border-slate-700">
          Admin Panel
        </div>

        <nav className="p-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition 
                ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-slate-700"
                }`}
            >
              {item.icon} {item.name}
            </Link>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-4 py-2 mt-4 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-700 transition"
          >
            {dark ? <FiSun /> : <FiMoon />}
            {dark ? "Light Mode" : "Dark Mode"}
          </button>

          <button className="flex items-center gap-3 px-4 py-2 mt-4 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md">
            <FiLogOut /> Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
