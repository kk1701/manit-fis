import { Link } from "react-router-dom";

export default function FacultyCard({ faculty }) {
  const placeholder = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'><rect width='100%' height='100%' fill='#E5E7EB'/><text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' font-family='Inter, Arial' font-size='48' fill='#6B7280'>${(faculty.name||"")[0]||'F'}</text></svg>`
  )}`;

  return (
    <div className="rounded-2xl border bg-white p-4 flex flex-col">
      <div className="flex items-center gap-3">
        <div className="h-16 w-16 rounded-xl overflow-hidden bg-slate-100">
          <img src={faculty.photoUrl || placeholder} alt={faculty.name} className="h-full w-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-slate-900">{faculty.name}</div>
          <div className="text-sm text-slate-600">{faculty.designation || "—"}</div>
          <div className="text-sm text-slate-600">{faculty.department || "—"}</div>
        </div>
      </div>

      <div className="mt-4">
        <Link to={`/faculty/${faculty._id}`} className="inline-block w-full text-center rounded-xl border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">
          View complete profile
        </Link>
      </div>
    </div>
  );
}