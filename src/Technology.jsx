

function Technology(props) {
    const skills = props.skills;
    const title = props.title;

    return (
        <div className="flex flex-col">

            <div className="mt-12 grid grid-cols-4 gap-4 sm:grid-cols-3 md:grid-cols-6">
                <h1 className="text-left text-1xl font-bold mb-4 col-span-full"> {title} </h1>
                {skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                        <div
                            key={skill.name}
                            className="flex flex-col items-center gap-3 bg-transparent transition-transform duration-300 ease-out hover:scale-105"
                        >
                            <Icon
                                className={`h-7 w-7 ${skill.color}`}
                                title={skill.name}
                            />
                            <span className="text-sm font-medium text-gray-800">{skill.name}</span>
                        </div>
                    );
                })}
            </div>

        </div>

    );


}
export default Technology;