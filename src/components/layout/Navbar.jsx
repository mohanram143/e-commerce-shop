import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { clearUser } from "../../store/slices/authSlice";
import { selectCartCount } from "../../store/slices/cartSlice";
import { selectWishlistItems } from "../../store/slices/wishlistSlice";
import { toggleTheme, selectTheme } from "../../store/slices/themeSlice";
import { categories } from "../../data/products";
import LiquidEther from "../../pages/LiquidEther";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount   = useSelector(selectCartCount);
  const wishlist    = useSelector(selectWishlistItems);
  const { user, isAuthenticated } = useSelector((s) => s.auth);
  const theme       = useSelector(selectTheme);
  const dark        = theme === "dark";

  const [accountOpen, setAccountOpen]   = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [search, setSearch]             = useState("");
  const [scrolled, setScrolled]         = useState(false);
  const accountRef  = useRef(null);
  const categoryRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (accountRef.current  && !accountRef.current.contains(e.target))  setAccountOpen(false);
      if (categoryRef.current && !categoryRef.current.contains(e.target)) setCategoryOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
    navigate("/auth");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/category/all?q=${encodeURIComponent(search.trim())}`);
  };

  const navBg = dark
    ? scrolled ? "bg-black/95 shadow-lg shadow-black/30" : "bg-black/80"
    : scrolled ? "bg-white shadow-md"                    : "bg-white/95";

  const inputStyle = dark
    ? "bg-white/8 border-white/10 text-white placeholder-white/30 focus:border-red-500/60"
    : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-red-400";

  const textMuted = dark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900";
  const dropBg    = dark ? "bg-gray-900 border-gray-700/60" : "bg-white border-gray-100";
  const dropHover = dark ? "hover:bg-white/5" : "hover:bg-gray-50";

  return (
    <>
      <nav className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 ${navBg}`}
        style={{ borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` }}>
        <div className="max-w-7xl  mx-auto px-4">
        
                 <div className="flex items-center gap-3 h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30">
                <span className="text-white font-black text-sm">E</span>
              </div>
              <span className={`font-black text-lg hidden sm:block ${dark ? "text-white" : "text-gray-900"}`}>
                E-<span className="text-red-500">Shop</span>
              </span>
            </Link>

            {/* Category dropdown */}
            <div className="text-6xl relative hidden md:block" ref={categoryRef}>
              <button onClick={() => setCategoryOpen(!categoryOpen)}
                className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white px-3.5 py-2 rounded-xl text-sm font-semibold transition-all shadow-md shadow-red-500/20 active:scale-95">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
                <span className="hidden lg:inline">Categories</span>
                <svg className={`w-3 h-3 transition-transform ${categoryOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {categoryOpen && (
                <div className={`absolute top-full left-0 mt-2 w-52 rounded-2xl shadow-xl border py-2 z-50 ${dropBg}`}>
                  <Link to="/category/all" onClick={() => setCategoryOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition ${dark?"text-gray-200":"text-gray-800"} ${dropHover}`}>
                    🛍️ All Products
                  </Link>
                  {categories.map((c) => (
                    <Link key={c.id} to={`/category/${c.id}`} onClick={() => setCategoryOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition ${dark?"text-gray-300":"text-gray-700"} hover:text-red-500 ${dropHover}`}>
                      <span>{c.icon}</span>{c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:flex">
              <div className={`flex w-full border rounded-xl overflow-hidden transition-all ${inputStyle}`}>
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products, brands..."
                  className="flex-1 px-4 py-2.5 text-sm outline-none bg-transparent"/>
                <button type="submit" className="bg-red-500 hover:bg-red-600 px-5 text-white transition flex items-center shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </button>
              </div>
            </form>

            {/* Nav links */}
            <div className={`hidden lg:flex items-center gap-4 text-sm font-medium ${textMuted}`}>
              {[["About","/about"],["Contact","/contact"]].map(([label, to]) => (
                <Link key={to} to={to}
                  className={`transition-colors ${location.pathname === to ? "text-red-500" : ""}`}>
                  {label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-1 ml-auto">
              {/* Dark/Light toggle */}
              <button onClick={() => dispatch(toggleTheme())}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${dark?"hover:bg-white/8 text-yellow-400":"hover:bg-gray-100 text-gray-600"}`}
                title={dark ? "Switch to light mode" : "Switch to dark mode"}>
                {dark ? (
                  <svg className="w-4.5 h-4.5 w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"/>
                  </svg>
                ) : (
                  <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                  </svg>
                )}
              </button>

              {/* Wishlist */}
              <Link to="/wishlist" className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105 ${dark?"hover:bg-white/8 text-gray-300":"hover:bg-gray-100 text-gray-600"} hover:text-red-500`}>
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black leading-none">{wishlist.length}</span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105 ${dark?"hover:bg-white/8 text-gray-300":"hover:bg-gray-100 text-gray-600"} hover:text-red-500`}>
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black leading-none">{cartCount > 9 ? "9+" : cartCount}</span>
                )}
              </Link>

              {/* Account dropdown */}
              <div className="relative" ref={accountRef}>
                <button onClick={() => setAccountOpen(!accountOpen)}
                  className={`flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-xl transition-all hover:scale-105 ${dark?"hover:bg-white/8":"hover:bg-gray-100"}`}>
                  <div className="w-7 h-7 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-xs font-black">{user?.displayName?.[0]?.toUpperCase() || "U"}</span>
                  </div>
                  <svg className={`w-3 h-3 transition-transform hidden sm:block ${dark?"text-gray-400":"text-gray-500"} ${accountOpen?"rotate-180":""}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>

                {accountOpen && (
                  <div className={`absolute right-0 top-full mt-2 w-60 rounded-2xl shadow-2xl border py-2 z-50 ${dropBg}`}>
                    {isAuthenticated ? (
                      <>
                        <div className={`px-4 py-3 border-b ${dark?"border-gray-700/60":"border-gray-100"}`}>
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-black">{user?.displayName?.[0]?.toUpperCase() || "U"}</span>
                            </div>
                            <div className="min-w-0">
                              <p className={`text-sm font-bold truncate ${dark?"text-white":"text-gray-900"}`}>{user?.displayName || "User"}</p>
                              <p className={`text-xs truncate ${dark?"text-gray-500":"text-gray-400"}`}>{user?.email}</p>
                            </div>
                          </div>
                        </div>
                        {[
                          ["/account","👤","My Account"],
                          ["/wishlist","❤️",`Wishlist (${wishlist.length})`],
                          ["/cart","🛒",`Cart (${cartCount})`],
                        ].map(([to, icon, label]) => (
                          <Link key={to} to={to} onClick={() => setAccountOpen(false)}
                            className={`flex items-center gap-3 px-4 py-2.5 text-sm transition ${dark?"text-gray-300":"text-gray-700"} ${dropHover}`}>
                            <span>{icon}</span>{label}
                          </Link>
                        ))}
                        <div className={`border-t mt-1 pt-1 ${dark?"border-gray-700/60":"border-gray-100"}`}>
                          <button onClick={handleLogout}
                            className={`flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-500 w-full text-left transition ${dropHover}`}>
                            <span>🚪</span> Sign Out
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link to="/auth" onClick={() => setAccountOpen(false)}
                          className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition ${dark?"text-gray-200":"text-gray-800"} ${dropHover}`}>Sign In</Link>
                        <Link to="/auth" onClick={() => setAccountOpen(false)}
                          className={`flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 font-bold transition ${dropHover}`}>Create Account →</Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile menu toggle */}
              <button onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition ${dark?"hover:bg-white/8 text-gray-300":"hover:bg-gray-100 text-gray-600"}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}/>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className={`md:hidden border-t py-4 space-y-1 ${dark?"border-white/6":"border-gray-100"}`}>
              <form onSubmit={handleSearch} className="flex mb-4">
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..."
                  className={`flex-1 border rounded-l-xl px-3 py-2.5 text-sm outline-none ${dark?"bg-white/7 border-white/10 text-white placeholder-white/30":"bg-gray-50 border-gray-200 text-gray-800"}`}/>
                <button type="submit" className="bg-red-500 text-white px-4 rounded-r-xl text-sm hover:bg-red-600 transition">Search</button>
              </form>
              {[["Home","/"],["About","/about"],["Contact","/contact"]].map(([l,to]) => (
                <Link key={to} to={to} className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition ${dark?"text-gray-300 hover:bg-white/6":"text-gray-700 hover:bg-gray-50"} ${location.pathname===to?"text-red-500!":""}`}>{l}</Link>
              ))}
              <div className={`border-t my-2 ${dark?"border-white/6":"border-gray-100"}`}/>
              <p className={`px-3 py-1 text-xs font-bold uppercase tracking-wider ${dark?"text-gray-500":"text-gray-400"}`}>Categories</p>
              <Link to="/category/all" className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition ${dark?"text-gray-300 hover:bg-white/6":"text-gray-700 hover:bg-gray-50"}`}>🛍️ All Products</Link>
              {categories.map((c) => (
                <Link key={c.id} to={`/category/${c.id}`}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition ${dark?"text-gray-300 hover:bg-white/6":"text-gray-700 hover:bg-gray-50"}`}>
                  {c.icon} {c.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}