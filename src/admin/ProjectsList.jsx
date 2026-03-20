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
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">All Projects ({projects.length})</h2>
      {projects.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">No projects yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {projects.map((p) => (
            <li key={p.id} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              {editingId === p.id ? (
                <EditProjectForm
                  project={p}
                  onSave={handleSave}
                  onCancel={() => setEditingId(null)}
                  onAuthError={onAuthError}
                />
              ) : (
                <div className="flex items-center gap-4 p-3">
                  <img src={p.image_url} alt={p.title} className="w-20 h-14 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium dark:text-white truncate">{p.title}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      p.category === "academic"
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    }`}>{p.category}</span>
                  </div>
                  <div className="flex gap-3 flex-shrink-0">
                    <button onClick={() => setEditingId(p.id)}
                      className="text-sm font-medium text-blue-500 hover:text-blue-700 cursor-pointer">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(p.id)}
                      className="text-sm font-medium text-red-500 hover:text-red-700 cursor-pointer">
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
