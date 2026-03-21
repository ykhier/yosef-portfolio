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
        className="mx-auto max-w-5xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md p-4 md:p-8"
      >
        <Title title="Projects" />

        {/* Category filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {CATEGORIES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                activeCategory === key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden animate-pulse">
                <div className="w-full h-60 bg-gray-200 dark:bg-gray-700" />
                <div className="p-4 flex flex-col gap-3">
                  <div className="h-5 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-3 w-4/6 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-red-500 py-12">{error}</p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">
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
                className="flex flex-col border border-gray-200 dark:border-gray-700 dark:bg-gray-900 rounded-lg shadow-lg"
              >
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-44 md:h-60 object-cover rounded-t-lg"
                />
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold dark:text-gray-100">
                      {project.title}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        project.category === "academic"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      }`}
                    >
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 flex-1">
                    {project.description}
                  </p>
                </div>
                <a
                  href={project.github_url}
                  className="text-blue-500 pb-4 pl-4 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  View on GitHub
                </a>
              </MotionDiv>
            ))}
          </MotionDiv>
        )}
      </MotionDiv>
    </section>
  );
}

export default Projects;
