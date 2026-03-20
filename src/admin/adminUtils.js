export const API = import.meta.env.VITE_API_URL || "http://localhost:3001";

export function authHeaders() {
  return { Authorization: `Bearer ${localStorage.getItem("admin_token")}` };
}

export const inputCls =
  "border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full";
