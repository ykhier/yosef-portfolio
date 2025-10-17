// Education.jsx
import Title from "./Title.jsx";
import Line from "./Line.jsx";

const EDUCATION = [
    {
        id: 1,
        school: "ORT Braude College",
        degree: "B.Sc. Software Engineering (In Progress)",
        period: "2023 - Present",
        details: "GPA 85. Coursework in Algorithms, Databases, OS, Networks, and SE Lab.",
    },
    {
        id: 2,
        school: "ORT Braude",
        degree: "Practical Software Engineer (with honors)",
        period: "2018 - 2021",
        details: "Focused on Java/JavaFX, OOP, and project-based learning.",
    },
];

export default function Education() {
    return (

        <section className="px-4 py-12 scroll-mt-45 md:scroll-mt-28" id="education">
            <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white shadow-md p-8 mb-6">
                <Title title="Education" />

                <ul>
                    {EDUCATION.map((item) => (
                        <li key={item.id} className="mb-8">
                            <div className="flex flex-col md:flex-row justify-between gap-2">
                                <h3 className="text-lg font-semibold">{item.degree}</h3>
                                <span className="text-sm text-gray-500">{item.period}</span>
                            </div>
                            <div className="mt-0.5 text-gray-700">{item.school}</div>
                            {<p className="mt-2 text-gray-700">{item.details}</p>}
                            {item.id != (EDUCATION.length) && <Line />}
                        </li>
                    ))}
                </ul>
            </div>
        </section >
    );

}
