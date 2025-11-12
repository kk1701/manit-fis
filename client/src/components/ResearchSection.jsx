import { useState } from "react";

import ResearchSubSection from "./ResearchSubSection";
import Modal from "./helpers/Modal";
import PublicationForm from "./PublicationForm";

export default function ResearchSection({ groups, onRefresh }) {
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // if set → edit, else add

  function openAdd() {
    setEditingItem(null);
    setShowModal(true);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Research Profile</h3>
          <p className="text-sm text-slate-600">Manage publications across conferences, general papers, and books/chapters.</p>
        </div>
        <button
          onClick={openAdd}
          className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white"
        >
          Add research work
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ResearchSubSection title="Conference Papers" items={groups.conference} onEdit={(it)=>{ setEditingItem(it); setShowModal(true); }} onDelete={onRefresh} />
        <ResearchSubSection title="General Research Papers" items={groups.general} onEdit={(it)=>{ setEditingItem(it); setShowModal(true); }} onDelete={onRefresh} />
        <ResearchSubSection title="Books" items={groups.book} onEdit={(it)=>{ setEditingItem(it); setShowModal(true); }} onDelete={onRefresh} />
        <ResearchSubSection title="Book Chapters" items={groups.chapter} onEdit={(it)=>{ setEditingItem(it); setShowModal(true); }} onDelete={onRefresh} />
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PublicationForm
            initial={editingItem || null}
            onClose={() => setShowModal(false)}
            onSaved={async () => {
              setShowModal(false);
              await onRefresh();
            }}
          />
        </Modal>
      )}
    </div>
  );
}

