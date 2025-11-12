import { useState, useEffect } from "react";
import { api } from "../api/http";

export default function ProfileHeader({ me }) {
  if (!me) return null;
  const [uploading, setUploading] = useState(false);
  const fileInputId = "photo-input";
  const [profile, setProfile] = useState(me);

  // keep local profile in sync when parent changes
  useEffect(() => setProfile(me), [me]);

  const initials = (profile?.name || "").split(" ").map((s) => s[0]).slice(0, 2).join("");
  const placeholder = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'>
       <rect width='100%' height='100%' fill='#E5E7EB'/>
       <text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' font-family='Inter, Arial' font-size='40' fill='#6B7280'>${initials || 'F'}</text>
     </svg>`
  )}`;

  async function uploadToThirdParty(file) {
    // Cloudinary unsigned preset support
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    if (cloudName && uploadPreset) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", uploadPreset);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error?.message || "Upload failed");

      console.log(data.secure_url);

      return data.secure_url;
    }

    throw new Error("No upload provider configured. Set VITE_CLOUDINARY_... or VITE_IMAGE_UPLOAD_URL");
  }

  async function onPickFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const photoUrl = await uploadToThirdParty(file);

      await api("/faculty/me", { method: "PUT", body: { photoUrl } });

      const refreshed = await api("/faculty/me");
      setProfile(refreshed);

      window.dispatchEvent(new Event("fis-profile-updated"));
    } catch (err) {
      alert(err.message || "Could not upload photo");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  useEffect(() => {
    async function refresh() {
      try {
        const f = await api("/faculty/me");
        setProfile(f);
      } catch {}
    }
    window.addEventListener("fis-profile-updated", refresh);
    return () => window.removeEventListener("fis-profile-updated", refresh);
  }, []);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-slate-100">
          <img
            src={profile?.photoUrl || placeholder}
            alt={profile?.name}
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
          <h2 className="text-xl font-semibold text-slate-900 leading-tight">Name: {profile?.name}</h2>
          <p className="text-sm text-slate-600">Email ID: {profile?.email || profile?.userInfo?.email || ""}</p>
          <p className="text-sm text-slate-600">EmpID: {profile?.empId || profile?.userInfo?.empId || ""}</p>
        </div>
      </div>
    </div>
  );
}