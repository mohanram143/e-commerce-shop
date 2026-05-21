import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTheme } from "../store/slices/themeSlice";
import ProductCard from "../components/ui/ProductCard";
import { products, categories, heroSlides } from "../data/products";

export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();
  const dark = useSelector(selectTheme) === "dark";

  useEffect(() => {
    const t = setInterval(
      () => setSlide((s) => (s + 1) % heroSlides.length),
      4500,
    );
    return () => clearInterval(t);
  }, []);

  const featured = products
    .filter((p) => p.badge === "Best Seller")
    .slice(0, 4);
  const newArrivals = products.filter((p) => p.badge === "New").slice(0, 4);
  const onSale = products.filter((p) => p.originalPrice).slice(0, 8);
  const gaming = products.filter((p) => p.category === "gaming").slice(0, 4);
  const current = heroSlides[slide];

  const sectionBg = dark ? "bg-[#0f0f0f]" : "bg-gray-50";
  const cardBg = dark
    ? "bg-[#1e1e1e] border-[#2d2d2d]"
    : "bg-white border-gray-100";
  const textMain = dark ? "text-white" : "text-gray-900";
  const textMuted = dark ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`min-h-screen ${sectionBg}`}>
      {/* ── HERO SLIDER ── */}
      <section className="relative overflow-hidden">
        <div
          className={`bg-gradient-to-r ${current.bg} transition-all duration-700 min-h-[400px] sm:min-h-[480px]`}
        >
          <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-white z-10">
              <span className="inline-flex items-center gap-1.5 bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                ⚡ {current.discount}
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight mb-4">
                {current.title}
              </h1>
              <p className="text-white/60 text-base sm:text-lg mb-8 max-w-md">
                {current.subtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/category/all")}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold px-7 py-3 rounded-xl transition active:scale-95 shadow-lg shadow-red-500/30"
                >
                  Shop Now →
                </button>
                <button
                  onClick={() => navigate("/about")}
                  className="border border-white/20 text-white hover:bg-white/10 font-semibold px-7 py-3 rounded-xl transition backdrop-blur-sm"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="flex-1 flex justify-center md:justify-end">
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-3xl blur-3xl opacity-40"
                  style={{ background: current.accent }}
                />
                <img
                  src={current.image}
                  alt="hero"
                  className="relative w-64 sm:w-80 md:w-96 h-52 sm:h-64 md:h-80 object-cover rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Slide dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`rounded-full transition-all ${i === slide ? "w-6 h-2 bg-red-500" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`}
            />
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="max-w-7xl mx-auto px-4 py-8 sm:py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className={`text-xl sm:text-2xl font-black ${textMain}`}>
            Shop by Category
          </h2>
          <Link
            to="/category/all"
            className="text-red-500 text-sm font-semibold hover:text-red-400 transition"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/category/${c.id}`}
              className={`flex flex-col items-center gap-2 rounded-2xl p-3 sm:p-4 border transition-all group hover:-translate-y-0.5 ${dark ? "bg-[#1e1e1e] border-[#2d2d2d] hover:border-red-500/30" : "bg-white border-gray-100 hover:border-red-200 hover:shadow-md"}`}
            >
              <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">
                {c.icon}
              </span>
              <span
                className={`text-[11px] sm:text-xs font-semibold text-center ${dark ? "text-gray-400" : "text-gray-700"}`}
              >
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── PROMO BANNERS ── */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className="md:col-span-2 rounded-2xl p-6 sm:p-8 flex items-center gap-6 overflow-hidden relative"
            style={{
              background:
                "linear-gradient(135deg, #111 0%, #1a0505 50%, #2d0a0a 100%)",
            }}
          >
            <div className="relative z-10">
              <span className="text-red-400 text-xs font-black uppercase tracking-widest block mb-2">
                ⚡ Special Offer
              </span>
              <h3 className="text-white text-xl sm:text-2xl font-black mb-3">
                Gaming Deals
                <br />
                Up to 40% OFF
              </h3>
              <Link
                to="/category/gaming"
                className="inline-block bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition active:scale-95"
              >
                Shop Gaming →
              </Link>
            </div>
            <img
              src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&q=80"
              className="absolute right-0 top-0 h-full w-40 object-cover opacity-20 rounded-r-2xl"
              alt=""
            />
          </div>
          <div
            className="rounded-2xl p-6 flex flex-col justify-between"
            style={{
              background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
            }}
          >
            <div>
              <span className="text-purple-300 text-xs font-black uppercase tracking-widest block mb-2">
                New Collection
              </span>
              <h3 className="text-white text-xl font-black mb-2">
                Fashion 2025
              </h3>
              <p className="text-purple-300 text-sm mb-5">
                Streetwear & Sneakers
              </p>
            </div>
            <Link
              to="/category/fashion"
              className="inline-block bg-white text-purple-800 text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-purple-50 transition"
            >
              Explore →
            </Link>
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS ── */}
      <Section
        title="Best Sellers"
        sub="Most loved by our customers"
        dark={dark}
        textMain={textMain}
        textMuted={textMuted}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      {/* ── FLASH SALE ── */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white text-center sm:text-left">
            <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">
              ⚡ Flash Sale
            </p>
            <h3 className="text-xl sm:text-2xl font-black">
              Today's Hottest Deals
            </h3>
          </div>
          <Link
            to="/category/all"
            className="bg-white text-red-500 font-black px-6 py-3 rounded-xl hover:bg-red-50 transition shrink-0 active:scale-95"
          >
            Grab Now →
          </Link>
        </div>
      </section>

      {/* ── ON SALE ── */}
      <Section
        title="On Sale"
        sub="Limited time discounts"
        dark={dark}
        textMain={textMain}
        textMuted={textMuted}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {onSale.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      {/* ── GAMING ZONE ── */}
      <section
        className={`py-10 sm:py-12 ${dark ? "bg-[#0a0a0a]" : "bg-gray-900"}`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                🎮 Gaming Zone
              </h2>
              <p className="text-gray-500 text-sm mt-0.5">
                Top picks for gamers
              </p>
            </div>
            <Link
              to="/category/gaming"
              className="text-red-400 hover:text-red-300 text-sm font-semibold transition"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {gaming.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ── */}
      <Section
        title="New Arrivals"
        sub="Fresh stock just landed"
        dark={dark}
        textMain={textMain}
        textMuted={textMuted}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      {/* ── FEATURES ── */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            ["🚚", "Free Shipping", "On orders above $50"],
            ["🔄", "Easy Returns", "30-day policy"],
            ["🔒", "Secure Payment", "SSL encrypted"],
            ["💬", "24/7 Support", "Always here"],
          ].map(([icon, title, desc]) => (
            <div
              key={title}
              className={`rounded-2xl p-4 border flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left transition-all hover:-translate-y-0.5 ${dark ? "bg-[#1e1e1e] border-[#2d2d2d]" : "bg-white border-gray-100 hover:shadow-md"}`}
            >
              <span className="text-2xl sm:text-3xl">{icon}</span>
              <div>
                <p className={`font-bold text-sm ${textMain}`}>{title}</p>
                <p className={`text-xs mt-0.5 ${textMuted}`}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Section({ title, sub, dark, textMain, textMuted, children }) {
  return (
    <section className="max-w-7xl mx-auto px-4 pb-8 sm:pb-10">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className={`text-xl sm:text-2xl font-black ${textMain}`}>
            {title}
          </h2>
          {sub && <p className={`text-sm mt-0.5 ${textMuted}`}>{sub}</p>}
        </div>
        <Link
          to="/category/all"
          className="text-red-500 hover:text-red-400 text-sm font-semibold transition"
        >
          View All →
        </Link>
      </div>
      {children}
    </section>
  );
}
