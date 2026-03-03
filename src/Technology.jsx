import { MotionDiv, staggerContainer, staggerCard } from "./animations";

function Technology({ skills, title }) {
    return (
        <div className="flex flex-col mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-100 mb-5">
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
                            className="group flex flex-col items-center gap-2.5 rounded-xl border border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 px-3 py-4 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md hover:bg-white dark:hover:bg-gray-700 cursor-default"
                        >
                            <Icon
                                className={`h-8 w-8 ${skill.color} transition-transform duration-200 group-hover:scale-110`}
                                title={skill.name}
                            />
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-200 text-center leading-tight">
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
