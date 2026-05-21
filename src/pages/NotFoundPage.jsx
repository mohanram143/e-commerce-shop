import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="relative mb-8">
          <h1 className="text-[160px] font-black text-gray-100 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl">😕</div>
          </div>
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="bg-red-500 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-red-600 transition"
          >
            Go Home
          </Link>
          <Link
            to="/category/all"
            className="border border-gray-200 text-gray-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-50 transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
