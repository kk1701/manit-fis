import { useState, useEffect } from "react";

export default function ProfileHeader({ me }) {
  if (!me) return null;
  const [uploading, setUploading] = useState(false);
  const fileInputId = "photo-input";

  const initials = (me.name || "").split(" ").map((s) => s[0]).slice(0, 2).join("");
  const placeholder = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'>
       <rect width='100%' height='100%' fill='#E5E7EB'/>
       <text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' font-family='Inter, Arial' font-size='40' fill='#6B7280'>${initials || 'F'}</text>
     </svg>`
  )}`;

  async function onPickFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const token = localStorage.getItem("token");
      const fd = new FormData();
      fd.append("photo", file);
      // NOTE: Using fetch directly for multipart upload (api() forces JSON headers)
      const res = await fetch(`${API_BASE}/faculty/me/photo`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Upload failed");
      // Update local storage of current profile via a soft reload
      window.dispatchEvent(new Event("fis-profile-updated"));
    } catch (err) {
      alert(err.message || "Could not upload photo");
    } finally {
      setUploading(false);
      e.target.value = ""; // reset
    }
  }

  // Listen for refresh after upload and refetch minimal profile
  useEffect(() => {
    async function refresh() {
      try {
        const f = await api("/faculty/me");
        // naive: update in-place
        Object.assign(me, f);
      } catch {}
    }
    window.addEventListener("fis-profile-updated", refresh);
    return () => window.removeEventListener("fis-profile-updated", refresh);
  }, [me]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-slate-100">
          <img
            src={me.photoUrl || placeholder}
            alt={me.name}
            className="h-full w-full object-cover"
          />
          <button
            onClick={() => document.getElementById(fileInputId)?.click()}
            className="absolute bottom-1 right-1 rounded-lg bg-white/90 px-2 py-0.5 text-[11px] font-medium text-slate-800 shadow hover:bg-white"
            disabled={uploading}
            title="Edit profile picture"
          >
            {uploading ? "Uploading…" : "Edit"}
          </button>
          <input id={fileInputId} type="file" accept="image/*" className="hidden" onChange={onPickFile} />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-slate-900 leading-tight">Name: {me.name}</h2>
          <p className="text-sm text-slate-600">Email ID: {me.email || me.user?.empId || ""}</p>
          <p className="text-sm text-slate-600">EmpID: {me.empId || me.user?.empId || ""}</p>
        </div>
      </div>
    </div>
  );
}