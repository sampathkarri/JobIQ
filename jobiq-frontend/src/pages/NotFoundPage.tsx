import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">404</h1>
      <p className="mt-4 text-xl font-semibold text-white">Page not found</p>
      <p className="mt-2 text-slate-400">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all">
        Return to Dashboard
      </Link>
    </section>
  );
}

export default NotFoundPage;
