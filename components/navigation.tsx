import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';

export default function Navigation(): JSX.Element {
    const [isMounted, setIsMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();
    useEffect(() => setIsMounted(true), []);

    const switchTheme = () => isMounted && setTheme(resolvedTheme == 'light' ? 'dark' : 'light');

    if (!isMounted) return null;
    return (
        <header className="dark:bg-gray-700 border-b dark:border-gray-600 dark:text-gray-100 flex-none relative z-50 text-sm leading-6 font-medium text-gray-800">
            <nav className="flex items-center justify-between py-5 px-3 max-w-4xl mx-auto">
                <Link href="/">
                    <a className="">
                        <span className="sr-only">Vermeer Github Users Search</span>
                        Vermeer Github Users Search
                    </a>
                </Link>
                <button
                    type="button"
                    className="rounded-md border border-transparent focus:bg-gray-100 focus:outline-none dark:focus:bg-black dark:focus:border-gray-800 text-gray-400"
                    onClick={switchTheme}
                >
                    <span className="sr-only">
                        <span className="dark:hidden">Switch to dark theme</span>
                        <span className="hidden dark:inline">Switch to light theme</span>
                    </span>
                    {isMounted && resolvedTheme == 'dark' ? (
                        <SunIcon className={`w-9 h-9`} />
                    ) : (
                        <MoonIcon className={`w-9 h-9`} />
                    )}
                </button>
            </nav>
        </header>
    );
}
