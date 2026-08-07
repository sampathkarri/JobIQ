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
  Link2,
  Tag,
  Plus,
} from "lucide-react";
import { applicationsApi, Application } from "../api/applications";
import { customJobsApi, CustomJob } from "../api/customJobs";
import { PasteJobModal } from "../components/PasteJobModal";

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

  // Paste Link Modal state
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);

  // AI Email Modal State
  const [emailModalApp, setEmailModalApp] = useState<Application | null>(null);
  const [emailType, setEmailType] = useState("cover_letter");
  const [generatedEmail, setGeneratedEmail] = useState<{ subject: string; body: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["applications", selectedStatus],
    queryFn: () => applicationsApi.getApplications(selectedStatus || undefined),
  });

  const { data: customJobsData, isLoading: isCustomJobsLoading } = useQuery({
    queryKey: ["customJobs", selectedStatus],
    queryFn: () => customJobsApi.getCustomJobs(selectedStatus || undefined),
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

  const updateCustomJobMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => customJobsApi.updateCustomJob(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customJobs"] });
    },
  });

  const deleteCustomJobMutation = useMutation({
    mutationFn: (id: number) => customJobsApi.deleteCustomJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customJobs"] });
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

  const handleCustomJobStatusChange = (jobId: number, newStatus: string) => {
    updateCustomJobMutation.mutate({ id: jobId, data: { status: newStatus } });
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

  const totalItems = (data?.total || 0) + (customJobsData?.total || 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <KanbanSquare className="w-7 h-7 text-indigo-400" />
            Application Pipeline
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track, organize, and manage your job applications across every stage of the hiring funnel.
          </p>
        </div>

        <button
          onClick={() => setIsPasteModalOpen(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>+ Paste Job Link</span>
        </button>
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
          All Applications ({totalItems})
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

      {/* Applications & Custom Jobs Grid */}
      {isLoading || isCustomJobsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-slate-900/50 rounded-2xl animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : totalItems > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Custom User-Added Jobs */}
          {customJobsData?.items.map((job) => {
            const currentStatus = STATUSES.find((s) => s.id === job.status) || STATUSES[0];

            return (
              <div
                key={`custom-${job.id}`}
                className="bg-slate-900/90 border border-indigo-500/30 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-xl hover:border-indigo-500/60 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 px-3 py-1 bg-indigo-500/10 border-b border-l border-indigo-500/30 rounded-bl-xl text-[10px] font-bold text-indigo-400 flex items-center gap-1">
                  <Link2 className="w-3 h-3" />
                  <span>Custom Link</span>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${currentStatus.color}`}
                    >
                      {currentStatus.label}
                    </span>

                    <button
                      onClick={() => deleteCustomJobMutation.mutate(job.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete Custom Job"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {job.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mt-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      {job.company}
                      {job.source_name && (
                        <span className="text-[10px] font-normal text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                          {job.source_name}
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-400 pt-1">
                    {job.location && (
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {job.location}
                      </p>
                    )}

                    {(job.salary_min || job.salary_max) && (
                      <p className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <DollarSign className="w-3.5 h-3.5" />
                        {job.salary_currency === "INR" ? "₹" : "$"}
                        {job.salary_min?.toLocaleString()} - {job.salary_currency === "INR" ? "₹" : "$"}
                        {job.salary_max?.toLocaleString()}
                      </p>
                    )}

                    <p className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      Added: {new Date(job.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  {job.required_skills && job.required_skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {job.required_skills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 bg-slate-800 text-[10px] text-indigo-300 rounded-md font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {job.notes && (
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-300">
                      <span className="font-semibold text-slate-500 block mb-0.5">Notes:</span>
                      {job.notes}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <select
                      value={job.status}
                      onChange={(e) => handleCustomJobStatusChange(job.id, e.target.value)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
                    >
                      {STATUSES.map((st) => (
                        <option key={st.id} value={st.id}>
                          Move to {st.label}
                        </option>
                      ))}
                    </select>

                    {job.source_url && (
                      <a
                        href={job.source_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold rounded-xl flex items-center gap-1 transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Link</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Standard Scraped Applications */}
          {data?.items.map((app) => {
            const currentStatus = STATUSES.find((s) => s.id === app.status) || STATUSES[0];
            const opp = app.opportunity;

            return (
              <div
                key={`app-${app.id}`}
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
                        ₹{opp.salary_min?.toLocaleString()} - ₹{opp.salary_max?.toLocaleString()}
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
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl flex items-center gap-1 transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>View</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-3xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto">
            <KanbanSquare className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No applications in this status</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Save jobs from the Opportunity Explorer or paste a custom job link to start building your application pipeline.
          </p>
          <button
            onClick={() => setIsPasteModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Paste First Job Link</span>
          </button>
        </div>
      )}

      {/* Paste Job Modal */}
      <PasteJobModal
        isOpen={isPasteModalOpen}
        onClose={() => setIsPasteModalOpen(false)}
        onJobSaved={() => {
          queryClient.invalidateQueries({ queryKey: ["customJobs"] });
        }}
      />
    </div>
  );
}

export default ApplicationsPage;
