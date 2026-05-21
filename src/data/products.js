export const categories = [
  { id: "gaming", name: "Gaming", icon: "🎮" },
  { id: "electronics", name: "Electronics", icon: "📱" },
  { id: "fashion", name: "Fashion", icon: "👗" },
  { id: "accessories", name: "Accessories", icon: "🎧" },
  { id: "sports", name: "Sports", icon: "⚽" },
];

export const products = [
  // Gaming
  {
    id: 1,
    name: "PlayStation 5 Controller",
    category: "gaming",
    price: 69.99,
    originalPrice: 89.99,
    rating: 4.8,
    reviews: 2341,
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&q=80",
    badge: "Best Seller",
    inStock: true,
    description:
      "The DualSense wireless controller for PS5 offers immersive haptic feedback, dynamic adaptive triggers and a built-in microphone.",
  },
  {
    id: 2,
    name: "Gaming Headset Pro",
    category: "gaming",
    price: 129.99,
    originalPrice: 179.99,
    rating: 4.6,
    reviews: 987,
    image:
      "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&q=80",
    badge: "Sale",
    inStock: true,
    description:
      "7.1 surround sound gaming headset with noise-cancelling microphone and RGB lighting.",
  },
  {
    id: 3,
    name: "Mechanical Keyboard RGB",
    category: "gaming",
    price: 149.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 1203,
    image:
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&q=80",
    badge: "New",
    inStock: true,
    description:
      "Compact TKL mechanical keyboard with Cherry MX switches and per-key RGB lighting.",
  },
  {
    id: 4,
    name: "Gaming Mouse 16000 DPI",
    category: "gaming",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviews: 654,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80",
    badge: null,
    inStock: true,
    description:
      "Precision gaming mouse with 16000 DPI sensor and 11 programmable buttons.",
  },
  {
    id: 5,
    name: "Racing Wheel & Pedals",
    category: "gaming",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.9,
    reviews: 432,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    badge: "Hot",
    inStock: false,
    description:
      "Force feedback racing wheel with magnetic pedals for the ultimate sim racing experience.",
  },
  {
    id: 6,
    name: "Nintendo Switch OLED",
    category: "gaming",
    price: 349.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 5678,
    image:
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&q=80",
    badge: "Popular",
    inStock: true,
    description:
      "The Nintendo Switch OLED model features a vibrant 7-inch OLED screen.",
  },

  // Electronics
  {
    id: 7,
    name: "iPhone 15 Pro Case",
    category: "electronics",
    price: 29.99,
    originalPrice: 49.99,
    rating: 4.3,
    reviews: 321,
    image:
      "https://images.unsplash.com/photo-1601593346740-925612772716?w=400&q=80",
    badge: "Sale",
    inStock: true,
    description:
      "Premium titanium-finish protective case for iPhone 15 Pro with MagSafe support.",
  },
  {
    id: 8,
    name: "Wireless Earbuds ANC",
    category: "electronics",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.7,
    reviews: 1876,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80",
    badge: "Best Seller",
    inStock: true,
    description:
      "Active noise-cancelling true wireless earbuds with 30-hour battery life.",
  },
  {
    id: 9,
    name: '4K Smart TV 55"',
    category: "electronics",
    price: 699.99,
    originalPrice: 899.99,
    rating: 4.6,
    reviews: 892,
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=400&q=80",
    badge: "Sale",
    inStock: true,
    description:
      "55-inch 4K QLED smart TV with HDR10+ and built-in voice assistant.",
  },
  {
    id: 10,
    name: "Laptop Stand Aluminium",
    category: "electronics",
    price: 49.99,
    originalPrice: null,
    rating: 4.4,
    reviews: 543,
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80",
    badge: "New",
    inStock: true,
    description:
      'Adjustable aluminum laptop stand compatible with all MacBooks and laptops up to 17".',
  },

  // Fashion
  {
    id: 11,
    name: "Oversized Hoodie Black",
    category: "fashion",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.5,
    reviews: 234,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80",
    badge: "Trending",
    inStock: true,
    description:
      "Ultra-soft fleece oversized hoodie with kangaroo pocket. Available in multiple colors.",
  },
  {
    id: 12,
    name: "Leather Sneakers White",
    category: "fashion",
    price: 119.99,
    originalPrice: 159.99,
    rating: 4.6,
    reviews: 678,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    badge: "Hot",
    inStock: true,
    description:
      "Premium leather sneakers with cushioned sole and minimalist design.",
  },
  {
    id: 13,
    name: "Cargo Pants Slim Fit",
    category: "fashion",
    price: 79.99,
    originalPrice: null,
    rating: 4.3,
    reviews: 145,
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&q=80",
    badge: null,
    inStock: true,
    description:
      "Modern slim-fit cargo pants with multiple pockets and stretch fabric.",
  },

  // Accessories
  {
    id: 14,
    name: "Smart Watch Series X",
    category: "accessories",
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.7,
    reviews: 2109,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    badge: "Best Seller",
    inStock: true,
    description:
      "Advanced health monitoring smartwatch with ECG, blood oxygen sensor and 7-day battery.",
  },
  {
    id: 15,
    name: "Sunglasses Polarized",
    category: "accessories",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.4,
    reviews: 432,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80",
    badge: "Sale",
    inStock: true,
    description: "UV400 polarized sunglasses with lightweight titanium frame.",
  },
  {
    id: 16,
    name: "Leather Wallet Slim",
    category: "accessories",
    price: 39.99,
    originalPrice: null,
    rating: 4.5,
    reviews: 876,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80",
    badge: null,
    inStock: true,
    description:
      "Genuine leather bifold wallet with RFID blocking technology, holds up to 10 cards.",
  },

  // Sports
  {
    id: 17,
    name: "Yoga Mat Premium",
    category: "sports",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.6,
    reviews: 1234,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
    badge: "Sale",
    inStock: true,
    description:
      "6mm thick non-slip yoga mat with alignment lines and carry strap.",
  },
  {
    id: 18,
    name: "Resistance Bands Set",
    category: "sports",
    price: 29.99,
    originalPrice: null,
    rating: 4.4,
    reviews: 567,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    badge: "New",
    inStock: true,
    description:
      "Set of 5 resistance bands with varying tension levels for full-body workouts.",
  },
];

export const heroSlides = [
  {
    id: 1,
    title: "Next-Gen Gaming",
    subtitle: "PlayStation 5 Controllers & Accessories",
    discount: "Up to 30% OFF",
    bg: "from-gray-900 via-red-950 to-gray-900",
    accent: "#ef4444",
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80",
  },
  {
    id: 2,
    title: "Premium Fashion",
    subtitle: "Streetwear & Sneakers Collection 2025",
    discount: "New Arrivals",
    bg: "from-gray-900 via-purple-950 to-gray-900",
    accent: "#a855f7",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  },
  {
    id: 3,
    title: "Smart Electronics",
    subtitle: "Earbuds, Watches & More",
    discount: "Save up to 40%",
    bg: "from-gray-900 via-blue-950 to-gray-900",
    accent: "#3b82f6",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
  },
];
