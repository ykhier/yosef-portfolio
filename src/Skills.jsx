import Title from "./Title.jsx";
import Technology from "./Technology.jsx";
import Line from "./Line.jsx";
import { MotionDiv, fadeUp } from "./animations";

import {
    SiC, SiGithub, SiJavascript, SiReact, SiTailwindcss, SiPython, SiMysql, SiCss3, SiHtml5, SiNextdotjs
} from "react-icons/si";
import { FaJava, FaGitAlt, FaGithub, FaMicrosoft, FaProjectDiagram } from "react-icons/fa";
import { Icon } from "@iconify/react";

const EclipseIcon = (props) => <Icon icon="logos:eclipse-icon" {...props} />;
const VsCodeIcon  = (props) => <Icon icon="vscode-icons:file-type-vscode" {...props} />;
const UbuntuIcon  = (props) => <Icon icon="logos:ubuntu" {...props} />;
const ShadcnIcon  = (props) => <Icon icon="simple-icons:shadcnui" {...props} />;

function Skills() {
    const skills = [
        { name: "C",          icon: SiC,          color: "text-sky-500" },
        { name: "Java",       icon: FaJava,        color: "text-orange-700" },
        { name: "HTML",       icon: SiHtml5,       color: "text-orange-500" },
        { name: "CSS",        icon: SiCss3,        color: "text-blue-500" },
        { name: "GitHub",     icon: SiGithub,      color: "text-neutral-900 dark:text-gray-100" },
        { name: "JavaScript", icon: SiJavascript,  color: "text-yellow-500" },
        { name: "React",      icon: SiReact,       color: "text-sky-400" },
        { name: "Tailwind",   icon: SiTailwindcss, color: "text-cyan-500" },
        { name: "Python",     icon: SiPython,      color: "text-blue-500" },
        { name: "MySQL",      icon: SiMysql,       color: "text-blue-600" },
        { name: "Next.js",    icon: SiNextdotjs,   color: "text-neutral-900 dark:text-gray-100" },
        { name: "shadcn/ui",  icon: ShadcnIcon,    color: "text-neutral-800 dark:text-gray-100" },
    ];

    const tools = [
        { name: "Eclipse",         icon: EclipseIcon,      color: "" },
        { name: "Visual Paradigm", icon: FaProjectDiagram, color: "text-green-700" },
        { name: "Visual Studio",   icon: FaMicrosoft,      color: "text-purple-700" },
        { name: "VS Code",         icon: VsCodeIcon,       color: "" },
        { name: "Linux",           icon: UbuntuIcon,       color: "" },
        { name: "Git",             icon: FaGitAlt,         color: "text-orange-600" },
        { name: "GitHub",          icon: FaGithub,         color: "text-neutral-900 dark:text-gray-100" },
    ];

    return (
        <section className="px-4 py-12 scroll-mt-45 md:scroll-mt-28" id="skills">
            <MotionDiv
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.08 }}
                className="mx-auto max-w-5xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md p-8"
            >
                <Title title="Skills" />
                <Technology skills={skills} title="Programming & Web Technologies" />
                <Line />
                <Technology skills={tools} title="Tools & Platforms" />
            </MotionDiv>
        </section>
    );
}

export default Skills;
