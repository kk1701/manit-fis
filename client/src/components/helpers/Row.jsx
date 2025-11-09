export default function Row({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-1.5">
      <div className="w-64 text-slate-500 text-sm">{label}</div>
      <div className="flex-1 font-medium text-slate-800">{value}</div>
    </div>
  );
}