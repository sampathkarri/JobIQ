import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bookmark, Trash2, Send, ExternalLink, Briefcase } from "lucide-react";
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
            <div key={i} className="h-36 bg-slate-900/50 rounded-2xl animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : data?.items && data.items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.items.map((saved) => (
            <div
              key={saved.id}
              className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex items-center justify-between gap-4 shadow-xl hover:border-amber-500/40 transition-all"
            >
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Bookmarked #{saved.id}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Opportunity ID: #{saved.opportunity_id}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Saved on {new Date(saved.saved_at).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => unsaveMutation.mutate(saved.opportunity_id)}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-800 transition-colors"
                  title="Remove Bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
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
