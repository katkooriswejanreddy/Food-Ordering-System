// src/pages/SignUp.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";  // ⭐ added

export default function SignUp() {
  const navigate = useNavigate();
  const loginUser = useAuth((state) => state.login); // ⭐ Zustand login

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      return alert("All fields are required!");
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/signup",
        { name, email, password }
      );

      if (res.data.success) {
        // ⭐ auto-login after signup
        loginUser(res.data.user._id, res.data.token);

        alert("Account created successfully!");
        navigate("/");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="pt-24 flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow max-w-sm w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 px-4 py-3 bg-slate-900 text-white rounded-lg"
          onChange={(e) => setName(e.target.value)}
        />

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
          onClick={handleSignup}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold"
        >
          Sign Up
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
