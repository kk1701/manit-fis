import { useState, useEffect } from "react";

import Row from "./helpers/Row";
import TagInput from "./helpers/TagInput";
import { api } from "../api/http";

export default function AcademicSection({ me, onSaved }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    department: me?.department || "",
    currentSubjects: me?.currentSubjects || [],
    prevTaughtSubjects: me?.prevTaughtSubjects || [],
  });

  useEffect(() => {
    setForm({
      department: me?.department || "",
      currentSubjects: me?.currentSubjects || [],
      prevTaughtSubjects: me?.prevTaughtSubjects || [],
    });
  }, [me]);

  async function save() {
    const updated = await api("/faculty/me", { method: "PUT", body: form });
    onSaved(updated);
    setEditing(false);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Academic Profile</h3>
        <button onClick={() => setEditing((s) => !s)} className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-100">
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>

      {!editing ? (
        <div className="text-sm text-slate-700">
          <Row label="Department" value={form.department || "—"} />
          <Row label="Currently Teaching" value={(form.currentSubjects || []).join(", ") || "—"} />
          <Row label="Previously Taught (BTech/MTech)" value={(form.prevTaughtSubjects || []).join(", ") || "—"} />
        </div>
      ) : (
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Department</label>
            <input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" />
          </div>
          <TagInput label="Currently Teaching (comma separated)" value={form.currentSubjects} onChange={(arr) => setForm({ ...form, currentSubjects: arr })} />
          <TagInput label="Previously Taught (BTech/MTech; comma separated)" value={form.prevTaughtSubjects} onChange={(arr) => setForm({ ...form, prevTaughtSubjects: arr })} />
          <div className="flex gap-2">
            <button onClick={save} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Save</button>
            <button onClick={() => setEditing(false)} className="rounded-xl border px-4 py-2 text-sm">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}


