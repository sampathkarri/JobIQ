import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  KanbanSquare,
  Trash2,
  Calendar,
  DollarSign,
  Edit3,
  Building2,
  MapPin,
  Globe,
  Mail,
  Copy,
  Check,
  X,
  Sparkles,
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

  // AI Email Modal State
  const [emailModalApp, setEmailModalApp] = useState<Application | null>(null);
  const [emailType, setEmailType] = useState("cover_letter");
  const [generatedEmail, setGeneratedEmail] = useState<{ subject: string; body: string } | null>(null);
  const [copied, setCopied] = useState(false);

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

  const generateEmailMutation = useMutation({
    mutationFn: (data: { opportunity_id: number; email_type: string }) => applicationsApi.generateEmail(data),
    onSuccess: (res) => {
      setGeneratedEmail(res);
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

  const handleOpenEmailModal = (app: Application) => {
    setEmailModalApp(app);
    setGeneratedEmail(null);
    setCopied(false);
    generateEmailMutation.mutate({
      opportunity_id: app.opportunity_id,
      email_type: "cover_letter",
    });
  };

  const handleCopyEmail = () => {
    if (!generatedEmail) return;
    navigator.clipboard.writeText(`Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <KanbanSquare className="w-7 h-7 text-indigo-400" />
          Application Pipeline
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Track, organize, and manage your job applications across every stage of the hiring funnel.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedStatus(null)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            selectedStatus === null
              ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/20"
              : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"
          }`}
        >
          All Applications ({data?.total || 0})
        </button>

        {STATUSES.map((st) => (
          <button
            key={st.id}
            onClick={() => setSelectedStatus(st.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              selectedStatus === st.id
                ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/20"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"
            }`}
          >
            {st.label}
          </button>
        ))}
      </div>

      {/* Applications List */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-slate-900/50 rounded-2xl animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : data?.items && data.items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map((app) => {
            const currentStatus = STATUSES.find((s) => s.id === app.status) || STATUSES[0];
            const opp = app.opportunity;

            return (
              <div
                key={app.id}
                className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-xl hover:border-slate-700 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${currentStatus.color}`}
                    >
                      {currentStatus.label}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEmailModal(app)}
                        className="p-1.5 rounded-lg text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                        title="Generate AI Cover Letter / Email"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingApp(app);
                          setNotes(app.notes || "");
                          setSalaryOffered(app.salary_offered || "");
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="Edit Notes & Details"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(app.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete Application"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {opp?.title || `Opportunity #${app.opportunity_id}`}
                    </h3>
                    <p className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mt-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      {opp?.company || `Company #${app.opportunity_id}`}
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

                    <p className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      Applied: {app.applied_date ? new Date(app.applied_date).toLocaleDateString() : "Recently"}
                    </p>
                  </div>

                  {app.notes && (
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-300">
                      <span className="font-semibold text-slate-500 block mb-0.5">Notes:</span>
                      {app.notes}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app, e.target.value)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
                    >
                      {STATUSES.map((st) => (
                        <option key={st.id} value={st.id}>
                          Move to {st.label}
                        </option>
                      ))}
                    </select>

                    {opp?.source_url && (
                      <a
                        href={opp.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-indigo-500/20 text-slate-300 hover:text-indigo-300 text-xs font-semibold border border-slate-700 transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>View Link</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <KanbanSquare className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No applications in this stage</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Browse opportunities in the discovery engine and click "Quick Apply" to add them to your pipeline.
          </p>
        </div>
      )}

      {/* AI Email Generation Modal */}
      {emailModalApp && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                AI Email Generator
              </h3>
              <button
                onClick={() => setEmailModalApp(null)}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-2">
              {[
                { id: "cover_letter", label: "Cover Letter" },
                { id: "follow_up", label: "Follow-up Email" },
                { id: "interview_thank_you", label: "Thank You Note" },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setEmailType(type.id);
                    generateEmailMutation.mutate({
                      opportunity_id: emailModalApp.opportunity_id,
                      email_type: type.id,
                    });
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    emailType === type.id
                      ? "bg-indigo-600 text-white border-indigo-500"
                      : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {generateEmailMutation.isPending ? (
              <div className="p-8 text-center text-xs text-indigo-400 animate-pulse">
                Generating personalized AI email...
              </div>
            ) : generatedEmail ? (
              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[11px] font-bold uppercase text-slate-500 block">Subject</span>
                  <p className="text-xs font-semibold text-slate-200">{generatedEmail.subject}</p>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1">Message Body</span>
                  <textarea
                    readOnly
                    rows={8}
                    value={generatedEmail.body}
                    className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-300 p-3 rounded-lg focus:outline-none font-mono leading-relaxed"
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? "Copied!" : "Copy to Clipboard"}</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Edit Notes Modal */}
      {editingApp && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Edit Application Details</h3>
            <form onSubmit={handleSaveNotes} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Notes</label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Interview notes, recruiter contact info, next steps..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Salary Offered ($)</label>
                <input
                  type="number"
                  value={salaryOffered}
                  onChange={(e) => setSalaryOffered(e.target.value ? Number(e.target.value) : "")}
                  placeholder="e.g. 140000"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingApp(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
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
