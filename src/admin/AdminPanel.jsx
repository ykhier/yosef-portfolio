import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import AddProjectForm from "./AddProjectForm";
import ProjectsList from "./ProjectsList";
import { API } from "./adminUtils";

export default function AdminPanel() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  function handleAuthError(err) {
    if (err?.response?.status === 401) {
      localStorage.removeItem("admin_token");
      navigate("/admin/login");
      return true;
    }
    return false;
  }

  async function fetchProjects() {
    try {
      const { data } = await axios.get(`${API}/api/projects`);
      setProjects(data);
    } catch (err) {
      handleAuthError(err);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchProjects(); }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-3 md:px-4 py-6 md:py-8">
      <div className="mx-auto max-w-3xl">
        <AdminHeader />
        <AddProjectForm onAdded={fetchProjects} onAuthError={handleAuthError} />
        <ProjectsList projects={projects} onProjectsChange={setProjects} onAuthError={handleAuthError} />
      </div>
    </div>
  );
}
