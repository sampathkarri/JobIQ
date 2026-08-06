import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  KanbanSquare,
  Plus,
  Trash2,
  Calendar,
  DollarSign,
  Edit3,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  Building2,
} from "lucide-react";
import { applicationsApi, Application } from "../api/applications";

const STATUSES = [
  { id: "interested", label: "Interested", color: "bg-slate-500/20 text-slate-300 border-slate-700" },
  { id: "applied", label: "Applied", color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30" },
  { id: "interviewing", label: "Interviewing", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
  { id: "offered", label: "Offered", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  { id: "rejected", label: "Rejected", color: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
];

function ApplicationsPage() {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [notes, setNotes] = useState("");
  const [salaryOffered, setSalaryOffered] = useState<number | "">("");

  const { data, isLoading } = useQuery({
    queryKey: ["applications", selectedStatus],
    queryFn: () => applicationsApi.getApplications(selectedStatus || undefined),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => applicationsApi.updateApplication(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      setEditingApp(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => applicationsApi.deleteApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  const handleStatusChange = (app: Application, newStatus: string) => {
    updateMutation.mutate({ id: app.id, data: { status: newStatus } });
  };

  const handleSaveNotes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApp) return;
    updateMutation.mutate({
      id: editingApp.id,
      data: {
        notes,
        salary_offered: salaryOffered !== "" ? Number(salaryOffered) : undefined,
      },
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <KanbanSquare className="w-7 h-7 text-indigo-400" />
            Application Pipeline
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track your job applications across every stage from initial interest to offer acceptance.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedStatus(null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedStatus === null
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            All Stages ({data?.total || 0})
          </button>
          {STATUSES.map((st) => (
            <button
              key={st.id}
              onClick={() => setSelectedStatus(st.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                selectedStatus === st.id
                  ? `${st.color} shadow-md`
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-44 bg-slate-900/50 rounded-2xl animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : data?.items && data.items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map((app) => {
            const currentStatusObj = STATUSES.find((s) => s.id === app.status) || STATUSES[0];

            return (
              <div
                key={app.id}
                className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-xl hover:border-slate-700 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${currentStatusObj.color}`}
                    >
                      {currentStatusObj.label}
                    </span>
                    <button
                      onClick={() => deleteMutation.mutate(app.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete Application"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">Application #{app.id}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      Opportunity ID: #{app.opportunity_id}
                    </p>
                  </div>

                  <div className="space-y-1 text-xs text-slate-400 pt-1">
                    {app.applied_date && (
                      <p className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        Applied: {new Date(app.applied_date).toLocaleDateString()}
                      </p>
                    )}
                    {app.salary_offered && (
                      <p className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                        <DollarSign className="w-3.5 h-3.5" />
                        Offered: ${app.salary_offered.toLocaleString()}
                      </p>
                    )}
                    {app.notes && (
                      <p className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-slate-300 italic text-[11px] line-clamp-3">
                        "{app.notes}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Pipeline Controls & Edit Modal Trigger */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-semibold">Move Stage:</span>
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app, e.target.value)}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none"
                    >
                      {STATUSES.map((st) => (
                        <option key={st.id} value={st.id}>
                          {st.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      setEditingApp(app);
                      setNotes(app.notes || "");
                      setSalaryOffered(app.salary_offered || "");
                    }}
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Notes & Details</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <KanbanSquare className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No applications in pipeline</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Quickly apply to job opportunities to automatically populate your application pipeline tracking board.
          </p>
        </div>
      )}

      {/* Edit Modal */}
      {editingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Edit Application #{editingApp.id}</h3>

            <form onSubmit={handleSaveNotes} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Notes</label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record interview notes, recruiter contacts, or follow-up details..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Salary Offered ($)</label>
                <input
                  type="number"
                  value={salaryOffered}
                  onChange={(e) => setSalaryOffered(e.target.value ? Number(e.target.value) : "")}
                  placeholder="e.g. 150000"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingApp(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplicationsPage;
