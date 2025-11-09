export default function ResearchSubSection({ title, items, onEdit }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-semibold text-slate-900">{title}</h4>
      </div>
      {(!items || items.length === 0) ? (
        <p className="text-sm text-slate-600">No entries yet.</p>
      ) : (
        <div className="grid gap-3">
          {items.map((p) => (
            <PublicationCard key={p._id} item={p} onEdit={()=>onEdit(p)} />
          ))}
        </div>
      )}
    </div>
  );
}