// Education.jsx
import Title from "./Title.jsx";
import { MotionDiv, MotionUl, MotionLi, fadeUp, staggerContainer, staggerCard } from "./animations";

const EDUCATION = [
    {
        id: 1,
        school: "ORT Braude College",
        degree: "B.Sc. Software Engineering (In Progress)",
        period: "2023 – Present",
        details: "GPA 85. Coursework in Algorithms, Databases, OS, Networks, and SE Lab.",
    },
    {
        id: 2,
        school: "ORT Braude",
        degree: "Practical Software Engineer (with honors)",
        period: "2018 – 2021",
        details: "Focused on Java/JavaFX, OOP, and project-based learning.",
    },
];

export default function Education() {
    return (
        <section className="px-4 py-12 scroll-mt-45 md:scroll-mt-28" id="education">
            <MotionDiv
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                className="mx-auto max-w-5xl rounded-2xl border border-slate-200/80 dark:border-slate-700/40 bg-white/80 dark:bg-slate-900/70 shadow-xl shadow-slate-200/40 dark:shadow-black/40 backdrop-blur-sm p-4 md:p-8 mb-6"
            >
                <Title title="Education" />
                <MotionUl
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1 }}
                    className="relative"
                >
                    {/* Vertical timeline line */}
                    <div className="absolute left-3.5 top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/60 via-cyan-400/40 to-transparent hidden md:block" />

                    {EDUCATION.map((item, idx) => (
                        <MotionLi key={item.id} variants={staggerCard} className="mb-8 last:mb-0 md:pl-12 relative">
                            {/* Timeline dot */}
                            <div className="hidden md:flex absolute left-0 top-1.5 w-7 h-7 rounded-full items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30">
                                <div className="w-2.5 h-2.5 rounded-full bg-white" />
                            </div>

                            <div className="rounded-xl border border-slate-100 dark:border-slate-700/50 bg-slate-50/80 dark:bg-slate-800/40 p-4 md:p-5">
                                <div className="flex flex-col md:flex-row justify-between gap-2 mb-1">
                                    <h3 className="font-display text-base font-semibold text-slate-800 dark:text-slate-100">{item.degree}</h3>
                                    <span className="text-xs font-medium text-blue-500 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-full whitespace-nowrap self-start">
                                        {item.period}
                                    </span>
                                </div>
                                <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">{item.school}</div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.details}</p>
                            </div>
                        </MotionLi>
                    ))}
                </MotionUl>
            </MotionDiv>
        </section>
    );
}
