import { Footer } from "components/Footer"
import { Logo } from "components/Logo"
import { MobileMenu } from "components/MobileMenu"
import { NavigationBar } from "components/NavigationBar"
import Link from "next/link"
import { ReactNode, useState } from "react"

interface Props {
    children: ReactNode
    headline: ReactNode
    subHeadline?: ReactNode
    actions?: ReactNode
    pageTitle?: string
}

export function StandardLayout({
    children,
    headline,
    subHeadline,
    actions,
    pageTitle,
}: Props) {
    const [showMenu, setShowMenu] = useState(false)

    function handleShowMenu() {
        setShowMenu(true)
    }

    function handleCloseMenu() {
        setShowMenu(false)
    }

    return (
        <>
            <div className="relative bg-gray-50 overflow-hidden">
                <div
                    className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full"
                    aria-hidden="true"
                >
                    <NavigationBar />
                </div>
                <div className="relative pt-4 pb-12 sm:pb-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <nav
                            className="relative flex items-center justify-between sm:h-10 md:justify-center"
                            aria-label="Global"
                        >
                            <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                                <div className="flex items-center justify-between w-full md:w-auto">
                                    <Link href="/">
                                        <a>
                                            <span className="sr-only">
                                                Workflow
                                            </span>
                                            <Logo className="text-indigo-600 w-7 md:w-8" />
                                        </a>
                                    </Link>
                                    <div className="-mr-2 flex items-center md:hidden">
                                        <button
                                            type="button"
                                            className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                            id="main-menu"
                                            aria-haspopup="true"
                                            onClick={handleShowMenu}
                                        >
                                            <span className="sr-only">
                                                Open main menu
                                            </span>
                                            <svg
                                                className="h-6 w-6"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 6h16M4 12h16M4 18h16"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:flex md:space-x-10">
                                <Link href="/projects">
                                    <a className="font-medium text-gray-500 hover:text-gray-900">
                                        Projects
                                    </a>
                                </Link>
                                <Link href="/blog">
                                    <a className="font-medium text-gray-500 hover:text-gray-900">
                                        Blog
                                    </a>
                                </Link>
                                <Link href="/contact">
                                    <a className="font-medium text-gray-500 hover:text-gray-900">
                                        Contact
                                    </a>
                                </Link>
                            </div>
                            <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
                                <span className="inline-flex rounded-md shadow">
                                    <Link href="/contact">
                                        <a className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50">
                                            Contact
                                        </a>
                                    </Link>
                                </span>
                            </div>
                        </nav>
                    </div>

                    <MobileMenu show={showMenu} onHide={handleCloseMenu} />

                    <main className="mt-8 mx-auto max-w-7xl px-4 sm:mt-16">
                        <div className="text-center">
                            {pageTitle && (
                                <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase mb-1">
                                    {pageTitle}
                                </h2>
                            )}
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                {headline}
                            </h1>
                            {subHeadline && (
                                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                    {subHeadline}
                                </p>
                            )}
                            {actions && (
                                <div className="mt-5 max-w-md mx-auto md:mt-8">
                                    {actions}
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>

            {children}

            <Footer />
        </>
    )
}
