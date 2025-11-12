import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/http";
import PublicationCard from "../components/PublicationCard";
import ProjectCard from "../components/ProjectCard";

export default function FacultyProfile() {
  const { id } = useParams();
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [f, setF] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [publications, setPublications] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await api(`/faculty/${id}`);
        if (!ignore) setF(data);
          const [pubs, projs] = await Promise.all([
            api(`/publications?facultyId=${id}`).catch(() => []),
            api(`/projects?facultyId=${id}`).catch(() => []),
          ]);
          if (!ignore) {
            setPublications(Array.isArray(pubs) ? pubs : []);
            setProjects(Array.isArray(projs) ? projs : []);
          }
      } catch (e) {
        setErr(e?.message || "Could not load profile");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, [id]);

  if (loading) return <div className="p-6 text-center text-slate-600">Loading profile…</div>;
  if (err) return <div className="p-6 text-red-600">{err}</div>;
  if (!f) return <div className="p-6">Profile not found</div>;

  const placeholder = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'><rect width='100%' height='100%' fill='#E5E7EB'/><text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' font-family='Inter, Arial' font-size='48' fill='#6B7280'>${(f.name||"")[0]||'F'}</text></svg>`
  )}`;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="container-padding">
        <div className="mx-auto max-w-7xl py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="" className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/90 text-white text-sm font-semibold">FIS</Link>
            <span className="text-xl font-semibold text-slate-800">
              MANIT Faculty Information System
            </span>
          </div>
          {!token ? (
            <nav className="hidden sm:flex items-center gap-3">
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
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => { logout(); navigate("/", { replace: true }); }}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="rounded-2xl border bg-white p-6">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-2xl overflow-hidden bg-slate-100">
              <img src={f.photoUrl || placeholder} alt={f.name} className="h-full w-full object-cover" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">{f.name}</h3>
              <div className="text-sm text-slate-600">{f.designation || "—"}</div>
              <div className="text-sm text-slate-600">{f.department || "—"}</div>
              <div className="mt-2 text-sm text-slate-500">EmpID: {f.empId || "—"}</div>
            </div>
          </div>

          {/* Academic */}
          <div className="mt-6">
            <h4 className="font-semibold text-slate-900">Academic</h4>
            <div className="mt-2 text-sm text-slate-700">
              <div><strong>Currently teaching:</strong> {(f.currentSubjects || []).join(", ") || "—"}</div>
              <div className="mt-1"><strong>Previously taught:</strong> {(f.prevTaughtSubjects || []).join(", ") || "—"}</div>
            </div>
          </div>

          {/* Research placeholder — backend separate endpoint for publications */}
          <div className="mt-6">
            <h4 className="font-semibold text-slate-900">Research Areas</h4>
            <div className="mt-2">
              {(f.researchAreas || []).length ? f.researchAreas.map((r, i) => (
                <span key={i} className="inline-block mr-2 mt-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{r}</span>
              )) : <div className="text-sm text-slate-600">No research areas listed</div>}
            </div>
          </div>

          {/* Publications */}
          <div className="mt-6">
            <h4 className="font-semibold text-slate-900">Publications</h4>
            <div className="mt-3 grid gap-3">
              {publications && publications.length ? (
                publications.map((p) => <PublicationCard key={p._id} item={p} />)
              ) : (
                <div className="text-sm text-slate-600">No publications listed</div>
              )}
            </div>
          </div>

          {/* Projects */}
          <div className="mt-6">
            <h4 className="font-semibold text-slate-900">Projects</h4>
            <div className="mt-3 grid gap-3">
              {projects && projects.length ? (
                projects.map((pr) => <ProjectCard key={pr._id} item={pr} />)
              ) : (
                <div className="text-sm text-slate-600">No projects listed</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
