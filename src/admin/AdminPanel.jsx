import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import AddProjectForm from "./AddProjectForm";
import ProjectsList from "./ProjectsList";
import { API } from "./adminUtils";

export default function AdminPanel() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function handleAuthError(err) {
    if (err?.response?.status === 401) {
      localStorage.removeItem("admin_token");
      navigate("/admin/login");
      return true;
    }
    return false;
  }

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/api/projects`);
      setProjects(data);
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  function handleAdded(newProject) {
    setProjects((prev) => [newProject, ...prev]);
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070d1a] px-3 md:px-4 py-6 md:py-8 transition-colors duration-300">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 dark:bg-cyan-500/8 rounded-full blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-3xl">
        <AdminHeader />
        <AddProjectForm onAdded={handleAdded} onAuthError={handleAuthError} />
        <ProjectsList
          projects={projects}
          loading={loading}
          onProjectsChange={setProjects}
          onAuthError={handleAuthError}
        />
      </div>
    </div>
  );
}
