import { useState, useRef } from "react";
import axios from "axios";
import { API, authHeaders, inputCls } from "./adminUtils";

const emptyForm = {
  title: "",
  description: "",
  github_url: "",
  category: "personal",
  image_url: "",
};

export default function AddProjectForm({ onAdded, onAuthError }) {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileRef = useRef();

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, image_url: reader.result }));
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!form.image_url) { setError("Please select an image"); return; }
    setLoading(true);
    try {
      await axios.post(`${API}/api/projects`, form, { headers: authHeaders() });
      setSuccess("Project added successfully!");
      setForm(emptyForm);
      if (fileRef.current) fileRef.current.value = "";
      onAdded();
    } catch (err) {
      if (!onAuthError(err)) setError(err.response?.data?.error || "Failed to add project");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/40 bg-white/80 dark:bg-slate-900/70 shadow-xl shadow-slate-200/30 dark:shadow-black/30 backdrop-blur-sm p-4 md:p-6 mb-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
        <h2 className="font-display text-base font-semibold text-slate-800 dark:text-slate-100">Add New Project</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Project title" value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          required className={inputCls} />

        <textarea placeholder="Description" value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          required rows={4} className={`${inputCls} resize-none`} />

        <input type="url" placeholder="GitHub URL" value={form.github_url}
          onChange={(e) => setForm((f) => ({ ...f, github_url: e.target.value }))}
          required className={inputCls} />

        {/* Image upload */}
        <div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" />
          <label htmlFor="image-upload"
            className="flex flex-col items-center justify-center gap-2 w-full border-2 border-dashed border-slate-300 dark:border-slate-600/60 rounded-xl py-6 cursor-pointer hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className={`text-sm font-medium ${form.image_url ? "text-blue-500 dark:text-blue-400" : "text-slate-500 dark:text-slate-400"}`}>
              {form.image_url ? "Image selected ✓" : "Click to upload image"}
            </span>
          </label>
          {form.image_url && (
            <img src={form.image_url} alt="preview" className="mt-3 w-full h-36 md:h-48 object-cover rounded-xl border border-slate-200 dark:border-slate-700/50" />
          )}
        </div>

        {/* Category */}
        <div className="flex gap-4">
          {["personal", "academic"].map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${form.category === cat ? "border-blue-500 bg-blue-500" : "border-slate-300 dark:border-slate-600 group-hover:border-blue-400"}`}
                onClick={() => setForm((f) => ({ ...f, category: cat }))}>
                {form.category === cat && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <input type="radio" name="category" value={cat}
                checked={form.category === cat}
                onChange={() => setForm((f) => ({ ...f, category: cat }))}
                className="sr-only" />
              <span className="text-sm capitalize text-slate-600 dark:text-slate-300">{cat}</span>
            </label>
          ))}
        </div>

        {error && (
          <p className="text-sm text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 rounded-xl px-3 py-2">{error}</p>
        )}
        {success && (
          <p className="text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 rounded-xl px-3 py-2">{success}</p>
        )}

        <button type="submit" disabled={loading}
          className="w-full py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed">
          {loading ? "Uploading..." : "Add Project"}
        </button>
      </form>
    </div>
  );
}
