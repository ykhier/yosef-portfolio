import { useState } from "react";
function header() {

    const links = [
        { label: "About", href: "#about" },
        { label: "Skills", href: "#skills" },
        { label: "Eduction", href: "#education" },
        { label: "Projects", href: "#projects" },
        { label: "Contact", href: "#contact" },
    ];
    const name = "Yosef Khier";
    const [open, setOpen] = useState(false);

    return (
        <header class="p-4 shadow-md sticky z-50 bg-white  top-0">
            <div class="flex flex-row justify-between">
                { /* Left side */}
                <div className="ml-4">
                    <span className="text-amber-950 font-bold"> {name} </span>
                </div>
                {/* Center side side */}
                <div>
                    <ul class="hidden md:flex flex-row gap-6 ...">
                        {links.map((link) => (
                            <li key={link.href} className="cursor-pointer hover:text-blue-500">
                                <a href={link.href} > {link.label} </a>
                            </li>
                        ))}
                    </ul>
                    {/* Right: mobile menu button */}
                    <button
                        type="button"
                        className="md:hidden rounded-lg hover:bg-gray-100"
                        onClick={() => setOpen(!open)}
                    >
                        {/* Hamburger / X */}
                        {open == false ? (
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        )}

                    </button>


                </div>
                {/* Right side the plan will be that field will be for light and dark mode */}
                <div className="hidden md:flex md:mr-4 ">

                </div>
            </div>
            <div
                className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${open ? "max-h-96" : "max-h-0"
                    }`}
            >
                <nav className="px-4 py-3">
                    <ul className="flex flex-col gap-3 ">
                        {links.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    className="block px-2 py-2 rounded hover:bg-gray-100"
                                    onClick={() => setOpen(false)}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header >
    );
}

export default header;