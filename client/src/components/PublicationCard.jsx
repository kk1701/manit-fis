export default function PublicationCard({ item, onEdit }) {
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
        <button onClick={onEdit} className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs hover:bg-slate-100">Edit</button>
      </div>
    </div>
  );
}