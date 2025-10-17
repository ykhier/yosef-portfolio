import Title from "./Title.jsx";
import BParkPicture from "./assets/BPark_software.png";
import yosefToolsPicture from "./assets/yosef_tools_website_picture.png";
import toDoListPicture from "./assets/To_Do_List_picture.png";
import maxVsBonesPicture from "./assets/max_vs_bones_picture.png";
import ardiunoCalculatorPicture from "./assets/arduino_calculator_picture.png";

function Projects() {

    const projects = [
        {
            id: 1,
            title: "BPark Software",
            description: "A parking management system built with JavaFX and MySQL, designed to handle parking orders, vehicle entry, and subscriptions, Developed with a client–server architecture, it provides role-based access for admins, subscribers, and dispatchers each managing tasks like reservations, user control, and activity tracking.",
            imageName: BParkPicture,
            githubUrl: "https://github.com/ykhier/To-Do-List",
        },
        {
            id: 2,
            title: "Yosef Tools Website",
            description: "A web-based tool ordering platform built with HTML, CSS and JavaScript with using LocalStorage for client-side data management. Designed with a 4-layer architecture to separate UI, logic, and data handling, Includes user and admin login, live chat support and a smooth interface for browsing and ordering tools.",
            imageName: yosefToolsPicture,
            githubUrl: "https://github.com/ykhier/yosef-tools_WebSite",
        },
        {
            id: 3,
            title: "To-Do List Website",
            description: "A task management web app built with React.js and LocalStorage for saving data locally. Users can add, remove, reorder, and track tasks, with real-time task count updates, Designed for simplicity and productivity, offering a smooth and responsive user experience.",
            imageName: toDoListPicture,
            githubUrl: "https://github.com/ykhier/yosef-tools_WebSite",
        },
        {
            id: 4,
            title: "Max vs Bones Game",
            description: "A 2D arcade-style game developed in Processing where the player controls a dog named Max to catch falling bones and score points, The game features music, sound effects, lives system (hearts), and win/lose conditions, Built using procedural logic with arrays for object handling.",
            imageName: maxVsBonesPicture,
            githubUrl: "https://github.com/ykhier/Max_vs_Bone_Game",
        },
        {
            id: 5,
            title: "Arduino Calculator",
            description: "I built this calculator on the Tinkercad website using Arduino Uno, a 4×4 keypad, and a 16×2 LCD display. It performs basic math operations with LED feedback, using the Keypad and LiquidCrystal libraries to process input and show results in real time, with an RGB LED system that changes color based on the calculation outcome.",
            imageName: ardiunoCalculatorPicture,
            githubUrl: "https://github.com/ykhier/Arduino_calculator_project",
        },
    ];
    return (
        <section className="px-4 py-12 scroll-mt-45 md:scroll-mt-28" id="projects" >
            <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white shadow-md p-8">
                <Title title="Projects" />
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {projects.map((project) => (
                        <div key={project.id} className="flex flex-col border border-gray-200 rounded-lg shadow-lg">
                            <img src={project.imageName} alt={project.title} className="w-full h-60 rounded-t-lg" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                            </div>
                            <a href={project.githubUrl} className="text-blue-500 pb-4 pl-4 hover:underline" target="_blank">View on GitHub</a>
                        </div>
                    ))}
                </div>
            </div>
        </ section >
    );
}
export default Projects;