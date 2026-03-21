import { useState, useEffect } from "react";
import axios from "axios";
import Title from "./Title.jsx";
import { MotionDiv, fadeUp, staggerContainer, staggerCard } from "./animations";

const API = import.meta.env.VITE_API_URL || "";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "personal", label: "Personal" },
  { key: "academic", label: "Academic" },
];

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    axios
      .get(`${API}/api/projects`)
      .then(({ data }) => setProjects(data))
      .catch(() => setError("Failed to load projects"))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="px-4 py-12 scroll-mt-45 md:scroll-mt-28" id="projects">
      <MotionDiv
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.06 }}
        className="mx-auto max-w-5xl rounded-2xl border border-slate-200/80 dark:border-slate-700/40 bg-white/80 dark:bg-slate-900/70 shadow-xl shadow-slate-200/40 dark:shadow-black/40 backdrop-blur-sm p-4 md:p-8"
      >
        <Title title="Projects" />

        {/* Category filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeCategory === key
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/25"
                  : "bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col border border-slate-200 dark:border-slate-700/50 rounded-xl overflow-hidden animate-pulse">
                <div className="w-full h-52 bg-slate-200 dark:bg-slate-800" />
                <div className="p-4 flex flex-col gap-3">
                  <div className="h-5 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                  <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-lg" />
                  <div className="h-3 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-red-400 py-12">{error}</p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="text-center text-slate-400 dark:text-slate-500 py-12">
            No projects found.
          </p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <MotionDiv
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            {filtered.map((project) => (
              <MotionDiv
                key={project.id}
                variants={staggerCard}
                className="group flex flex-col border border-slate-200/80 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-black/30 hover:border-blue-200 dark:hover:border-blue-800/60 transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-44 md:h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-display text-lg font-semibold text-slate-800 dark:text-slate-100 flex-1">
                      {project.title}
                    </h3>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-medium shrink-0 ${
                        project.category === "academic"
                          ? "bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-300"
                          : "bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300"
                      }`}
                    >
                      {project.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 flex-1 leading-relaxed">
                    {project.description}
                  </p>
                  <a
                    href={project.github_url}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-150 group/link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    View on GitHub
                    <svg className="w-3 h-3 transition-transform duration-150 group-hover/link:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </MotionDiv>
            ))}
          </MotionDiv>
        )}
      </MotionDiv>
    </section>
  );
}

export default Projects;
