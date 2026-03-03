import { useState } from "react";
import { useDarkMode } from "./useDarkMode";

function Header() {
    const links = [
        { label: "About", href: "#about" },
        { label: "Skills", href: "#skills" },
        { label: "Eduction", href: "#education" },
        { label: "Projects", href: "#projects" },
        { label: "Contact", href: "#contact" },
    ];
    const name = "Yosef Khier";
    const [open, setOpen] = useState(false);
    const [dark, toggleDark] = useDarkMode();

    return (
        <header className="px-4 py-3 shadow-sm border-b border-gray-100 dark:border-gray-800 sticky z-50 top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transition-colors duration-300">
            <div className="mx-auto max-w-5xl flex flex-row items-center justify-between">

                {/* Left: name */}
                <span className="font-bold text-amber-950 dark:text-amber-200 tracking-tight">
                    {name}
                </span>

                {/* Center: desktop nav */}
                <ul className="hidden md:flex flex-row gap-7">
                    {links.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-150"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Right: dark mode toggle + mobile hamburger */}
                <div className="flex items-center gap-3">

                    {/* Dark mode icon button */}
                    <button
                        onClick={toggleDark}
                        aria-label="Toggle dark mode"
                        className={`w-9 h-9 rounded-full cursor-pointer flex items-center justify-center border transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${dark
                            ? "bg-gray-800 border-gray-600 text-amber-400 hover:bg-gray-700"
                            : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        {dark ? (
                            /* Sun icon — click to go light */
                            <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.166 17.834a.75.75 0 00-1.06 1.06l1.59 1.591a.75.75 0 101.061-1.06l-1.59-1.591zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.166 6.166a.75.75 0 000 1.06l1.59 1.59a.75.75 0 101.061-1.06l-1.59-1.59a.75.75 0 00-1.061 0z" />
                            </svg>
                        ) : (
                            /* Moon icon — click to go dark */
                            <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                            </svg>
                        )}
                    </button>

                    {/* Mobile hamburger */}
                    <button
                        type="button"
                        aria-label="Toggle menu"
                        className="md:hidden p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        ) : (
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown */}
            <div className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${open ? "max-h-96" : "max-h-0"}`}>
                <nav className="mx-auto max-w-5xl px-1 pt-3 pb-2 border-t border-gray-100 dark:border-gray-800 mt-3">
                    <ul className="flex flex-col gap-1">
                        {links.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-150"
                                    onClick={() => setOpen(false)}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
