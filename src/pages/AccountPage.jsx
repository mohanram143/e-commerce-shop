import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { clearUser } from "../store/slices/authSlice";

const mockOrders = [
  {
    id: "ESH-482901",
    date: "May 15, 2025",
    status: "Delivered",
    total: 199.99,
    items: 2,
  },
  {
    id: "ESH-391022",
    date: "Apr 28, 2025",
    status: "Shipped",
    total: 89.99,
    items: 1,
  },
  {
    id: "ESH-274833",
    date: "Apr 10, 2025",
    status: "Processing",
    total: 349.99,
    items: 3,
  },
];

const statusColor = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-orange-100 text-orange-700",
};

export default function AccountPage() {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tab, setTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
    navigate("/auth");
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "orders", label: "My Orders", icon: "📦" },
    { id: "address", label: "Address", icon: "📍" },
    { id: "security", label: "Security", icon: "🔒" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-5">
          <h1 className="text-2xl font-black text-gray-900">My Account</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-60 shrink-0 space-y-3">
          {/* User card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-red-500 text-2xl font-black">
                {user?.displayName?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
            <p className="font-bold text-gray-900">
              {user?.displayName || "User"}
            </p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            <span className="inline-block mt-2 bg-red-50 text-red-500 text-xs font-bold px-3 py-1 rounded-full">
              Premium Member
            </span>
          </div>

          {/* Nav */}
          <div className="bg-white rounded-2xl border border-gray-100 p-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition text-left ${tab === t.id ? "bg-red-50 text-red-500" : "text-gray-600 hover:bg-gray-50"}`}
              >
                <span>{t.icon}</span> {t.label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-50 transition text-left mt-1 border-t border-gray-100"
            >
              <span>🚪</span> Sign Out
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {tab === "profile" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-black text-gray-900 mb-5">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  ["Full Name", user?.displayName || ""],
                  ["Email", user?.email || ""],
                  ["Phone", "+91 9876543210"],
                  ["Date of Birth", "01/01/1995"],
                ].map(([label, val]) => (
                  <div key={label}>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                      {label}
                    </label>
                    <input
                      defaultValue={val}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-red-300 transition text-gray-800"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                    Gender
                  </label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-red-300 transition text-gray-800 bg-white">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => {
                  setSaved(true);
                  setTimeout(() => setSaved(false), 2000);
                }}
                className={`mt-6 font-bold px-6 py-3 rounded-xl transition text-sm ${saved ? "bg-green-500 text-white" : "bg-red-500 hover:bg-red-600 text-white"}`}
              >
                {saved ? "✓ Saved!" : "Save Changes"}
              </button>
            </div>
          )}

          {tab === "orders" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-black text-gray-900 mb-5">
                My Orders
              </h2>
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-100 rounded-xl p-4 hover:border-red-100 transition"
                  >
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <p className="font-bold text-gray-900 text-sm">
                          {order.id}
                        </p>
                        <p className="text-xs text-gray-400">
                          {order.date} · {order.items} item
                          {order.items !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor[order.status]}`}
                        >
                          {order.status}
                        </span>
                        <p className="font-black text-gray-900 mt-1">
                          ${order.total}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="text-xs text-red-500 hover:text-red-600 font-semibold border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition">
                        View Details
                      </button>
                      {order.status === "Delivered" && (
                        <button className="text-xs text-gray-500 font-semibold border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition">
                          Reorder
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "address" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-black text-gray-900 mb-5">
                Saved Addresses
              </h2>
              <div className="border border-red-200 bg-red-50 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-red-500 bg-red-100 px-2 py-0.5 rounded-full">
                      Default
                    </span>
                    <p className="font-semibold text-gray-900 mt-2 text-sm">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      123 Main Street, Apartment 4B
                    </p>
                    <p className="text-sm text-gray-600">
                      Chennai, Tamil Nadu 600001
                    </p>
                    <p className="text-sm text-gray-600">India</p>
                    <p className="text-xs text-gray-400 mt-1">
                      📞 +91 9876543210
                    </p>
                  </div>
                  <button className="text-xs text-red-500 hover:underline font-semibold">
                    Edit
                  </button>
                </div>
              </div>
              <button className="w-full border-2 border-dashed border-gray-200 rounded-xl p-4 text-sm text-gray-500 hover:border-red-300 hover:text-red-500 transition font-semibold">
                + Add New Address
              </button>
            </div>
          )}

          {tab === "security" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-black text-gray-900 mb-5">
                Security Settings
              </h2>
              <div className="space-y-4">
                {[
                  ["Current Password", "password"],
                  ["New Password", "password"],
                  ["Confirm Password", "password"],
                ].map(([label, type]) => (
                  <div key={label}>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                      {label}
                    </label>
                    <input
                      type={type}
                      placeholder="••••••••"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-red-300 transition"
                    />
                  </div>
                ))}
                <button className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-600 transition text-sm">
                  Update Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
