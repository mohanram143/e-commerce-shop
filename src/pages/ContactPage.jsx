import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-red-300 transition placeholder-gray-400 text-gray-800";

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-red-900 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-black mb-3">Get in Touch</h1>
        <p className="text-white/70 text-lg">
          We're here to help. Reach out anytime!
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info cards */}
          <div className="space-y-4">
            {[
              {
                icon: "📍",
                title: "Our Office",
                lines: ["123 Shop Street", "Chennai, TN 600001", "India"],
              },
              {
                icon: "📞",
                title: "Phone",
                lines: ["+91 123 456 7890", "Mon–Sat, 9am–6pm"],
              },
              {
                icon: "✉️",
                title: "Email",
                lines: ["support@eshop.com", "business@eshop.com"],
              },
            ].map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-4"
              >
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <p className="font-bold text-gray-900 mb-1 text-sm">
                    {c.title}
                  </p>
                  {c.lines.map((l) => (
                    <p key={l} className="text-sm text-gray-500">
                      {l}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-xl font-black text-gray-900 mb-5">
              Send us a Message
            </h2>
            {sent && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-5 flex items-center gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <p className="font-semibold text-green-800 text-sm">
                    Message sent!
                  </p>
                  <p className="text-green-600 text-xs">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                    Name *
                  </label>
                  <input
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Your name"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="your@email.com"
                    required
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                  Subject
                </label>
                <select
                  value={form.subject}
                  onChange={set("subject")}
                  className={inputClass}
                >
                  <option value="">Select a topic...</option>
                  <option>Order Issue</option>
                  <option>Return / Refund</option>
                  <option>Product Query</option>
                  <option>Payment Problem</option>
                  <option>General Feedback</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                  Message *
                </label>
                <textarea
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Tell us how we can help..."
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white font-black py-3.5 rounded-xl transition active:scale-95"
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
