import myPic from "./assets/my-pic.png";
import Title from "./Title";
import { MotionDiv, fadeUp } from "./animations";

function AboutUs() {
    const name = "Yosef Khier";
    return (
        <section className="px-4 py-12 scroll-mt-45 md:scroll-mt-28" id="about">
            <MotionDiv
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                className="mx-auto max-w-5xl rounded-2xl border border-slate-200/80 dark:border-slate-700/40 bg-white/80 dark:bg-slate-900/70 shadow-xl shadow-slate-200/40 dark:shadow-black/40 backdrop-blur-sm p-4 md:p-8"
            >
                <Title title="About Me" />

                <div className="flex flex-col items-center gap-8 md:flex-row md:gap-10">
                    {/* Photo */}
                    <div className="shrink-0 relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 blur-md opacity-30 scale-110" />
                        <div className="relative p-1 rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-teal-400">
                            <img
                                src={myPic}
                                alt="Yosef Khier"
                                className="h-36 w-36 md:h-44 md:w-44 rounded-full object-cover ring-2 ring-white dark:ring-slate-900"
                            />
                        </div>
                    </div>

                    {/* Text */}
                    <div className="text-center md:text-left">
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                            {name}
                        </h2>
                        <p className="text-sm font-medium text-blue-500 dark:text-cyan-400 mb-4 tracking-wide uppercase">
                            Software Engineering Student
                        </p>
                        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                            Fourth-year Software Engineering student at{" "}
                            <span className="font-semibold text-blue-600 dark:text-blue-400">ORT Braude College</span>{" "}
                            with a GPA of{" "}
                            <span className="font-semibold text-cyan-600 dark:text-cyan-400">85</span>,
                            passionate about building modern and scalable software applications.
                            Continuously developing strong problem-solving skills and expanding knowledge in
                            contemporary software development practices.
                        </p>
                    </div>
                </div>
            </MotionDiv>
        </section>
    );
}

export default AboutUs;
