import { useState, useRef } from "react";
import axios from "axios";
import { API, authHeaders, inputCls } from "./adminUtils";

export default function EditProjectForm({ project, onSave, onCancel, onAuthError }) {
  const [form, setForm] = useState({
    title: project.title,
    description: project.description,
    github_url: project.github_url,
    category: project.category,
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(project.image_url);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("github_url", form.github_url);
      fd.append("category", form.category);
      if (image) fd.append("image", image);
      const { data } = await axios.put(`${API}/api/projects/${project.id}`, fd, {
        headers: { ...authHeaders(), "Content-Type": "multipart/form-data" },
      });
      onSave(data);
    } catch (err) {
      if (!onAuthError(err)) setError(err.response?.data?.error || "Failed to update project");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-3">
      <input type="text" value={form.title}
        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        required className={inputCls} placeholder="Title" />
      <textarea value={form.description}
        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
        required rows={3} className={`${inputCls} resize-none`} placeholder="Description" />
      <input type="url" value={form.github_url}
        onChange={(e) => setForm((f) => ({ ...f, github_url: e.target.value }))}
        required className={inputCls} placeholder="GitHub URL" />
      <div className="flex gap-4">
        {["personal", "academic"].map((cat) => (
          <label key={cat} className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="edit-category" value={cat}
              checked={form.category === cat}
              onChange={() => setForm((f) => ({ ...f, category: cat }))}
              className="accent-blue-600" />
            <span className="capitalize dark:text-gray-200 text-sm">{cat}</span>
          </label>
        ))}
      </div>
      <div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" id="edit-image-upload"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;
            setImage(file);
            setPreview(URL.createObjectURL(file));
          }} />
        <label htmlFor="edit-image-upload"
          className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl py-4 cursor-pointer hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {image ? image.name : "Click to replace image (optional)"}
          </span>
        </label>
        {preview && <img src={preview} alt="preview" className="mt-2 w-full h-36 object-cover rounded-lg" />}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition-colors text-sm">
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button type="button" onClick={onCancel}
          className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold py-2 rounded-lg transition-colors text-sm">
          Cancel
        </button>
      </div>
    </form>
  );
}
