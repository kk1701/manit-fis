export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md border px-2 py-1 text-xs text-slate-700 hover:bg-slate-100"
          aria-label="Close"
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
}