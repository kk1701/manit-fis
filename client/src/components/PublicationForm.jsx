import { useState } from "react";

import Input from "./helpers/Input";
import Select from "./helpers/Select";

export default function PublicationForm({ initial, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: initial?.title || "",
    authors: (initial?.authors || []).join(", "),
    year: initial?.year || "",
    venue: initial?.venue || "",
    type: initial?.type || "conference", // user can choose
    doi: initial?.doi || "",
    indexing: (initial?.indexing || []).join(", "),
    scope: initial?.scope || "International",
  });
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(initial && initial._id);

  async function submit() {
    setSaving(true);
    try {
      const payload = {
        ...form,
        authors: form.authors.split(',').map((s) => s.trim()).filter(Boolean),
        indexing: form.indexing.split(',').map((s) => s.trim()).filter(Boolean),
        year: form.year ? Number(form.year) : undefined,
      };
      if (isEdit) {
        await call(`/publications/${initial._id}`, { method: 'PUT', body: payload });
      } else {
        await call('/publications', { method: 'POST', body: payload });
      }
      await onSaved();
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="w-full max-w-2xl">
      <h4 className="text-lg font-semibold text-slate-900 mb-3">{isEdit ? 'Edit research work' : 'Add research work'}</h4>
      <div className="grid gap-3 sm:grid-cols-2">
        <Input label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} className="sm:col-span-2" />
        <Input label="Authors (comma separated)" value={form.authors} onChange={(v) => setForm({ ...form, authors: v })} />
        <Input label="Year" value={form.year} onChange={(v) => setForm({ ...form, year: v })} type="number" />
        <Input label="Venue (journal/conference)" value={form.venue} onChange={(v) => setForm({ ...form, venue: v })} />
        <Select label="Type" value={form.type} onChange={(v) => setForm({ ...form, type: v })} options={["Conference","General","Book","Chapter"]} />
        <Input label="DOI (optional)" value={form.doi} onChange={(v) => setForm({ ...form, doi: v })} />
        <Input label="Indexing (comma separated)" value={form.indexing} onChange={(v) => setForm({ ...form, indexing: v })} />
        <Select label="Scope" value={form.scope} onChange={(v) => setForm({ ...form, scope: v })} options={["International","National","Other"]} />
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={submit} disabled={saving} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? "Saving…" : isEdit ? "Save changes" : "Add"}</button>
        <button onClick={onClose} className="rounded-xl border px-4 py-2 text-sm">Cancel</button>
      </div>
    </div>
  );
}