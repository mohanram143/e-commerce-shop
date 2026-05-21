import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartCount,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyCoupon,
} from "../store/slices/cartSlice";
import Card from "./Card";
import LiquidEther from "./LiquidEther";

const COUPONS = { SAVE10: 10, WELCOME20: 20, FLASH30: 30 };

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const count = useSelector(selectCartCount);
  const [couponInput, setCouponInput] = useState("");
  const [couponApplied, setCouponApplied] = useState(null);
  const [couponError, setCouponError] = useState("");

  const discount = couponApplied
    ? (subtotal * COUPONS[couponApplied]) / 100
    : 0;
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal - discount + shipping;

  const handleCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (COUPONS[code]) {
      setCouponApplied(code);
      dispatch(applyCoupon(code));
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-black text-gray-900 mb-3">
            Your cart is empty
          </h2>
          <p className="text-gray-400 mb-8">
            Looks like you haven't added anything yet!
          </p>
          <Link
            to="/category/all"
            className="bg-red-500 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-red-600 transition inline-block"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <h1 className="text-2xl font-black text-gray-900">Shopping Cart</h1>
          <p className="text-gray-400 text-sm">
            {count} item{count !== 1 ? "s" : ""} in your cart
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">
        {/* Cart items */}
        <div className="flex-1 space-y-4">
          {/* Header */}
          <div className="hidden sm:grid grid-cols-12 text-xs font-bold text-gray-400 uppercase tracking-wider px-4">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Qty</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 p-4"
            >
              <div className="grid grid-cols-12 items-center gap-4">
                {/* Product */}
                <div className="col-span-12 sm:col-span-6 flex items-center gap-4">
                  <Link
                    to={`/product/${item.id}`}
                    className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.id}`}
                      className="font-semibold text-gray-900 text-sm hover:text-red-500 transition line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-xs text-red-400 hover:text-red-600 mt-1 flex items-center gap-1 transition"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-4 sm:col-span-2 text-center">
                  <p className="text-xs text-gray-400 sm:hidden mb-0.5">
                    Price
                  </p>
                  <p className="font-semibold text-gray-900">${item.price}</p>
                </div>

                {/* Qty */}
                <div className="col-span-4 sm:col-span-2 flex justify-center">
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity - 1,
                          }),
                        )
                      }
                      className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 font-bold text-sm transition"
                    >
                      −
                    </button>
                    <span className="px-3 py-1.5 font-bold text-sm border-x border-gray-200">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity + 1,
                          }),
                        )
                      }
                      className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 font-bold text-sm transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="col-span-4 sm:col-span-2 text-right">
                  <p className="text-xs text-gray-400 sm:hidden mb-0.5">
                    Total
                  </p>
                  <p className="font-black text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-between">
            <Link
              to="/category/all"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition font-medium"
            >
              ← Continue Shopping
            </Link>
            <button
              onClick={() => dispatch(clearCart())}
              className="text-sm text-red-400 hover:text-red-600 transition font-medium"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:w-80 shrink-0 space-y-4">
          {/* Coupon */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-3">Coupon Code</h3>
            <div className="flex gap-2">
              <input
                value={couponInput}
                onChange={(e) => {
                  setCouponInput(e.target.value);
                  setCouponError("");
                }}
                placeholder="Enter code..."
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-red-300 transition"
              />
              <button
                onClick={handleCoupon}
                disabled={!!couponApplied}
                className="bg-red-500 text-white text-sm font-bold px-4 rounded-xl hover:bg-red-600 disabled:bg-green-500 transition"
              >
                {couponApplied ? "✓" : "Apply"}
              </button>
            </div>
            {couponError && (
              <p className="text-red-500 text-xs mt-1">{couponError}</p>
            )}
            {couponApplied && (
              <p className="text-green-600 text-xs mt-1 font-semibold">
                ✓ {couponApplied} applied — {COUPONS[couponApplied]}% off!
              </p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              Try: SAVE10, WELCOME20, FLASH30
            </p>
          </div>

          {/* Order summary */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({count} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount ({COUPONS[couponApplied]}%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span
                  className={shipping === 0 ? "text-green-600 font-medium" : ""}
                >
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-orange-500">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                </p>
              )}
              <div className="border-t border-gray-100 pt-3 flex justify-between font-black text-gray-900 text-base">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-black py-3.5 rounded-xl transition mt-5 active:scale-95"
            >
              Proceed to Checkout →
            </button>
            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-400">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Secure SSL encrypted checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
