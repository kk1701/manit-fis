import { useState, useEffect } from "react";

export default function TagInput({ label, value, onChange }) {
  const [text, setText] = useState(Array.isArray(value) ? value.join(", ") : "");
  useEffect(() => { setText(Array.isArray(value) ? value.join(", ") : ""); }, [value]);
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          const arr = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
          onChange(arr);
        }}
        placeholder="e.g., Data Structures, Algorithms"
        className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
      />
    </div>
  );
}