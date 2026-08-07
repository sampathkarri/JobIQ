import React, { useState } from 'react';
import {
  Link2,
  Sparkles,
  CheckCircle2,
  Building2,
  MapPin,
  IndianRupee,
  AlertCircle,
  X,
  Loader2,
  Plus,
  Tag,
  FileText,
} from 'lucide-react';
import { customJobsApi, CustomJobParseResponse } from '../api/customJobs';

interface PasteJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobSaved: () => void;
}

export const PasteJobModal: React.FC<PasteJobModalProps> = ({ isOpen, onClose, onJobSaved }) => {
  const [url, setUrl] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form state
  const [preview, setPreview] = useState<CustomJobParseResponse | null>(null);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [salaryMin, setSalaryMin] = useState<number | ''>('');
  const [salaryMax, setSalaryMax] = useState<number | ''>('');
  const [salaryCurrency, setSalaryCurrency] = useState('INR');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [status, setStatus] = useState('interested');
  const [notes, setNotes] = useState('');
  const [sourceName, setSourceName] = useState('');

  const [isManualMode, setIsManualMode] = useState(false);

  if (!isOpen) return null;

  const handleParseLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please paste a job link URL.');
      return;
    }
    setError(null);
    setIsParsing(true);
    setPreview(null);

    try {
      const result = await customJobsApi.parseLink(url.trim());
      setPreview(result);
      setTitle(result.title || '');
      setCompany(result.company || '');
      setLocation(result.location || '');
      setSalaryMin(result.salary_min ?? '');
      setSalaryMax(result.salary_max ?? '');
      setSalaryCurrency(result.salary_currency || 'INR');
      setDescription(result.description || '');
      setSkills(result.required_skills || []);
      setSourceName(result.source_name || 'Custom Link');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || 'Failed to auto-extract details. You can enter details manually.');
      setIsManualMode(true);
    } finally {
      setIsParsing(false);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSaveJob = async () => {
    if (!title.trim() || !company.trim()) {
      setError('Job title and company name are required.');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await customJobsApi.createCustomJob({
        title: title.trim(),
        company: company.trim(),
        location: location.trim() || null,
        salary_min: typeof salaryMin === 'number' ? salaryMin : null,
        salary_max: typeof salaryMax === 'number' ? salaryMax : null,
        salary_currency: salaryCurrency,
        description: description.trim() || null,
        required_skills: skills,
        source_url: url.trim() || 'https://custom-entry.local',
        source_name: sourceName || 'Custom Link',
        status,
        notes: notes.trim() || null,
      });

      setSuccessMsg('Job successfully saved to your application pipeline!');
      setTimeout(() => {
        onJobSaved();
        onClose();
      }, 1200);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || 'Failed to save job. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Smart Job Link Parser</h2>
              <p className="text-xs text-slate-400">Paste any job link to auto-extract details into your pipeline</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="flex items-center space-x-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-center space-x-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* URL Input Form */}
          <form onSubmit={handleParseLink} className="space-y-3">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Job URL / Career Portal Link
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="url"
                  placeholder="e.g. https://careers.lseg.com/jobs/12345 or https://linkedin.com/jobs/view/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isParsing || !url.trim()}
                className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm rounded-xl flex items-center space-x-2 shadow-lg shadow-indigo-500/20 transition-all shrink-0"
              >
                {isParsing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Extracting...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Auto Extract</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Extracted Preview or Edit Form */}
          {(preview || isManualMode) && (
            <div className="space-y-5 pt-4 border-t border-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    {preview ? 'Auto-Extracted Preview' : 'Manual Custom Entry'}
                  </span>
                  {sourceName && (
                    <span className="px-2.5 py-0.5 text-xs font-medium bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                      Source: {sourceName}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsManualMode(!isManualMode)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 underline"
                >
                  {isManualMode ? 'Back to Auto Preview' : 'Edit All Fields'}
                </button>
              </div>

              {/* Title & Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Job Title *</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Senior Full Stack Engineer"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Company Name *</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. LSEG, Google, Razorpay"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Location & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Bengaluru, KA, India or Remote"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Pipeline Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="interested">Interested</option>
                    <option value="applied">Applied</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="offered">Offered</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Salary Range */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Min Salary (INR / Annual)</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="number"
                      value={salaryMin}
                      onChange={(e) => setSalaryMin(e.target.value ? Number(e.target.value) : '')}
                      placeholder="e.g. 1500000"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Max Salary (INR / Annual)</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="number"
                      value={salaryMax}
                      onChange={(e) => setSalaryMax(e.target.value ? Number(e.target.value) : '')}
                      placeholder="e.g. 3000000"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Currency</label>
                  <select
                    value={salaryCurrency}
                    onChange={(e) => setSalaryCurrency(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
              </div>

              {/* Skills Tags */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Required Skills</label>
                <div className="flex flex-wrap gap-2 mb-2 min-h-[36px] p-2 bg-slate-950 border border-slate-800 rounded-xl">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-1.5 hover:text-indigo-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {skills.length === 0 && <span className="text-xs text-slate-500 self-center">No skills tagged yet</span>}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                    placeholder="Add skill (e.g. React, Python)"
                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-white rounded-xl flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Description Excerpt */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Job Description Excerpt</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Auto-extracted job description text..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* User Notes */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Personal Application Notes</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Referred by Alex, interview scheduled next Tuesday"
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-slate-800 bg-slate-900/80">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            Cancel
          </button>

          {(preview || isManualMode) && (
            <button
              type="button"
              onClick={handleSaveJob}
              disabled={isSaving || !title.trim() || !company.trim()}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-medium text-sm rounded-xl shadow-lg shadow-emerald-500/20 flex items-center space-x-2 transition-all disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving to Pipeline...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save to Pipeline</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
