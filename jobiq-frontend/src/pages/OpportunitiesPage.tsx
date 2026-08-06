import { useEffect, useState } from "react";

import { getOpportunities, Opportunity } from "../api/opportunities";

function OpportunitiesPage() {
  const [items, setItems] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const response = await getOpportunities();
        if (mounted) {
          setItems(response.items);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load opportunities");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Opportunities</h1>
        <p className="mt-2 text-slate-600">Loading opportunities...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Opportunities</h1>
        <p className="mt-2 text-red-600">{error}</p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Opportunities</h1>
        <p className="mt-2 text-slate-600">
          Backend-connected starter feed. Advanced filters and ranking will come next.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border bg-white p-6 text-slate-600 shadow-sm">
          No opportunities available yet.
        </div>
      ) : (
        items.map((item) => (
          <article key={item.id} className="rounded-lg border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="mt-1 text-slate-700">{item.company}</p>
            {item.location ? <p className="mt-1 text-sm text-slate-500">{item.location}</p> : null}
            {item.description ? <p className="mt-3 text-sm text-slate-600">{item.description}</p> : null}
          </article>
        ))
      )}
    </section>
  );
}

export default OpportunitiesPage;
