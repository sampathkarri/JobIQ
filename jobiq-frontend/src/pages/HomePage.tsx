import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Briefcase,
  KanbanSquare,
  Sparkles,
  Bookmark,
  ArrowRight,
  TrendingUp,
  Building2,
  MapPin,
  DollarSign,
  Plus,
  RefreshCw,
  Zap,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { opportunitiesApi } from "../api/opportunities";
import { applicationsApi } from "../api/applications";
import { jobMatchesApi } from "../api/jobMatches";
import { analyticsApi } from "../api/analytics";

function HomePage() {
  const { user, isAuthenticated } = useAuthStore();

  const { data: opportunities, isLoading: oppsLoading } = useQuery({
    queryKey: ["opportunities", "recent"],
    queryFn: () => opportunitiesApi.getOpportunities({ page: 1, per_page: 6 }),
  });

  const { data: topMatches } = useQuery({
    queryKey: ["jobMatches", "top"],
    queryFn: () => jobMatchesApi.getTopMatches(),
    enabled: isAuthenticated,
  });

  const { data: applications } = useQuery({
    queryKey: ["applications"],
    queryFn: () => applicationsApi.getApplications(),
    enabled: isAuthenticated,
  });

  const { data: personalAnalytics } = useQuery({
    queryKey: ["analytics", "personal"],
    queryFn: () => analyticsApi.getPersonalAnalytics(),
    enabled: isAuthenticated,
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/20 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              AI Career Operating System
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                {user?.full_name || user?.email?.split("@")[0] || "Explorer"}
              </span>
              !
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              JobIQ has aggregated and ML-scored top career opportunities tailored to your target skills and salary expectations.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/opportunities"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
            >
              <Briefcase className="w-4 h-4" />
              <span>Explore Jobs</span>
            </Link>
            <Link
              to="/resumes"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 font-semibold text-sm transition-all"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Upload Resume</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Aggregated</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">{opportunities?.total || 12}+</h3>
            <p className="text-xs text-indigo-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Scraped daily
            </p>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <KanbanSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Applications</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">{applications?.total || 0}</h3>
            <p className="text-xs text-emerald-400 mt-1">In application pipeline</p>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">AI High Matches</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">{topMatches?.items?.length || 0}</h3>
            <p className="text-xs text-purple-400 mt-1">Pre-calculated score</p>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Interview Questions</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">300</h3>
            <p className="text-xs text-pink-400 mt-1">Across 12 technical domains</p>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Top Opportunities */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-400" />
                Featured Opportunities
              </h2>
              <p className="text-xs text-slate-400">Discover fresh roles added across top job platforms</p>
            </div>
            <Link
              to="/opportunities"
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {oppsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-slate-900/50 rounded-2xl animate-pulse border border-slate-800" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {opportunities?.items.map((opp) => (
                <div
                  key={opp.id}
                  className="bg-slate-900/70 border border-slate-800/80 hover:border-indigo-500/40 p-5 rounded-2xl transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/5 group"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {opp.type}
                        </span>
                        {opp.remote && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Remote
                          </span>
                        )}
                        {opp.employment_type && (
                          <span className="text-xs text-slate-400 border border-slate-800 px-2 py-0.5 rounded-md">
                            {opp.employment_type}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {opp.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1 text-slate-300 font-medium">
                          <Building2 className="w-3.5 h-3.5 text-slate-500" />
                          {opp.company}
                        </span>
                        {opp.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-500" />
                            {opp.location}
                          </span>
                        )}
                        {(opp.salary_min || opp.salary_max) && (
                          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                            ₹{opp.salary_min?.toLocaleString()} - ₹{opp.salary_max?.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <Link
                        to="/opportunities"
                        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-300 text-xs font-semibold transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 1 Column: Personal Pipeline & AI Voice Prep Quick Launch */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Quick Launchpad
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Accelerate your application response rates with built-in AI tools.
            </p>

            <div className="space-y-3">
              <Link
                to="/resumes"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 text-sm font-semibold text-slate-200 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span>Parse Resume (NLP)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/interview-prep"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 text-sm font-semibold text-slate-200 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </div>
                  <span>AI Voice Practice</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/analytics"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 text-sm font-semibold text-slate-200 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span>Market Skill Demand</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* AI Match Overview */}
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                AI Profile Match
              </h3>
              <Link to="/job-matches" className="text-xs text-indigo-400 hover:text-indigo-300">
                View All &rarr;
              </Link>
            </div>

            {topMatches?.items && topMatches.items.length > 0 ? (
              <div className="space-y-3">
                {topMatches.items.slice(0, 3).map((match) => (
                  <div key={match.id} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-slate-200">Match #{match.id}</span>
                      <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                        {match.match_score}% Match
                      </span>
                    </div>
                    <p className="text-slate-400 line-clamp-1">{match.match_reason}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-slate-500 text-xs space-y-2">
                <p>Upload your resume to generate automated match scores against 1000+ daily jobs.</p>
                <Link
                  to="/resumes"
                  className="inline-block text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  Upload Resume &rarr;
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
