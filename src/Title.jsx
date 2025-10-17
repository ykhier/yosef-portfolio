

function Title(props) {
    return (
        <div className="mx-auto max-w-5xl text-center mb-6">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-300 bg-clip-text text-transparent tracking-tight mb-2">
                {props.title}
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-300 rounded-full mx-auto"></div>
        </div>
    );
}

export default Title;