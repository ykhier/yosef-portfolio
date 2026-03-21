import { useState, useRef } from "react";
import axios from "axios";
import { API, authHeaders, inputCls } from "./adminUtils";

export default function EditProjectForm({ project, onSave, onCancel, onAuthError }) {
  const [form, setForm] = useState({
    title: project.title,
    description: project.description,
    github_url: project.github_url,
    category: project.category,
    image_url: project.image_url,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef();

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const MAX = 800;
        let { width, height } = img;
        if (width > MAX || height > MAX) {
          if (width > height) { height = Math.round(height * MAX / width); width = MAX; }
          else { width = Math.round(width * MAX / height); height = MAX; }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        setForm((f) => ({ ...f, image_url: canvas.toDataURL("image/jpeg", 0.8) }));
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.put(`${API}/api/projects/${project.id}`, form, {
        headers: authHeaders(),
      });
      onSave(data);
    } catch (err) {
      if (!onAuthError(err)) setError(err.response?.data?.error || "Failed to update project");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-3 bg-slate-50/80 dark:bg-slate-800/30">
      <input type="text" value={form.title}
        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        required className={inputCls} placeholder="Title" />
      <textarea value={form.description}
        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
        required rows={3} className={`${inputCls} resize-none`} placeholder="Description" />
      <input type="url" value={form.github_url}
        onChange={(e) => setForm((f) => ({ ...f, github_url: e.target.value }))}
        required className={inputCls} placeholder="GitHub URL" />
      <div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" id="edit-image-upload"
          onChange={handleImageChange} />
        <label htmlFor="edit-image-upload"
          className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-slate-300 dark:border-slate-600/60 rounded-xl py-3 cursor-pointer hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all duration-200">
          <span className="text-sm text-slate-500 dark:text-slate-400">Click to replace image (optional)</span>
        </label>
        {form.image_url && (
          <img src={form.image_url} alt="preview" className="mt-2 w-full h-36 object-cover rounded-xl border border-slate-200 dark:border-slate-700/50" />
        )}
      </div>
      <div className="flex gap-4">
        {["personal", "academic"].map((cat) => (
          <label key={cat} className="flex items-center gap-2 cursor-pointer group">
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${form.category === cat ? "border-blue-500 bg-blue-500" : "border-slate-300 dark:border-slate-600 group-hover:border-blue-400"}`}
              onClick={() => setForm((f) => ({ ...f, category: cat }))}>
              {form.category === cat && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
            <input type="radio" name="edit-category" value={cat}
              checked={form.category === cat}
              onChange={() => setForm((f) => ({ ...f, category: cat }))}
              className="sr-only" />
            <span className="text-sm capitalize text-slate-600 dark:text-slate-300">{cat}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-sm text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 rounded-xl px-3 py-2">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={loading}
          className="flex-1 py-2 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-md shadow-blue-500/20 transition-all duration-200 disabled:opacity-60">
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button type="button" onClick={onCancel}
          className="flex-1 border border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 font-semibold py-2 rounded-xl transition-all duration-200 text-sm">
          Cancel
        </button>
      </div>
    </form>
  );
}
