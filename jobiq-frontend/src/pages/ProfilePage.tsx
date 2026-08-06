import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { User as UserIcon, Mail, Phone, MapPin, Briefcase, DollarSign, Save, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { authApi } from "../api/auth";

function ProfilePage() {
  const { user, setUser } = useAuthStore();

  const [fullName, setFullName] = useState(user?.full_name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [location, setLocation] = useState(user?.location || "");
  const [currentRole, setCurrentRole] = useState(user?.current_role || "");
  const [experienceYears, setExperienceYears] = useState<number | "">(user?.experience_years || "");
  const [preferredSalaryMin, setPreferredSalaryMin] = useState<number | "">(user?.preferred_salary_min || "");
  const [preferredSalaryMax, setPreferredSalaryMax] = useState<number | "">(user?.preferred_salary_max || "");
  const [preferredLocationsText, setPreferredLocationsText] = useState(
    user?.preferred_locations ? user.preferred_locations.join(", ") : ""
  );
  const [preferredJobTypesText, setPreferredJobTypesText] = useState(
    user?.preferred_job_types ? user.preferred_job_types.join(", ") : ""
  );

  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || "");
      setPhone(user.phone || "");
      setLocation(user.location || "");
      setCurrentRole(user.current_role || "");
      setExperienceYears(user.experience_years ?? "");
      setPreferredSalaryMin(user.preferred_salary_min ?? "");
      setPreferredSalaryMax(user.preferred_salary_max ?? "");
      setPreferredLocationsText(user.preferred_locations ? user.preferred_locations.join(", ") : "");
      setPreferredJobTypesText(user.preferred_job_types ? user.preferred_job_types.join(", ") : "");
    }
  }, [user]);

  const updateMutation = useMutation({
    mutationFn: (data: any) => authApi.updateProfile(data),
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      setSuccessMsg("Profile and preferences saved successfully!");
      setTimeout(() => setSuccessMsg(null), 4000);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const locsArray = preferredLocationsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const typesArray = preferredJobTypesText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    updateMutation.mutate({
      full_name: fullName || undefined,
      phone: phone || undefined,
      location: location || undefined,
      current_role: currentRole || undefined,
      experience_years: experienceYears !== "" ? Number(experienceYears) : undefined,
      preferred_salary_min: preferredSalaryMin !== "" ? Number(preferredSalaryMin) : undefined,
      preferred_salary_max: preferredSalaryMax !== "" ? Number(preferredSalaryMax) : undefined,
      preferred_locations: locsArray,
      preferred_job_types: typesArray,
    });
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <UserIcon className="w-7 h-7 text-indigo-400" />
          Profile & Preferences
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Update your target role, salary range, and locations to customize your daily AI job matching algorithm.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Profile Section */}
        <div className="bg-slate-900/80 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl backdrop-blur-md">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-indigo-400" />
            Personal Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Email Address</label>
              <input
                type="email"
                disabled
                value={user?.email || ""}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-500 text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Current Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="San Francisco, CA"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Professional Preferences Section */}
        <div className="bg-slate-900/80 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl backdrop-blur-md">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-purple-400" />
            Career & AI Match Preferences
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Current Role / Target Role</label>
              <input
                type="text"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                placeholder="e.g. Senior Software Engineer"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Years of Experience</label>
              <input
                type="number"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value ? Number(e.target.value) : "")}
                placeholder="e.g. 5"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Preferred Salary Min ($)</label>
              <input
                type="number"
                value={preferredSalaryMin}
                onChange={(e) => setPreferredSalaryMin(e.target.value ? Number(e.target.value) : "")}
                placeholder="e.g. 120000"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Preferred Salary Max ($)</label>
              <input
                type="number"
                value={preferredSalaryMax}
                onChange={(e) => setPreferredSalaryMax(e.target.value ? Number(e.target.value) : "")}
                placeholder="e.g. 180000"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                Preferred Locations (comma separated)
              </label>
              <input
                type="text"
                value={preferredLocationsText}
                onChange={(e) => setPreferredLocationsText(e.target.value)}
                placeholder="San Francisco, New York, Remote"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                Preferred Job Types (comma separated)
              </label>
              <input
                type="text"
                value={preferredJobTypesText}
                onChange={(e) => setPreferredJobTypesText(e.target.value)}
                placeholder="job, internship, hackathon"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {updateMutation.isPending ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Profile Preferences</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;
