import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  KanbanSquare,
  FileText,
  Sparkles,
  Bookmark,
  BarChart3,
  Mic,
  User as UserIcon,
  LogOut,
  LogIn,
  Menu,
  X,
  Zap,
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { authApi } from "../../api/auth";

type AppShellProps = {
  children: React.ReactNode;
};

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/opportunities", label: "Opportunities", icon: Briefcase },
  { to: "/applications", label: "Pipeline", icon: KanbanSquare },
  { to: "/resumes", label: "Resumes", icon: FileText },
  { to: "/job-matches", label: "AI Matches", icon: Sparkles },
  { to: "/saved-opportunities", label: "Saved", icon: Bookmark },
  { to: "/analytics", label: "Market Insights", icon: BarChart3 },
  { to: "/interview-prep", label: "Interview Prep", icon: Mic },
];

function AppShell({ children }: AppShellProps) {
  const { user, isAuthenticated, logout, setUser, token } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch current user on mount if token exists but user isn't loaded
  useEffect(() => {
    if (token && !user) {
      authApi.getMe().then(setUser).catch(() => {});
    }
  }, [token, user, setUser]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Check if current route is login/signup to render clean view without full shell header
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  if (isAuthPage) {
    return <div className="min-h-screen bg-slate-900 text-slate-100">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                Job<span className="text-indigo-400">IQ</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase tracking-widest font-semibold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                AI Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm shadow-indigo-500/10"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Menu */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition-colors text-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-indigo-600/40 text-indigo-300 flex items-center justify-center font-bold text-xs border border-indigo-500/30">
                    {user?.full_name ? user.full_name[0].toUpperCase() : user?.email[0].toUpperCase() || "U"}
                  </div>
                  <span className="hidden md:inline font-medium text-slate-200 max-w-[120px] truncate">
                    {user?.full_name || user?.email.split("@")[0]}
                  </span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  title="Logout"
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-900 px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/80"
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 lg:py-8">{children}</main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-slate-300">JobIQ Platform</span>
            <span>— AI-Powered Career Operating System</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Aggregating 1000+ jobs daily</span>
            <span>•</span>
            <span>Scikit-Learn ML Powered</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AppShell;
