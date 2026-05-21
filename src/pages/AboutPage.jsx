import { Link } from "react-router-dom";

const team = [
  {
    name: "Arjun Sharma",
    role: "CEO & Founder",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
  {
    name: "Priya Nair",
    role: "Head of Design",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    name: "Karthik R",
    role: "Tech Lead",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-900 to-red-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-black mb-4">Our Story</h1>
          <p className="text-white/70 text-xl leading-relaxed max-w-2xl mx-auto">
            E-Shop was founded with a simple mission — bring premium products at
            honest prices to every doorstep in India and beyond.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            ["50K+", "Happy Customers"],
            ["200+", "Brand Partners"],
            ["18", "Cities Served"],
            ["4.8★", "Avg. Rating"],
          ].map(([num, label]) => (
            <div key={label} className="bg-gray-50 rounded-2xl p-6">
              <p className="text-3xl font-black text-red-500 mb-1">{num}</p>
              <p className="text-sm text-gray-500 font-semibold">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              We believe great products shouldn't cost a fortune. E-Shop curates
              the best in gaming, electronics, fashion, and accessories —
              sourced directly from trusted brands and delivered to you with
              care.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We're more than an e-commerce platform. We're a community that
              values quality, transparency, and customer happiness above all
              else.
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8">
            <ul className="space-y-4">
              {[
                [
                  "🎯",
                  "Customer First",
                  "Every decision we make puts customers first.",
                ],
                [
                  "💎",
                  "Quality Products",
                  "We only sell what we'd buy ourselves.",
                ],
                [
                  "🌍",
                  "Community",
                  "Building relationships, not just transactions.",
                ],
              ].map(([icon, title, desc]) => (
                <li key={title} className="flex gap-4">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <p className="font-bold text-gray-900 mb-0.5">{title}</p>
                    <p className="text-sm text-gray-500">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-black text-gray-900 text-center mb-10">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {team.map((m) => (
            <div
              key={m.name}
              className="text-center bg-gray-50 rounded-2xl p-6"
            >
              <img
                src={m.img}
                alt={m.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 ring-4 ring-red-100"
              />
              <p className="font-black text-gray-900">{m.name}</p>
              <p className="text-sm text-red-500 font-semibold">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red-500 py-16 px-4 text-center">
        <h2 className="text-3xl font-black text-white mb-4">
          Ready to start shopping?
        </h2>
        <p className="text-red-100 mb-8">
          Join thousands of happy customers today.
        </p>
        <Link
          to="/category/all"
          className="bg-white text-red-500 font-black px-8 py-4 rounded-xl hover:bg-red-50 transition inline-block"
        >
          Shop Now →
        </Link>
      </section>
    </div>
  );
}
