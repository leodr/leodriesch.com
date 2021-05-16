import { ChevronRightIcon } from "@heroicons/react/solid"
import { ProjectColor } from "lib/data/projects/getAllProjects"
import Image from "next/image"
import Link from "next/link"

interface Props {
    title: string
    subtitle: string
    href: string
    imageSrc: string
    color: ProjectColor
}

export function ProjectCard({ title, subtitle, href, imageSrc, color }: Props) {
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
                                    <ChevronRightIcon className="w-5 h-5 ml-3" />
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
                        <Image
                            layout="fill"
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
