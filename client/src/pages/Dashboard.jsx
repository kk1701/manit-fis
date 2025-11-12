import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/http";

import ProfileHeader from "../components/ProfileHeader";
import AcademicSection from "../components/AcademicSection";
import ResearchSection from "../components/ResearchSection";
import ProjectsSection from "../components/ProjectSection";


export default function Dashboard() {
  const [me, setMe] = useState("n");
  const [pubs, setPubs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        const meRes = await api("/faculty/me");
        console.log(meRes);

        if (!ignore) {
          setMe(meRes);
          // Fetch publications for this faculty
          const pubsRes = await api(`/publications?facultyId=${meRes._id}`).catch(() => []);
          // const projRes = await api(`/projects?facultyId=${meRes._id}`).catch(() => []);
          
          setPubs(Array.isArray(pubsRes) ? pubsRes : []);
          setProjects(Array.isArray(projRes) ? projRes : []);
        }
      } catch (e) {
        if (!ignore) setError(e.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, []);

  const grouped = useMemo(() => {
    const g = { conference: [], general: [], book: [], chapter: [] };
    pubs.forEach((p) => {
      if (p.type === "conference") g.conference.push(p);
      else if (p.type === "book") g.book.push(p);
      else if (p.type === "chapter") g.chapter.push(p);
      else g.general.push(p); // default bucket for general/journal/etc.
    });
    return g;
  }, [pubs]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
          <Link to="/" className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white text-sm font-semibold">FIS</Link>
          <h1 className="text-lg font-semibold text-slate-900">Professor Dashboard</h1>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/directory" className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100">Public Directory</Link>
            <button
              onClick={() => { logout(); navigate("/login"); }}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 border border-slate-300 hover:bg-slate-100"
            >Logout</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        )} */}

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-600">Loading…</div>
        ) : (
          <>
            <ProfileHeader me={me} />

            <section className="mt-6 grid gap-6">
              <AcademicSection me={me} onSaved={setMe} />
              <ResearchSection
                groups={grouped}
                onRefresh={async () => {
                  const pubs = await api(`/publications?facultyId=${me._id}`);
                  setPubs(Array.isArray(pubs) ? pubs : []);
                }}
              />
              <ProjectsSection
                items={projects}
                onRefresh={async () => {
                  // const projs = await api(`/projects?facultyId=${me._id}`).catch(() => []);
                  setProjects(Array.isArray(projs) ? projs : []);
                }}
              />
            </section>
          </>
        )}
      </main>
    </div>
  );
}