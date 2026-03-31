import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
  const userId = localStorage.getItem("userId");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Fetch user profile
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:4000/api/user/profile/${userId}`)
      .then((res) => {
        if (res.data.success) {
          setName(res.data.user.name || "");
          setPhone(res.data.user.phone || "");
          setAddress(res.data.user.address || "");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/user/profile/${userId}`,
        { name, phone, address }
      );

      if (res.data.success) {
        alert("Profile updated successfully!");
      }
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 pt-24 px-4 flex justify-center">
      
      {/* CONTAINER */}
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/30 animate-fadeIn">
        
        {/* HEADER */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {name ? name.charAt(0).toUpperCase() : "U"}
          </div>

          <h1 className="mt-4 text-3xl font-bold text-gray-900 tracking-wide">
            My Profile
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Update your personal information
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 mt-1 bg-gray-100 text-black rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:bg-white transition"
              type="text"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 mt-1 bg-gray-100 text-black rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:bg-white transition"
              type="text"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Delivery Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 mt-1 bg-gray-100 text-black rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:bg-white transition"
              placeholder="Enter your address"
              rows="3"
            ></textarea>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          className="mt-8 w-full bg-black text-white py-3 rounded-xl shadow-md text-lg font-semibold hover:bg-gray-900 transition active:scale-95"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
