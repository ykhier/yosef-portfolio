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
                className="mx-auto max-w-5xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md p-8"
            >
                <Title title="About Me" />
                <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
                    <div className="shrink-0">
                        <img
                            src={myPic}
                            alt="Yosef Khier"
                            className="h-70 w-70 md:h-28 md:w-28 rounded-full"
                        />
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold dark:text-gray-100">{name}</h2>
                        <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
                Fourth-year Software Engineering student at <span className="font-medium text-amber-700"> ORT Braude College </span> with a GPA of <span className="font-medium text-amber-700"> 85 </span>,
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
