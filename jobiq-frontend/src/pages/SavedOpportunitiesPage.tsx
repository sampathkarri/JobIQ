import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bookmark, Trash2, Building2, MapPin, DollarSign, Globe } from "lucide-react";
import { savedOpportunitiesApi } from "../api/savedOpportunities";

function SavedOpportunitiesPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["savedOpportunities"],
    queryFn: () => savedOpportunitiesApi.getSavedOpportunities(),
  });

  const unsaveMutation = useMutation({
    mutationFn: (opportunityId: number) => savedOpportunitiesApi.unsaveOpportunity(opportunityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedOpportunities"] });
    },
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Bookmark className="w-7 h-7 text-amber-400" />
          Saved Opportunities
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Your bookmarked jobs, internships, and hackathons saved for future application.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="h-44 bg-slate-900/50 rounded-2xl animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : data?.items && data.items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.items.map((saved) => {
            const opp = saved.opportunity;

            return (
              <div
                key={saved.id}
                className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-xl hover:border-amber-500/40 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {opp?.type || "Bookmarked"}
                    </span>
                    <button
                      onClick={() => unsaveMutation.mutate(saved.opportunity_id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {opp?.title || `Opportunity #${saved.opportunity_id}`}
                    </h3>
                    <p className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mt-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      {opp?.company || `Company #${saved.opportunity_id}`}
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-400 pt-1">
                    {opp?.location && (
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {opp.location}
                      </p>
                    )}

                    {(opp?.salary_min || opp?.salary_max) && (
                      <p className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <DollarSign className="w-3.5 h-3.5" />
                        ${opp.salary_min?.toLocaleString()} - ${opp.salary_max?.toLocaleString()}
                      </p>
                    )}

                    <p className="text-[11px] text-slate-500">
                      Saved on {new Date(saved.saved_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {opp?.source_url && (
                  <div className="pt-3 border-t border-slate-800/80 flex justify-end">
                    <a
                      href={opp.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 text-xs font-semibold border border-slate-700 transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>View Live Job Link</span>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <Bookmark className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No saved opportunities yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Click the bookmark icon on any job card in the Opportunities discovery page to save it here.
          </p>
        </div>
      )}
    </div>
  );
}

export default SavedOpportunitiesPage;
