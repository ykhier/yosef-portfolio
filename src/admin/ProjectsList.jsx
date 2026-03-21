import { useState } from "react";
import axios from "axios";
import EditProjectForm from "./EditProjectForm";
import { API, authHeaders } from "./adminUtils";

export default function ProjectsList({ projects, onProjectsChange, onAuthError }) {
  const [editingId, setEditingId] = useState(null);

  async function handleDelete(id) {
    if (!confirm("Delete this project?")) return;
    try {
      await axios.delete(`${API}/api/projects/${id}`, { headers: authHeaders() });
      onProjectsChange((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      if (!onAuthError(err)) alert("Failed to delete project");
    }
  }

  function handleSave(updated) {
    onProjectsChange((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditingId(null);
  }

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/40 bg-white/80 dark:bg-slate-900/70 shadow-xl shadow-slate-200/30 dark:shadow-black/30 backdrop-blur-sm p-4 md:p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-slate-600 to-slate-500 dark:from-slate-600 dark:to-slate-500 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
          </svg>
        </div>
        <h2 className="font-display text-base font-semibold text-slate-800 dark:text-slate-100">
          All Projects
          <span className="ml-2 text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{projects.length}</span>
        </h2>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-10">
          <svg className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
          </svg>
          <p className="text-slate-500 dark:text-slate-400 text-sm">No projects yet. Add your first one above.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {projects.map((p) => (
            <li key={p.id} className="border border-slate-200/80 dark:border-slate-700/50 rounded-xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-600 transition-colors duration-200">
              {editingId === p.id ? (
                <EditProjectForm
                  project={p}
                  onSave={handleSave}
                  onCancel={() => setEditingId(null)}
                  onAuthError={onAuthError}
                />
              ) : (
                <div className="flex items-center gap-3 p-3">
                  <img src={p.image_url} alt={p.title} className="w-16 h-12 md:w-20 md:h-14 object-cover rounded-lg flex-shrink-0 border border-slate-100 dark:border-slate-700/50" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 dark:text-slate-100 truncate text-sm md:text-base">{p.title}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium mt-0.5 inline-block ${
                      p.category === "academic"
                        ? "bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-300"
                        : "bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300"
                    }`}>{p.category}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2 flex-shrink-0">
                    <button onClick={() => setEditingId(p.id)}
                      className="text-xs font-medium text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-800/50 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-all duration-150">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(p.id)}
                      className="text-xs font-medium text-red-500 hover:text-red-700 dark:hover:text-red-300 cursor-pointer px-2.5 py-1 rounded-lg border border-red-200 dark:border-red-800/50 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all duration-150">
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
