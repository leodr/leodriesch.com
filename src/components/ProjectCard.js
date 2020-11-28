import Link from "next/link"

export function ProjectCard({ title, subtitle, href, imageSrc, color }) {
    return (
        <>
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div
                    className={`bg-${color}-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4`}
                >
                    <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                        <div className="lg:self-center">
                            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                                {title}
                            </h2>
                            <p
                                className={`mt-4 text-lg leading-6 text-${color}-200`}
                            >
                                {subtitle}
                            </p>
                            <Link href={href}>
                                <a
                                    className={`mt-8 bg-white border border-transparent rounded-md shadow pl-6 pr-4 py-3 inline-flex items-center text-base font-medium text-${color}-600 hover:bg-${color}-50`}
                                >
                                    Read more{" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5 ml-3"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
                        <img
                            className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
                            src={imageSrc}
                            alt="App screenshot"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
