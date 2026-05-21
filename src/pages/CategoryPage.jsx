import { useState, useMemo } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import ProductCard from "../components/ui/ProductCard";
import { products, categories } from "../data/products";

export default function CategoryPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [sort, setSort] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    let list =
      id === "all" ? products : products.filter((p) => p.category === id);
    if (query)
      list = list.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()),
      );
    if (onlyInStock) list = list.filter((p) => p.inStock);
    list = list.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );
    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating);
      case "newest":
        return [...list]
          .filter((p) => p.badge === "New")
          .concat(list.filter((p) => p.badge !== "New"));
      default:
        return list;
    }
  }, [id, query, sort, priceRange, onlyInStock]);

  const catLabel =
    id === "all"
      ? "All Products"
      : categories.find((c) => c.id === id)?.name || id;

  const Sidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">
          Categories
        </h3>
        <ul className="space-y-1">
          <Link
            to="/category/all"
            className={`block px-3 py-2 rounded-xl text-sm font-medium transition ${id === "all" ? "bg-red-50 text-red-500" : "text-gray-600 hover:bg-gray-50"}`}
          >
            🛍️ All Products
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/category/${c.id}`}
              className={`block px-3 py-2 rounded-xl text-sm transition ${c.id === id ? "bg-red-50 text-red-500 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
            >
              {c.icon} {c.name}
            </Link>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">
          Price Range
        </h3>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="w-full accent-red-500"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">
          Availability
        </h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="w-4 h-4 accent-red-500 rounded"
          />
          <span className="text-sm text-gray-700">In Stock Only</span>
        </label>
      </div>

      <button
        onClick={() => {
          setSort("featured");
          setPriceRange([0, 500]);
          setOnlyInStock(false);
        }}
        className="w-full text-sm text-red-500 hover:text-red-600 font-medium py-2 border border-red-200 rounded-xl hover:bg-red-50 transition"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs text-gray-400 mb-1">
                <Link to="/" className="hover:text-red-500">
                  Home
                </Link>{" "}
                / {catLabel}
              </p>
              <h1 className="text-2xl font-black text-gray-900">
                {query ? `Results for "${query}"` : catLabel}
              </h1>
              <p className="text-gray-400 text-sm">
                {filtered.length} products found
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 hover:border-red-300 transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm3 6a1 1 0 011-1h10a1 1 0 010 2H7a1 1 0 01-1-1zm3 6a1 1 0 011-1h4a1 1 0 010 2h-4a1 1 0 01-1-1z"
                  />
                </svg>
                Filters
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 outline-none hover:border-red-300 focus:border-red-400 transition bg-white"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl p-6 overflow-y-auto">
            <div className="flex justify-between mb-6">
              <h2 className="font-black text-gray-900">Filters</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar desktop */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-20">
            <Sidebar />
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                No products found
              </h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your filters or search terms
              </p>
              <Link
                to="/category/all"
                className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-600 transition inline-block"
              >
                Browse All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
