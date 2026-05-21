import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTheme } from "../../store/slices/themeSlice";
import { categories } from "../../data/products";

export default function Footer() {
  const dark = useSelector(selectTheme) === "dark";
  const bg   = dark ? "bg-[#0a0a0a]" : "bg-gray-900";
  return (
    <footer className={`${bg} text-gray-400 mt-auto`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-red-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-sm">E</span>
              </div>
              <span className="font-black text-white text-xl">E-<span className="text-red-500">Shop</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-5 text-gray-500">Your one-stop destination for gaming, electronics, fashion, and more.</p>
            <div className="flex gap-2">
              {["F","T","I","Y"].map((s) => (
                <a key={s} href="#" className="w-8 h-8 bg-white/5 hover:bg-red-500 rounded-lg flex items-center justify-center text-xs font-black text-white transition-all hover:scale-110">
                  {s}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2">
              {categories.map((c) => (
                <li key={c.id}><Link to={`/category/${c.id}`} className="text-sm text-gray-500 hover:text-red-400 transition">{c.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Help</h4>
            <ul className="space-y-2 text-sm">
              {[["Contact Us","/contact"],["About Us","/about"],["FAQs","#"],["Shipping","#"],["Returns","#"]].map(([l,t]) => (
                <li key={l}><Link to={t} className="text-gray-500 hover:text-red-400 transition">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>📍 Vellore, TN 635810, India</li>
              <li>📞 +91 123 456 7890</li>
              <li>✉️ support@eshop.com</li>
              <li>🕐 Mon–Sat, 9am–6pm</li>
            </ul>
          </div>
        </div>
        <div className={`border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 ${dark?"border-white/5":"border-white/8"}`}>
          <p className="text-sm text-gray-600">© 2026 E-Shop. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <a href="#" className="hover:text-red-400 transition">Privacy</a>
            <a href="#" className="hover:text-red-400 transition">Terms</a>
          </div>
          <div className="flex items-center gap-1.5">
            {["💳","🏦","📱","💰"].map((i,idx) => (
              <span key={idx} className="bg-white/5 px-2 py-1 rounded-lg text-sm">{i}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}