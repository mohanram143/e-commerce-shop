import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import {
  toggleWishlist,
  selectIsWishlisted,
} from "../../store/slices/wishlistSlice";
import { selectTheme } from "../../store/slices/themeSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const isWishlisted = useSelector(selectIsWishlisted(product.id));
  const dark = useSelector(selectTheme) === "dark";

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      }),
    );
  };
  const handleWishlist = (e) => {
    e.preventDefault();
    dispatch(
      toggleWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        rating: product.rating,
      }),
    );
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className={`group rounded-2xl overflow-hidden transition-all duration-300 block hover:-translate-y-0.5 ${dark ? "bg-[#1e1e1e] border border-[#2d2d2d] hover:border-red-500/30 hover:shadow-xl hover:shadow-red-500/5" : "bg-white border border-gray-100 hover:border-red-100 hover:shadow-lg"}`}
    >
      {/* Image */}
      <div
        className={`relative aspect-square overflow-hidden ${dark ? "bg-[#2a2a2a]" : "bg-gray-50"}`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
        {!product.inStock && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            <span className="bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
        <button
          onClick={handleWishlist}
          className={`absolute bottom-2 right-2 w-8 h-8 rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 ${dark ? "bg-gray-800" : "bg-white"}`}
        >
          <svg
            className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : dark ? "text-gray-300" : "text-gray-400"}`}
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

      {/* Info */}
      <div className="p-3">
        <p
          className={`text-[11px] capitalize mb-1 font-medium ${dark ? "text-gray-500" : "text-gray-400"}`}
        >
          {product.category}
        </p>
        <h3
          className={`text-sm font-semibold line-clamp-2 mb-2 leading-tight ${dark ? "text-gray-100" : "text-gray-900"}`}
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg
                key={s}
                className={`w-3 h-3 ${s <= Math.round(product.rating) ? "text-yellow-400 fill-current" : dark ? "text-gray-700 fill-current" : "text-gray-200 fill-current"}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span
            className={`text-[11px] ${dark ? "text-gray-500" : "text-gray-400"}`}
          >
            ({product.reviews.toLocaleString()})
          </span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-base font-black ${dark ? "text-white" : "text-gray-900"}`}
          >
            ${product.price}
          </span>
          {product.originalPrice && (
            <span
              className={`text-xs line-through ${dark ? "text-gray-600" : "text-gray-400"}`}
            >
              ${product.originalPrice}
            </span>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:text-gray-400 text-white text-xs font-bold py-2 rounded-xl transition active:scale-95 shadow-sm"
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </Link>
  );
}
