import { Link } from "react-router-dom";
import "../index.css";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Top nav */}
      <header className="container-padding">
        <div className="mx-auto max-w-7xl py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/90 text-white text-sm font-semibold">FIS</Link>
            <span className="text-xl font-semibold text-slate-800">
              MANIT Faculty Information System
            </span>
          </div>
          <nav className="hidden sm:flex items-center gap-3">
            <Link
              to="/directory"
              className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg"
            >
              View Profiles
            </Link>
            <Link
              to="/login"
              className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container-padding">
        <div className="mx-auto max-w-7xl py-8 sm:py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
              Discover. Collaborate. Showcase.
            </h1>
            <p className="mt-4 text-slate-600 text-lg">
              A central place for MANIT faculty to maintain profiles, publications, and projects —
              and for students to explore areas of research.
            </p>

            {/* 3 CTAs */}
            <div className="mt-8 grid sm:grid-cols-3 gap-3">
              <Link
                to="/directory"
                className="group flex flex-col items-start justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M16 11c1.657 0 3-1.79 3-4s-1.343-4-3-4-3 1.79-3 4 1.343 4 3 4Z" />
                      <path d="M8 13c-3 0-6 1.5-6 4v3h12v-3c0-2.5-3-4-6-4Z" />
                    </svg>
                  </span>
                  <h3 className="font-semibold text-slate-900">View Profiles</h3>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Browse public faculty profiles, research areas, and projects.
                </p>
                <span className="mt-3 text-indigo-700 font-medium group-hover:underline">
                  Explore →
                </span>
              </Link>

              <Link
                to="/login"
                className="group flex flex-col items-start justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z" />
                      <path d="M4 22v-1a7 7 0 0 1 14 0v1" />
                    </svg>
                  </span>
                  <h3 className="font-semibold text-slate-900">Login as Faculty</h3>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Update your profile, publications, and projects.
                </p>
                <span className="mt-3 text-emerald-700 font-medium group-hover:underline">
                  Sign in →
                </span>
              </Link>

              <Link
                to="/register"
                className="group flex flex-col items-start justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M12 7v10M7 12h10" />
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                  </span>
                  <h3 className="font-semibold text-slate-900">Register as Faculty</h3>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Create your account with EmpID and start building your profile.
                </p>
                <span className="mt-3 text-amber-700 font-medium group-hover:underline">
                  Get started →
                </span>
              </Link>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              Need help? Contact the FIS admin office to verify your faculty account.
            </p>
          </div>

          {/* Illustration: research & collaboration */}
          <div className="relative">
            <div className="mx-auto max-w-lg rounded-3xl bg-white shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-center h-40 rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-500 p-6">
                <div className="text-white text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-3 h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6l4 2" />
                  </svg>

                  <div className="flex items-center justify-center gap-6">
                    {/* users */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20v-2a4 4 0 0 0-3-3.87M9 20v-2a4 4 0 0 1 3-3.87M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                    </svg>

                    {/* book */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7a4 4 0 0 1 4-4h10v14H7a4 4 0 0 1-4-4zM21 7v10a4 4 0 0 0-4-4H9" />
                    </svg>

                    {/* search */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <h4 className="text-lg font-semibold text-slate-900">Profiles, Publications & Collaborations</h4>
                <p className="mt-2 text-sm text-slate-600">
                  Search faculty, browse publications and discover research collaborators — all in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container-padding flex items-center justify-center">
        <div className="mx-auto max-w-7xl py-8 border-t border-slate-200 text-sm text-slate-500">
          © {new Date().getFullYear()} FIS • Built with Team
        </div>
      </footer>
    </div>
  );
}
