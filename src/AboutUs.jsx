import myPic from "./assets/my-pic.png";
import Title from "./Title";
function AboutUs() {
    const name = "Yosef Khier";
    return (
        <section className="px-4 py-12 scroll-mt-45 md:scroll-mt-28" id="about">
            <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white shadow-md p-8">
                <Title title="About Me" />
                <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
                    {/* Left: photo */}
                    <div className="shrink-0">
                        <img
                            src={myPic}
                            alt="Yosef Khier"
                            className="h-70 w-70 md:h-28 md:w-28 rounded-full"
                        />
                    </div>

                    {/* Right: name + description */}
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold">{name}</h2>
                        <p className="mt-2 text-lg text-gray-700">
                            Software Engineering student at{" "}
                            <span className="font-medium text-amber-700">ORT Braude College</span>, passionate
                            about crafting full-stack applications using Java, React, and Node.js. I maintain a GPA
                            of <span className="font-semibold text-amber-700">85</span> and continue to grow my skills
                            in modern software development.
                        </p>
                    </div>
                </div>
            </div>
        </section>


    );
}

export default AboutUs;