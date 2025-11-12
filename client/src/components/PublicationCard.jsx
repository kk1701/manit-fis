import { api } from "../api/http";

export default function PublicationCard({ item, onEdit, onDelete }) {
  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this publication?")) return;
    try {
      await api(`/publications/${item._id}`, { method: "DELETE" });
      if (onDelete) onDelete(item);
    } catch (e) {
      alert(e.message || "Failed to delete publication");
    }
  }
  return (
    <div className="rounded-lg border border-slate-200 p-3">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="font-medium text-slate-900">{item.title || "Untitled"}</div>
          <div className="mt-1 text-xs text-slate-600">{(item.authors || []).join(", ")}</div>
          <div className="mt-1 text-xs text-slate-600">{item.venue || "—"} · {item.year || "—"}</div>
          <div className="mt-1 text-xs text-slate-600">Type: {item.type || "—"} · Indexing: {(item.indexing || []).join(", ") || "—"} · Scope: {item.scope || "—"}</div>
          {item.doi && (
            <div className="mt-1 text-xs"><a className="text-slate-900 underline" href={`https://doi.org/${item.doi}`} target="_blank" rel="noreferrer">DOI</a></div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          {onEdit && (
            <button onClick={onEdit} className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs hover:bg-slate-100">Edit</button>
          )}
          {onDelete && (
            <button onClick={handleDelete} className="rounded-lg border border-red-300 bg-white px-3 py-1.5 text-xs text-red-700 hover:bg-red-50">Delete</button>
          )}
        </div>
      </div>
    </div>
  );
}