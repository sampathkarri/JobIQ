import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Sparkles, CheckCircle, XCircle, MapPin, Building2, ExternalLink, PlusCircle } from "lucide-react";
import { jobMatchesApi } from "../api/jobMatches";
import { applicationsApi } from "../api/applications";

function JobMatchesPage() {
  const [minScore, setMinScore] = useState(0);
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());
  const queryClient = useQueryClient();

  const addToPipelineMutation = useMutation({
    mutationFn: (opportunityId: number) =>
      applicationsApi.createApplication({ opportunity_id: opportunityId, status: "interested" }),
    onSuccess: (_, opportunityId) => {
      setAddedIds((prev) => new Set(prev).add(opportunityId));
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["jobMatches", minScore],
    queryFn: () => jobMatchesApi.getJobMatches(minScore),
  });

  const typeLabel = (type: string | null | undefined) => {
    if (!type) return null;
    const map: Record<string, string> = {
      job: "Job",
      internship: "Internship",
      hackathon: "Hackathon",
      competition: "Competition",
    };
    return map[type] ?? type;
  };

  const typeColor = (type: string | null | undefined) => {
    const map: Record<string, string> = {
      job: "bg-blue-500/10 text-blue-300 border-blue-500/20",
      internship: "bg-teal-500/10 text-teal-300 border-teal-500/20",
      hackathon: "bg-orange-500/10 text-orange-300 border-orange-500/20",
      competition: "bg-pink-500/10 text-pink-300 border-pink-500/20",
    };
    return map[type ?? ""] ?? "bg-slate-500/10 text-slate-300 border-slate-500/20";
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-purple-400" />
            AI Match Recommendations
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Pre-calculated TF-IDF cosine similarity scores comparing your resume skills with active job requirements.
          </p>
        </div>

        {/* Filter Min Score */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
          <span className="text-xs font-semibold text-slate-400 pl-2">Min Score:</span>
          {[0, 50, 70, 85].map((score) => (
            <button
              key={score}
              onClick={() => setMinScore(score)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                minScore === score
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {score === 0 ? "All" : `${score}%+`}
            </button>
          ))}
        </div>
      </div>

      {/* Matches List */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-52 bg-slate-900/50 rounded-2xl animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : data?.items && data.items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.items.map((match) => (
            <div
              key={match.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-xl transition-all group"
            >
              <div className="space-y-3">
                {/* Score + Job Title Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    {/* Score Badge */}
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 font-extrabold text-sm flex items-center justify-center">
                      {match.match_score}%
                    </div>
                    {/* Title + Company */}
                    <div className="min-w-0">
                      <span className="text-sm font-bold text-white leading-tight line-clamp-1">
                        {match.opportunity_title ?? `Opportunity #${match.opportunity_id}`}
                      </span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                        <p className="text-[11px] text-slate-400 line-clamp-1">
                          {match.opportunity_company ?? "Unknown Company"}
                        </p>
                      </div>
                      {match.opportunity_location && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                          <p className="text-[11px] text-slate-500 line-clamp-1">{match.opportunity_location}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    {/* Fit Badge */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        match.match_score >= 80
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : match.match_score >= 60
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {match.match_score >= 80 ? "Strong Match" : match.match_score >= 60 ? "Good Fit" : "Partial Fit"}
                    </span>
                    {/* Type Badge */}
                    {match.opportunity_type && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${typeColor(match.opportunity_type)}`}>
                        {typeLabel(match.opportunity_type)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Reason Explanation */}
                {match.match_reason && (
                  <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                    💡 <span className="font-semibold text-slate-200">{match.match_reason}</span>
                  </p>
                )}

                {/* Matching Skills */}
                {match.matching_skills && match.matching_skills.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Matching Skills
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {match.matching_skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-[10px] border border-emerald-500/20"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing Skills */}
                {match.missing_skills && match.missing_skills.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Skill Gaps to Learn
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {match.missing_skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 text-[10px] border border-rose-500/20"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => addToPipelineMutation.mutate(match.opportunity_id)}
                  disabled={addedIds.has(match.opportunity_id) || addToPipelineMutation.isPending}
                  className={`flex items-center justify-center gap-2 flex-1 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    addedIds.has(match.opportunity_id)
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 cursor-default"
                      : "bg-indigo-600/20 hover:bg-indigo-600/30 border-indigo-500/30 text-indigo-300"
                  }`}
                >
                  {addedIds.has(match.opportunity_id) ? (
                    <><CheckCircle className="w-3.5 h-3.5" /> Added to Pipeline</>
                  ) : (
                    <><PlusCircle className="w-3.5 h-3.5" /> Add to Pipeline</>
                  )}
                </button>
                {match.opportunity_source_url && (
                  <a
                    href={match.opportunity_source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 flex-1 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs font-semibold transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View & Apply
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <Sparkles className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No AI matches found for this criteria</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Upload your resume or lower the minimum score filter to inspect potential job fits.
          </p>
        </div>
      )}
    </div>
  );
}

export default JobMatchesPage;
