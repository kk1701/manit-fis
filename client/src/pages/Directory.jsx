import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/http";
import { useAuth } from "../context/AuthContext";

import FacultyCard from "../components/FacultyCard";

export default function Directory() {
  const [q, setQ] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  async function fetchDirectory(search = "") {
    try {
      setLoading(true);
      setErr("");
      const params = search ? `?q=${encodeURIComponent(search)}` : "";
      // Our backend search route returns faculty documents (public only)
      const data = await api(`/search/faculty${params}`);
      setList(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e?.message || "Failed to load directory");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDirectory();
  }, []);

  function onSearch(e) {
    e.preventDefault();
    fetchDirectory(q);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="container-padding">
        <div className="mx-auto max-w-7xl py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/90 text-white text-sm font-semibold">FIS</Link>
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

      <main className="max-w-6xl mx-auto px-4 py-6">
        <form onSubmit={onSearch} className="flex gap-3 mb-4">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, department, designation..."
            className="flex-1 rounded-xl border px-3 py-2"
          />
          <button className="rounded-xl bg-slate-900 text-white px-4 py-2">Search</button>
        </form>

        {/* {err && <div className="mb-4 text-red-600">{err}</div>} */}

        {loading ? (
          <div className="text-center text-slate-600">Loading…</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {list.map((f) => (
              <FacultyCard key={f._id} faculty={f} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
