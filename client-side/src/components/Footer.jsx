import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16 pt-10 pb-6">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">FoodieSam</h2>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Authentic London flavours.  
            Freshly prepared. Delivered fast.  
            Serving East London & Ilford.
          </p>

          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-red-500 text-xl"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-500 text-xl"><FaFacebookF /></a>
            <a href="#" className="hover:text-sky-400 text-xl"><FaTwitter /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/menu" className="hover:text-white">Menu</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link to="/orders" className="hover:text-white">My Orders</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
          </ul>
        </div>

        {/* Delivery Areas */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Delivery Areas</h3>
          <ul className="space-y-2 text-sm">
            <li>E1, E2, E3, E6, E7, E12</li>
            <li>IG1, IG2, IG3, IG11</li>
            <li>SE1, SE5, SE15</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <p className="text-sm text-gray-400">
            📍 East London  
            ✉️ support@foodiesam.co.uk  
            📞 +44 7896 456 321
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 pt-5 border-t border-gray-700 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} <span className="text-white font-semibold">FoodieSam</span>. All Rights Reserved.
      </div>
    </footer>
  );
}
