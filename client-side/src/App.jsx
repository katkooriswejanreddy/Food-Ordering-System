import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

// Customer Pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Profile from "./pages/Profile";   // ⭐ NEW

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Admin Pages
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import OrdersPanel from "./admin/OrdersPanel";
import AddItem from "./admin/AddItem";
import AdminLogin from "./admin/Login";

function App() {
  return (
    <Router>
      <Routes>

        {/* -------------------------
           CUSTOMER LAYOUT
        -------------------------- */}
        <Route
          element={
            <>
              <Navbar />
              <div className="pt-20 min-h-screen bg-gray-50">
                <Outlet />
              </div>
              <Footer />
            </>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />   {/* ⭐ ADDED */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
        </Route>

        {/* -------------------------
           ADMIN ROUTES
        -------------------------- */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<OrdersPanel />} />
          <Route path="add-item" element={<AddItem />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
