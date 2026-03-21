export const API = import.meta.env.VITE_API_URL || "";

export function authHeaders() {
  return { Authorization: `Bearer ${localStorage.getItem("admin_token")}` };
}

export const inputCls =
  "w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 dark:focus:border-blue-500 transition-all duration-200 text-sm";
