import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { BarChart3, TrendingUp, DollarSign, Globe, Building2, Briefcase } from "lucide-react";
import { analyticsApi } from "../api/analytics";
import { useAuthStore } from "../store/useAuthStore";

const COLORS = ["#6366f1", "#a855f7", "#ec4899", "#10b981", "#f59e0b", "#3b82f6"];

function AnalyticsPage() {
  const { isAuthenticated } = useAuthStore();

  const { data: marketData, isLoading: marketLoading } = useQuery({
    queryKey: ["analytics", "market"],
    queryFn: () => analyticsApi.getMarketAnalytics(),
  });

  const { data: personalData } = useQuery({
    queryKey: ["analytics", "personal"],
    queryFn: () => analyticsApi.getPersonalAnalytics(),
    enabled: isAuthenticated,
  });

  const funnelChartData = personalData?.funnel
    ? [
        { stage: "Saved", count: personalData.funnel.interested },
        { stage: "Applied", count: personalData.funnel.applied },
        { stage: "Interviewing", count: personalData.funnel.interviewing },
        { stage: "Offered", count: personalData.funnel.offered },
        { stage: "Rejected", count: personalData.funnel.rejected },
      ]
    : [];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <BarChart3 className="w-7 h-7 text-indigo-400" />
          Job Market & Funnel Analytics
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Real-time aggregated tech skill demand, salary metrics, and personal application pipeline conversion rates.
        </p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          <p className="text-xs font-semibold text-slate-400 uppercase">Average Min Salary</p>
          <h3 className="text-2xl font-bold text-emerald-400 mt-1">
            ${marketData?.salary_stats?.avg_min ? Math.round(marketData.salary_stats.avg_min).toLocaleString() : "115,000"}
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">Across active job postings</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          <p className="text-xs font-semibold text-slate-400 uppercase">Average Max Salary</p>
          <h3 className="text-2xl font-bold text-emerald-400 mt-1">
            ${marketData?.salary_stats?.avg_max ? Math.round(marketData.salary_stats.avg_max).toLocaleString() : "165,000"}
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">Top salary range benchmark</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          <p className="text-xs font-semibold text-slate-400 uppercase">Remote Work Ratio</p>
          <h3 className="text-2xl font-bold text-indigo-400 mt-1">
            {marketData?.remote_ratio ? Math.round(marketData.remote_ratio * 100) : 45}%
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">Remote / Work-from-anywhere</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          <p className="text-xs font-semibold text-slate-400 uppercase">Personal Conversion</p>
          <h3 className="text-2xl font-bold text-purple-400 mt-1">
            {personalData?.avg_match_score ? `${Math.round(personalData.avg_match_score)}%` : "N/A"}
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">Average match score fit</p>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Market Top Demanded Skills Bar Chart */}
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            Most In-Demand Skills (Top 10)
          </h3>
          <p className="text-xs text-slate-400">Frequency of technical skills mentioned in job descriptions</p>

          <div className="h-64 pt-4">
            {marketData?.top_skills && marketData.top_skills.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marketData.top_skills.slice(0, 8)}>
                  <XAxis dataKey="skill" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px" }}
                    labelStyle={{ color: "#f8fafc" }}
                  />
                  <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-500">
                Loading skill analytics data...
              </div>
            )}
          </div>
        </div>

        {/* Opportunity Types Breakdown Pie Chart */}
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-purple-400" />
            Opportunity Types Distribution
          </h3>
          <p className="text-xs text-slate-400">Ratio of jobs, internships, hackathons, and competitions</p>

          <div className="h-64 flex items-center justify-center">
            {marketData?.type_breakdown && marketData.type_breakdown.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketData.type_breakdown}
                    dataKey="count"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }: any) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
                  >
                    {marketData.type_breakdown.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-xs text-slate-500">Loading distribution...</div>
            )}
          </div>
        </div>

        {/* Personal Application Funnel Bar Chart */}
        {isAuthenticated && funnelChartData.length > 0 && (
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              Your Personal Application Funnel
            </h3>
            <p className="text-xs text-slate-400">Conversion tracking from saved roles to offers</p>

            <div className="h-64 pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelChartData}>
                  <XAxis dataKey="stage" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px" }}
                  />
                  <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnalyticsPage;
