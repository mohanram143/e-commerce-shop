import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import {
  toggleWishlist,
  selectIsWishlisted,
} from "../store/slices/wishlistSlice";
import ProductCard from "../components/ui/ProductCard";
import { products } from "../data/products";

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === +id);
  const isWishlisted = useSelector(selectIsWishlisted(+id));
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-6xl">😕</p>
        <h2 className="text-2xl font-black text-gray-800">Product not found</h2>
        <Link
          to="/category/all"
          className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-600 transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        }),
      );
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-400">
          <Link to="/" className="hover:text-red-500">
            Home
          </Link>
          {" / "}
          <Link
            to={`/category/${product.category}`}
            className="hover:text-red-500 capitalize"
          >
            {product.category}
          </Link>
          {" / "}
          <span className="text-gray-700 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main product section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Image */}
            <div className="md:w-2/5">
              <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
                {discount && (
                  <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    -{discount}%
                  </span>
                )}
              </div>
              {/* Thumbnails (same image for demo) */}
              <div className="grid grid-cols-4 gap-2 mt-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-50 rounded-xl overflow-hidden border-2 border-red-200 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt=""
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="md:w-3/5 flex flex-col gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-1 capitalize">
                  {product.category}
                </p>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-3">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg
                        key={s}
                        className={`w-5 h-5 ${s <= Math.round(product.rating) ? "text-yellow-400 fill-current" : "text-gray-200 fill-current"}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="font-bold text-gray-900">
                    {product.rating}
                  </span>
                  <span className="text-gray-400 text-sm">
                    ({product.reviews.toLocaleString()} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-4xl font-black text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                      <span className="bg-green-100 text-green-600 text-sm font-bold px-2 py-0.5 rounded-lg">
                        Save $
                        {(product.originalPrice - product.price).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>

                {/* Stock status */}
                <div className="flex items-center gap-2 mb-6">
                  <div
                    className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-400" : "bg-red-400"}`}
                  />
                  <span
                    className={`text-sm font-semibold ${product.inStock ? "text-green-600" : "text-red-500"}`}
                  >
                    {product.inStock
                      ? "In Stock — Ready to ship"
                      : "Out of Stock"}
                  </span>
                </div>
              </div>

              {/* Quantity */}
              {product.inStock && (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-700">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-50 text-lg font-bold transition"
                    >
                      −
                    </button>
                    <span className="px-5 py-2 font-bold text-gray-900 border-x border-gray-200">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-50 text-lg font-bold transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 min-w-[140px] font-bold py-3.5 rounded-xl transition active:scale-95 text-sm ${
                    added
                      ? "bg-green-500 text-white"
                      : "bg-red-500 hover:bg-red-600 text-white disabled:bg-gray-200 disabled:text-gray-400"
                  }`}
                >
                  {added ? "✓ Added to Cart!" : "Add to Cart"}
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="flex-1 min-w-[140px] bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl transition active:scale-95 text-sm disabled:bg-gray-200 disabled:text-gray-400"
                >
                  Buy Now
                </button>
                <button
                  onClick={() =>
                    dispatch(
                      toggleWishlist({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        rating: product.rating,
                      }),
                    )
                  }
                  className={`p-3.5 rounded-xl border transition ${isWishlisted ? "bg-red-50 border-red-200 text-red-500" : "border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400"}`}
                >
                  <svg
                    className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                    fill={isWishlisted ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  ["🚚", "Free Shipping", "Orders over $50"],
                  ["🔄", "Easy Returns", "30-day policy"],
                  ["🔒", "Secure Pay", "SSL encrypted"],
                ].map(([icon, title, sub]) => (
                  <div
                    key={title}
                    className="bg-gray-50 rounded-xl p-3 text-center"
                  >
                    <span className="text-xl">{icon}</span>
                    <p className="text-xs font-bold text-gray-800 mt-1">
                      {title}
                    </p>
                    <p className="text-xs text-gray-400">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <div className="flex gap-1 border-b border-gray-100 mb-6">
            {["description", "specifications", "reviews"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-4 py-2.5 text-sm font-semibold capitalize transition border-b-2 -mb-px ${activeTab === t ? "border-red-500 text-red-500" : "border-transparent text-gray-500 hover:text-gray-700"}`}
              >
                {t}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <div className="prose prose-sm max-w-none text-gray-600">
              <p>{product.description}</p>
              <ul className="mt-4 space-y-2">
                <li>✅ Premium quality materials and craftsmanship</li>
                <li>✅ Includes full manufacturer warranty</li>
                <li>✅ Fast delivery — ships within 2-3 business days</li>
                <li>✅ Compatible with all major platforms</li>
              </ul>
            </div>
          )}

          {activeTab === "specifications" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                ["Brand", "E-Shop Premium"],
                ["Category", product.category],
                ["Rating", `${product.rating}/5`],
                ["Reviews", product.reviews.toLocaleString()],
                ["Availability", product.inStock ? "In Stock" : "Out of Stock"],
                ["SKU", `ESH-${product.id.toString().padStart(4, "0")}`],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3 bg-gray-50 rounded-xl p-3">
                  <span className="text-sm font-semibold text-gray-500 w-28 shrink-0">
                    {k}
                  </span>
                  <span className="text-sm text-gray-900 capitalize">{v}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              {[
                {
                  name: "Arjun K.",
                  rating: 5,
                  comment:
                    "Absolutely love this product! Great quality and fast shipping.",
                  date: "2 days ago",
                },
                {
                  name: "Priya M.",
                  rating: 4,
                  comment:
                    "Very good product, exactly as described. Would recommend.",
                  date: "1 week ago",
                },
                {
                  name: "Rahul S.",
                  rating: 5,
                  comment:
                    "Fantastic! Way better than expected. Will buy again.",
                  date: "2 weeks ago",
                },
              ].map((r, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-500 text-sm">
                        {r.name[0]}
                      </div>
                      <span className="font-semibold text-gray-900 text-sm">
                        {r.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">{r.date}</span>
                  </div>
                  <div className="flex mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg
                        key={s}
                        className={`w-4 h-4 ${s <= r.rating ? "text-yellow-400 fill-current" : "text-gray-200 fill-current"}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-xl font-black text-gray-900 mb-4">
              Related Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
