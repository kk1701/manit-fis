import { useState, useEffect, useRef } from "react";

export default function TagInput({ label, value = [], onChange }) {
  const [input, setInput] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    setInput("");
  }, [value]);

  function addFromString(str) {
    if (!str) return;
    const parts = str
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length === 0) return;
    const next = Array.from(new Set([...(value || []), ...parts]));
    onChange(next);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addFromString(input);
      setInput("");
    } else if (e.key === 'Backspace' && input === "") {
      if ((value || []).length === 0) return;
      const next = (value || []).slice(0, -1);
      onChange(next);
    }
  }

  function removeAt(i) {
    const next = (value || []).filter((_, idx) => idx !== i);
    onChange(next);
  }

  async function handlePaste(e) {
    const text = (e.clipboardData || window.clipboardData).getData('text');
    if (text && text.includes(',')) {
      e.preventDefault();
      addFromString(text);
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <div
        ref={containerRef}
        className="mt-1 min-h-[44px] w-full rounded-xl border border-slate-300 bg-white px-3 py-2 flex flex-wrap items-center gap-2"
      >
        {(value || []).map((t, i) => (
          <div key={t + i} className="flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1 text-xs">
            <span className="text-slate-700">{t}</span>
            <button type="button" onClick={() => removeAt(i)} className="text-red-500 hover:text-red-700">×</button>
          </div>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder="Type and press Enter or use commas to add tags"
          className="flex-1 min-w-[120px] bg-transparent outline-none text-sm"
        />
      </div>
    </div>
  );
}