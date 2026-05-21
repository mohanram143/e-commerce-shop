import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartSubtotal,
  clearCart,
} from "../store/slices/cartSlice";
import Card from "./Card";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const total = subtotal > 50 ? subtotal : subtotal + 4.99;

  const [step, setStep] = useState(1); // 1=shipping, 2=payment, 3=success
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    payMethod: "card",
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handlePlaceOrder = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    dispatch(clearCart());
    setStep(3);
    setLoading(false);
  };

  if (items.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-black text-gray-900 mb-4">
            Nothing to checkout
          </h2>
          <Link
            to="/category/all"
            className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-600 transition inline-block"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-gray-100 p-10 max-w-md w-full text-center shadow-lg">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            Order Placed! 🎉
          </h2>
          <p className="text-gray-400 mb-2">
            Thank you, {form.firstName || "there"}!
          </p>
          <p className="text-gray-400 text-sm mb-8">
            Your order{" "}
            <span className="font-bold text-gray-700">
              #ESH-{Math.floor(Math.random() * 900000 + 100000)}
            </span>{" "}
            has been confirmed. You'll receive an email with tracking details
            soon.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/")}
              className="w-full bg-red-500 text-white font-bold py-3.5 rounded-xl hover:bg-red-600 transition"
            >
              Continue Shopping
            </button>
            <Link
              to="/account"
              className="block w-full border border-gray-200 text-gray-700 font-semibold py-3.5 rounded-xl hover:bg-gray-50 transition text-sm"
            >
              View My Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-red-300 transition placeholder-gray-400 text-gray-800";

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-5">
          <h1 className="text-2xl font-black text-gray-900">Checkout</h1>
          {/* Steps */}
          <div className="flex items-center gap-3 mt-3">
            {["Shipping", "Payment", "Confirm"].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full text-xs font-black flex items-center justify-center transition ${step > i + 1 ? "bg-green-500 text-white" : step === i + 1 ? "bg-red-500 text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span
                  className={`text-xs font-semibold ${step === i + 1 ? "text-red-500" : "text-gray-400"}`}
                >
                  {s}
                </span>
                {i < 2 && <div className="w-8 h-px bg-gray-200" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Form */}
        <div className="flex-1">
          {step === 1 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-black text-gray-900 mb-5">
                Shipping Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                    First Name *
                  </label>
                  <input
                    value={form.firstName}
                    onChange={set("firstName")}
                    placeholder="Mohan"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                    Last Name *
                  </label>
                  <input
                    value={form.lastName}
                    onChange={set("lastName")}
                    placeholder="Ram"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="mohan@email.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                    Phone
                  </label>
                  <input
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="+91 9876543210"
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                    Address *
                  </label>
                  <input
                    value={form.address}
                    onChange={set("address")}
                    placeholder="123 Main St, Apartment 4B"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                    City *
                  </label>
                  <input
                    value={form.city}
                    onChange={set("city")}
                    placeholder="Chennai"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                    State
                  </label>
                  <input
                    value={form.state}
                    onChange={set("state")}
                    placeholder="Tamil Nadu"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                    PIN Code
                  </label>
                  <input
                    value={form.zip}
                    onChange={set("zip")}
                    placeholder="600001"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                    Country
                  </label>
                  <select
                    value={form.country}
                    onChange={set("country")}
                    className={inputClass}
                  >
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={
                  !form.firstName || !form.email || !form.address || !form.city
                }
                className="w-full mt-6 bg-red-500 hover:bg-red-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-black py-3.5 rounded-xl transition active:scale-95"
              >
                Continue to Payment →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-black text-gray-900 mb-5">
                Payment Method
              </h2>

              {/* Payment tabs */}
              <div className="flex gap-2 mb-6">
                {[
                  ["card", "💳 Card"],
                  ["upi", "📱 UPI"],
                  ["cod", "💵 Cash on Delivery"],
                ].map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setForm((f) => ({ ...f, payMethod: val }))}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition border ${form.payMethod === val ? "bg-red-50 border-red-300 text-red-600" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {form.payMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                      Card Number
                    </label>
                    <input
                      value={form.cardNumber}
                      onChange={set("cardNumber")}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                      Name on Card
                    </label>
                    <input
                      value={form.cardName}
                      onChange={set("cardName")}
                      placeholder="Mohan ram"
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                        Expiry
                      </label>
                      <input
                        value={form.expiry}
                        onChange={set("expiry")}
                        placeholder="MM/YY"
                        maxLength="5"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                        CVV
                      </label>
                      <input
                        value={form.cvv}
                        onChange={set("cvv")}
                        placeholder="•••"
                        maxLength="3"
                        type="password"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              )}
              {form.payMethod === "upi" && (
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                    UPI ID
                  </label>
                  <input placeholder="yourname@upi" className={inputClass} />
                </div>
              )}
              {form.payMethod === "cod" && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm text-orange-700">
                  <p className="font-semibold mb-1">Cash on Delivery</p>
                  <p>
                    Pay in cash when your order arrives. Additional ₹40 COD fee
                    may apply.
                  </p>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="border border-gray-200 text-gray-600 font-semibold px-6 py-3.5 rounded-xl hover:bg-gray-50 transition text-sm"
                >
                  ← Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-black py-3.5 rounded-xl transition active:scale-95 disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Place Order — $${total.toFixed(2)}`
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="lg:w-72 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-20">
            <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4 max-h-52 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 line-clamp-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400">× {item.quantity}</p>
                  </div>
                  <p className="text-xs font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span
                  className={subtotal > 50 ? "text-green-600 font-medium" : ""}
                >
                  {subtotal > 50 ? "FREE" : "$4.99"}
                </span>
              </div>
              <div className="flex justify-between font-black text-gray-900 text-base pt-2 border-t border-gray-100">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Card />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
