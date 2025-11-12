import { useState } from "react";

import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import Modal from "./helpers/Modal";

export default function ProjectsSection({ items, onRefresh }) {
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  function openAdd() {
    setEditingItem(null);
    setShowModal(true);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Projects</h3>
          <p className="text-sm text-slate-600">Add ongoing or completed projects and future plans.</p>
        </div>
        <button onClick={openAdd} className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white">Add project</button>
      </div>

      {(!items || items.length === 0) && (
        <div className="rounded-xl border border-slate-200 p-4 text-sm text-slate-700">No projects yet.</div>
      )}

      <div className="grid gap-3">
        {items && items.map((pr) => (
          <ProjectCard key={pr._id} item={pr} onEdit={() => { setEditingItem(pr); setShowModal(true); }} onDelete={onRefresh} />
        ))}
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ProjectForm
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
