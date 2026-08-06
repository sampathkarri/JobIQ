import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Search,
  Filter,
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Bookmark,
  Send,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Globe,
} from "lucide-react";
import { opportunitiesApi, Opportunity } from "../api/opportunities";
import { applicationsApi } from "../api/applications";
import { savedOpportunitiesApi } from "../api/savedOpportunities";
import { useAuthStore } from "../store/useAuthStore";

function OpportunitiesPage() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [remoteFilter, setRemoteFilter] = useState<boolean | undefined>(undefined);
  const [minSalary, setMinSalary] = useState<number | undefined>(undefined);
  const [skillsFilter, setSkillsFilter] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [showFilters, setShowFilters] = useState(false);

  // Status Feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch Opportunities Query
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [
      "opportunities",
      searchTerm,
      locationFilter,
      typeFilter,
      levelFilter,
      remoteFilter,
      minSalary,
      skillsFilter,
      page,
      perPage,
    ],
    queryFn: () =>
      opportunitiesApi.getOpportunities({
        q: searchTerm || undefined,
        location: locationFilter || undefined,
        type: typeFilter || undefined,
        job_level: levelFilter || undefined,
        remote: remoteFilter,
        salary_min: minSalary,
        skills: skillsFilter || undefined,
        page,
        per_page: perPage,
      }),
  });

  // Save Opportunity Mutation
  const saveMutation = useMutation({
    mutationFn: (opportunityId: number) => savedOpportunitiesApi.saveOpportunity(opportunityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedOpportunities"] });
      showToast("Opportunity bookmarked successfully!");
    },
    onError: (err: any) => {
      showToast(err.response?.data?.detail || "Could not save opportunity.");
    },
  });

  // Apply Mutation
  const applyMutation = useMutation({
    mutationFn: (opportunityId: number) =>
      applicationsApi.createApplication({ opportunity_id: opportunityId, status: "applied" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      showToast("Application added to your pipeline!");
    },
    onError: (err: any) => {
      showToast(err.response?.data?.detail || "Application already exists in pipeline.");
    },
  });

  // Scraper Trigger Mutation
  const ingestMutation = useMutation({
    mutationFn: () => opportunitiesApi.ingestRemotive(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["opportunities"] });
      showToast(`Scraped & Ingested ${data.created} new jobs!`);
    },
    onError: () => {
      showToast("Scraper run completed or already up to date.");
    },
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setLocationFilter("");
    setTypeFilter("");
    setLevelFilter("");
    setRemoteFilter(undefined);
    setMinSalary(undefined);
    setSkillsFilter("");
    setPage(1);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 border border-indigo-500/40 text-slate-100 px-4 py-3 rounded-2xl shadow-2xl shadow-indigo-500/20 text-sm animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-7 h-7 text-indigo-400" />
            Discover Opportunities
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse 1000+ jobs, internships, hackathons, and remote positions aggregated daily.
          </p>
        </div>

        <button
          onClick={() => ingestMutation.mutate()}
          disabled={ingestMutation.isPending}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700/80 font-semibold text-xs shadow-md transition-all self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 text-indigo-400 ${ingestMutation.isPending ? "animate-spin" : ""}`} />
          <span>{ingestMutation.isPending ? "Scraping Live..." : "Fetch Live Jobs"}</span>
        </button>
      </div>

      {/* Search Bar & Filter Toggle */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            placeholder="Search by role title, technology, or company (e.g. FastAPI, Senior Engineer)..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm shadow-inner transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl border text-sm font-semibold transition-all ${
            showFilters || locationFilter || typeFilter || levelFilter || remoteFilter !== undefined || minSalary
              ? "bg-indigo-600/20 border-indigo-500/40 text-indigo-300"
              : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
          }`}
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Collapsible Filter Panel */}
      {showFilters && (
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 shadow-xl backdrop-blur-md">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Location</label>
            <input
              type="text"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              placeholder="e.g. San Francisco, India, Remote"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="">All Types</option>
              <option value="job">Full-time Job</option>
              <option value="internship">Internship</option>
              <option value="hackathon">Hackathon</option>
              <option value="competition">Competition</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Experience Level</label>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="">All Levels</option>
              <option value="Junior">Junior / Entry</option>
              <option value="Mid">Mid Level</option>
              <option value="Senior">Senior Level</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Remote Position</label>
            <select
              value={remoteFilter === undefined ? "" : remoteFilter ? "true" : "false"}
              onChange={(e) => {
                const val = e.target.value;
                setRemoteFilter(val === "" ? undefined : val === "true");
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="">Any Workstyle</option>
              <option value="true">Remote Only</option>
              <option value="false">Onsite / Hybrid</option>
            </select>
          </div>

          <div className="sm:col-span-2 md:col-span-4 flex justify-end gap-3 pt-2">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Results Meta */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 px-1">
        <div className="flex items-center gap-3">
          <span>
            Showing {data?.items?.length || 0} of {data?.total || 0} opportunities
          </span>
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-xl">
            <span className="text-[11px] text-slate-500 font-semibold">Per Page:</span>
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="bg-transparent text-slate-200 text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value={12} className="bg-slate-900">12</option>
              <option value={24} className="bg-slate-900">24</option>
              <option value={48} className="bg-slate-900">48</option>
              <option value={100} className="bg-slate-900">100</option>
            </select>
          </div>
        </div>
        {isFetching && <span className="text-indigo-400 animate-pulse">Updating results...</span>}
      </div>

      {/* Opportunities List */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-slate-900/50 rounded-2xl animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : data?.items && data.items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.items.map((opp) => (
            <div
              key={opp.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 p-6 rounded-2xl transition-all duration-200 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Header Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {opp.type}
                    </span>
                    {opp.remote && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Remote
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500">{opp.source || "Direct"}</span>
                </div>

                {/* Title & Company */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {opp.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-300 mt-1 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    {opp.company}
                  </p>
                </div>

                {/* Details Row */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                  {opp.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {opp.location}
                    </span>
                  )}

                  {(opp.salary_min || opp.salary_max) && (
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <DollarSign className="w-3.5 h-3.5" />
                      ${opp.salary_min?.toLocaleString()} - ${opp.salary_max?.toLocaleString()}
                    </span>
                  )}

                  {opp.stipend && (
                    <span className="text-emerald-400 font-semibold">Stipend: ${opp.stipend.toLocaleString()}/mo</span>
                  )}

                  {opp.prize_pool && (
                    <span className="text-amber-400 font-semibold">Prize: ${opp.prize_pool.toLocaleString()}</span>
                  )}
                </div>

                {/* Required Skills */}
                {opp.required_skills && opp.required_skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {opp.required_skills.slice(0, 5).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 text-[11px] border border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                    {opp.required_skills.length > 5 && (
                      <span className="text-[10px] text-slate-500 self-center">
                        +{opp.required_skills.length - 5} more
                      </span>
                    )}
                  </div>
                )}

                {/* Description Snippet */}
                {opp.description && (
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed pt-1">{opp.description}</p>
                )}
              </div>

              {/* Action Footer */}
              <div className="flex items-center justify-between gap-3 pt-5 mt-4 border-t border-slate-800/60">
                <button
                  onClick={() => saveMutation.mutate(opp.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 border border-slate-800 transition-colors"
                  title="Save Opportunity"
                >
                  <Bookmark className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  {opp.source_url && (
                    <a
                      href={opp.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 border border-slate-800 transition-colors"
                      title="Open Original Link"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}

                  <button
                    onClick={() => applyMutation.mutate(opp.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Quick Apply</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <Briefcase className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No opportunities found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query or reset filters to view all available roles.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {data?.total && data.total > 12 && (
        <div className="flex justify-center items-center gap-4 pt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-semibold text-slate-400">
            Page {page} of {Math.ceil(data.total / 12)}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= Math.ceil(data.total / 12)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default OpportunitiesPage;
