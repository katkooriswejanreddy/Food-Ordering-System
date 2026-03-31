// src/pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Please enter email & password");
    }

    try {
      const res = await axios.post("http://localhost:4000/api/user/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      if (res.data.success) {
        // ⭐ Save full user object properly
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // ⭐ Save token IF you want it later
        localStorage.setItem("token", res.data.token);

        alert("Login successful!");
        navigate("/");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Try again.");
    }
  };

  return (
    <div className="pt-24 flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow max-w-sm w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 bg-slate-900 text-white rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-3 bg-slate-900 text-white rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg text-lg font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}
