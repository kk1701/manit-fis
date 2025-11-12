import { useState } from "react";
import { api } from "../api/http";

import isoDate from "../utils/isoDate";
import Input from "./helpers/Input";
import TextArea from "./helpers/TextArea";
import Select from "./helpers/Select";

export default function ProjectForm({ initial, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: initial?.title || "",
    description: initial?.description || "",
    startDate: initial?.startDate ? isoDate(initial.startDate) : "",
    endDate: initial?.endDate ? isoDate(initial.endDate) : "",
    futurePlans: initial?.futurePlans || "",
    status: initial?.status || "ongoing",
  });
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(initial && initial._id);

  async function submit() {
    setSaving(true);
    try {
      const payload = {
        ...form,
        startDate: form.startDate ? new Date(form.startDate).toISOString() : null,
        endDate: form.endDate ? new Date(form.endDate).toISOString() : null,
      };
      if (isEdit) {
        await api(`/projects/${initial._id}`, { method: 'PUT', body: payload });
      } else {
        await api('/projects', { method: 'POST', body: payload });
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
      <h4 className="text-lg font-semibold text-slate-900 mb-3">{isEdit ? 'Edit project' : 'Add project'}</h4>
      <div className="grid gap-3">
        <Input label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
        <TextArea label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
        <div className="grid gap-3 sm:grid-cols-3">
          <Input label="Start date" type="date" value={form.startDate} onChange={(v) => setForm({ ...form, startDate: v })} />
          <Input label="End date" type="date" value={form.endDate} onChange={(v) => setForm({ ...form, endDate: v })} />
          <Select label="Status" value={form.status} onChange={(v) => setForm({ ...form, status: v })} options={["Planned","Ongoing","Completed"]} />
        </div>
        <TextArea label="Future plans" value={form.futurePlans} onChange={(v) => setForm({ ...form, futurePlans: v })} />
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={submit} disabled={saving} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? "Saving…" : isEdit ? "Save changes" : "Add"}</button>
        <button onClick={onClose} className="rounded-xl border px-4 py-2 text-sm">Cancel</button>
      </div>
    </div>
  );
}