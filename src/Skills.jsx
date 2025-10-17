import Title from "./Title.jsx";
import Technology from "./Technology.jsx";
import Line from "./Line.jsx";

import {
    SiC, SiGithub, SiJavascript, SiReact, SiTailwindcss, SiPython, SiMysql, SiCss3, SiHtml5
} from "react-icons/si";
import { FaJava, FaGitAlt, FaGithub, FaMicrosoft, FaProjectDiagram } from "react-icons/fa";

import { Icon } from "@iconify/react";

const EclipseIcon = (props) => <Icon icon="logos:eclipse-icon" {...props} />;
const VsCodeIcon = (props) => <Icon icon="vscode-icons:file-type-vscode" {...props} />;
const UbuntuIcon = (props) => <Icon icon="logos:ubuntu" {...props} />;

function Skills() {
    const skills = [
        { name: "C", icon: SiC, color: "text-sky-500" },
        { name: "Java", icon: FaJava, color: "text-orange-700" },
        { name: "HTML", icon: SiHtml5, color: "text-orange-500" },
        { name: "CSS", icon: SiCss3, color: "text-blue-500" },
        { name: "GitHub", icon: SiGithub, color: "text-neutral-900" },
        { name: "JavaScript", icon: SiJavascript, color: "text-yellow-500" },
        { name: "React", icon: SiReact, color: "text-sky-400" },
        { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-500" },
        { name: "Python", icon: SiPython, color: "text-blue-500" },
        { name: "MySQL", icon: SiMysql, color: "text-blue-600" },
    ];

    const tools = [
        { name: "Eclipse", icon: EclipseIcon, color: "" },
        { name: "Visual Paradigm", icon: FaProjectDiagram, color: "text-green-700" },
        { name: "Visual Studio", icon: FaMicrosoft, color: "text-purple-700" },
        { name: "VS Code", icon: VsCodeIcon, color: "" },
        { name: "Linux", icon: UbuntuIcon, color: "" },
        { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
        { name: "GitHub", icon: FaGithub, color: "text-neutral-900" },
    ];

    return (
        <section className="px-4 py-12 scroll-mt-45 md:scroll-mt-28" id="skills" >
            <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white shadow-md p-8">
                <Title title="Skills" />
                <Technology skills={skills} title="Programming & Web Technologies" />
                <Line />
                <Technology skills={tools} title="Tools & Platforms" />
            </div>
        </section>
    );
}

export default Skills;
