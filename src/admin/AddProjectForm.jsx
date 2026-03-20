import { useState, useRef } from "react";
import axios from "axios";
import { API, authHeaders, inputCls } from "./adminUtils";

const emptyForm = {
  title: "",
  description: "",
  github_url: "",
  category: "personal",
  image: null,
};

export default function AddProjectForm({ onAdded, onAuthError }) {
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileRef = useRef();

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setForm((f) => ({ ...f, image: file }));
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!form.image) { setError("Please select an image"); return; }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("github_url", form.github_url);
      fd.append("category", form.category);
      fd.append("image", form.image);
      await axios.post(`${API}/api/projects`, fd, {
        headers: { ...authHeaders(), "Content-Type": "multipart/form-data" },
      });
      setSuccess("Project added successfully!");
      setForm(emptyForm);
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
      onAdded();
    } catch (err) {
      if (!onAuthError(err)) setError(err.response?.data?.error || "Failed to add project");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-8">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">Add New Project</h2>
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
        <div className="flex gap-4">
          {["personal", "academic"].map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="category" value={cat}
                checked={form.category === cat}
                onChange={() => setForm((f) => ({ ...f, category: cat }))}
                className="accent-blue-600" />
              <span className="capitalize dark:text-gray-200">{cat}</span>
            </label>
          ))}
        </div>
        <div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" />
          <label htmlFor="image-upload"
            className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl py-6 cursor-pointer hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {form.image ? form.image.name : "Click to upload image"}
            </span>
          </label>
          {preview && <img src={preview} alt="preview" className="mt-3 w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-600" />}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
        <button type="submit" disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition-colors cursor-pointer">
          {loading ? "Uploading..." : "Add Project"}
        </button>
      </form>
    </div>
  );
}
