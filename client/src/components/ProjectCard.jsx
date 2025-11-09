import fmtDate from "../utils/fmtDate"

export default function ProjectCard({ item, onEdit }) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="font-medium text-slate-900">{item.title || "Untitled"}</div>
          <div className="mt-1 text-sm text-slate-700">{item.description || "—"}</div>
          <div className="mt-1 text-xs text-slate-600">Duration: {fmtDate(item.startDate)} – {fmtDate(item.endDate)}</div>
          <div className="mt-1 text-xs text-slate-600">Status: {item.status || '—'} · Future plans: {item.futurePlans || "—"}</div>
        </div>
        <button onClick={onEdit} className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs hover:bg-slate-100">Edit</button>
      </div>
    </div>
  );
}