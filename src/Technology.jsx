import { MotionDiv, staggerContainer, staggerCard } from "./animations";

function Technology({ skills, title }) {
    return (
        <div className="flex flex-col mt-8">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5 flex items-center gap-2">
                <span className="h-px w-4 bg-blue-400/60 inline-block" />
                {title}
            </h2>
            <MotionDiv
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.05 }}
                className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7"
            >
                {skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                        <MotionDiv
                            key={skill.name}
                            variants={staggerCard}
                            className="group flex flex-col items-center gap-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50 px-3 py-4 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-700/60 hover:shadow-md hover:shadow-blue-100/50 dark:hover:shadow-blue-950/40 hover:bg-white dark:hover:bg-slate-800 cursor-default"
                        >
                            <Icon
                                className={`h-8 w-8 ${skill.color} transition-transform duration-200 group-hover:scale-110`}
                                title={skill.name}
                            />
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors duration-200 text-center leading-tight">
                                {skill.name}
                            </span>
                        </MotionDiv>
                    );
                })}
            </MotionDiv>
        </div>
    );
}

export default Technology;
