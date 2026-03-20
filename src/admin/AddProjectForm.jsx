import { useState } from "react";
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

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setSuccess("");
    setLoading(true);
    try {
      await axios.post(`${API}/api/projects`, form, { headers: authHeaders() });
      setSuccess("Project added successfully!");
      setForm(emptyForm);
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
        <input type="url" placeholder="Image URL (e.g. https://...)" value={form.image_url}
          onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
          required className={inputCls} />
        {form.image_url && (
          <img src={form.image_url} alt="preview" className="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-600" />
        )}
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
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
        <button type="submit" disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition-colors cursor-pointer">
          {loading ? "Adding..." : "Add Project"}
        </button>
      </form>
    </div>
  );
}
