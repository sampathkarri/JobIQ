import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="rounded-lg border bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-slate-600">The route you requested does not exist in the current scaffold.</p>
      <Link to="/" className="mt-4 inline-block text-indigo-600 hover:text-indigo-700">
        Return to dashboard
      </Link>
    </section>
  );
}

export default NotFoundPage;
