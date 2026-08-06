import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FileText, Upload, Trash2, Sparkles, CheckCircle2, AlertCircle, Code, GraduationCap, Briefcase } from "lucide-react";
import { resumesApi, Resume } from "../api/resumes";

function ResumesPage() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [rawText, setRawText] = useState("");
  const [activeResume, setActiveResume] = useState<Resume | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["resumes"],
    queryFn: () => resumesApi.getResumes(),
  });

  const createMutation = useMutation({
    mutationFn: (data: { title: string; raw_text: string }) => resumesApi.createResume(data),
    onSuccess: (newResume) => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      setTitle("");
      setRawText("");
      setActiveResume(newResume);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => resumesApi.deleteResume(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      if (activeResume) setActiveResume(null);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !rawText) return;
    createMutation.mutate({ title, raw_text: rawText });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <FileText className="w-7 h-7 text-indigo-400" />
          Resume Parser & Profile Matching
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Upload your resume to automatically extract tech skills, work experience, and generate daily ML job match scores.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Submit New Resume */}
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-6 shadow-xl">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Upload className="w-5 h-5 text-indigo-400" />
            Upload / Paste Resume Text
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Resume Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Full-Stack Developer Resume 2026"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Raw Resume Content</label>
              <textarea
                rows={10}
                required
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste the full text of your resume here (Includes work experience, education, technologies, and projects)..."
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={createMutation.isPending}
              className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {createMutation.isPending ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Parse Resume & Extract Skills</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Parsed Skills & Active Resumes */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Saved Resumes ({data?.items?.length || 0})
          </h2>

          {isLoading ? (
            <div className="h-40 bg-slate-900/50 rounded-2xl animate-pulse border border-slate-800" />
          ) : data?.items && data.items.length > 0 ? (
            <div className="space-y-4">
              {data.items.map((res) => (
                <div
                  key={res.id}
                  onClick={() => setActiveResume(res)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    activeResume?.id === res.id
                      ? "bg-indigo-600/20 border-indigo-500/50 shadow-xl"
                      : "bg-slate-900/70 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">{res.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Uploaded on {new Date(res.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMutation.mutate(res.id);
                      }}
                      className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Extracted Skills Preview */}
                  {res.skills && res.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-3">
                      {res.skills.slice(0, 8).map((sk, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-950 text-indigo-300 text-[10px] border border-indigo-500/20 font-semibold"
                        >
                          {sk}
                        </span>
                      ))}
                      {res.skills.length > 8 && (
                        <span className="text-[10px] text-slate-500 self-center">+{res.skills.length - 8} more</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
              No resumes uploaded yet. Upload your resume text on the left to extract tech skills.
            </div>
          )}

          {/* Active Resume Parsed Details Drawer */}
          {activeResume && (
            <div className="bg-slate-900/90 border border-purple-500/30 p-6 rounded-2xl space-y-4 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Code className="w-4 h-4 text-purple-400" />
                  Extracted Entities & Taxonomy
                </h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300">
                  {activeResume.skills?.length || 0} Skills Detected
                </span>
              </div>

              {activeResume.skills && activeResume.skills.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">Detected Tech Stack</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeResume.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/20"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumesPage;
