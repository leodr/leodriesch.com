import { Transition } from "@headlessui/react"
import Link from "next/link"
import { Logo } from "./Logo"

export function MobileMenu({ show, onHide }) {
    return (
        <Transition
            show={show}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
            <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                    <div>
                        <Link href="/">
                            <a onClick={onHide}>
                                <Logo className="text-indigo-600 w-7" />
                            </a>
                        </Link>
                    </div>
                    <div className="-mr-2">
                        <button
                            type="button"
                            className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            onClick={onHide}
                        >
                            <span className="sr-only">Close menu</span>

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
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="main-menu"
                >
                    <div className="px-2 pt-2 pb-3" role="none">
                        <Link href="/projects">
                            <a
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                role="menuitem"
                                onClick={onHide}
                            >
                                Projects
                            </a>
                        </Link>
                        <Link href="/blog">
                            <a
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                role="menuitem"
                                onClick={onHide}
                            >
                                Blog
                            </a>
                        </Link>
                        <Link href="contact">
                            <a
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                role="menuitem"
                                onClick={onHide}
                            >
                                Contact
                            </a>
                        </Link>
                    </div>
                    <div role="none">
                        <Link href="/contact">
                            <a
                                className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
                                role="menuitem"
                                onClick={onHide}
                            >
                                Contact
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </Transition>
    )
}
