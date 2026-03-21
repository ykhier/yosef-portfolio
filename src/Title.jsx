function Title({ title }) {
    return (
        <div className="text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent tracking-tight mb-3">
                {title}
            </h1>
            <div className="flex items-center justify-center gap-2">
                <div className="h-px w-10 bg-gradient-to-r from-transparent via-blue-400 to-blue-500 opacity-60" />
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <div className="h-px w-10 bg-gradient-to-l from-transparent via-blue-400 to-blue-500 opacity-60" />
            </div>
        </div>
    );
}

export default Title;
