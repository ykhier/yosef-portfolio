import { useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  }

  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-lg md:text-2xl font-bold dark:text-white">Admin Panel</h1>
      <button
        onClick={handleLogout}
        className="text-sm font-semibold text-red-500 border border-red-400 hover:bg-red-50 px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}
