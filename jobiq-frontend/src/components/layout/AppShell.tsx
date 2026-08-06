import { Link, NavLink } from "react-router-dom";

type AppShellProps = {
  children: React.ReactNode;
};

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/opportunities", label: "Opportunities" },
  { to: "/applications", label: "Applications" },
  { to: "/resumes", label: "Resumes" },
  { to: "/job-matches", label: "Job Matches" },
  { to: "/saved-opportunities", label: "Saved" },
  { to: "/profile", label: "Profile" },
];

function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-lg font-semibold text-indigo-600">
            JobIQ
          </Link>
          <nav className="flex flex-wrap gap-4 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? "font-medium text-indigo-600" : "text-slate-600 hover:text-slate-900"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}

export default AppShell;

