import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"

interface Props {
    category: string
    title: string
    intro: string
    readTimeInMinutes: number
    publishingDate: Date
    imageSrc: string
    href: string
}

export function BlogCard({
    category,
    title,
    intro,
    readTimeInMinutes,
    publishingDate,
    imageSrc,
    href,
}: Props) {
    return (
        <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="flex-shrink-0 relative">
                <Image
                    src={imageSrc}
                    width={500}
                    height={250}
                    objectFit="cover"
                    alt=""
                />
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600">
                        {category}
                    </p>
                    <Link href={href}>
                        <a className="block mt-2">
                            <p className="text-xl font-semibold text-gray-900">
                                {title}
                            </p>
                            <p className="mt-3 text-base text-gray-500">
                                {intro}
                            </p>
                        </a>
                    </Link>
                </div>
                <div className="mt-6 flex items-center">
                    <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime={format(publishingDate, "yyyy-MM-dd")}>
                            {format(publishingDate, "MMM d, yyyy")}
                        </time>
                        <span aria-hidden="true">·</span>
                        <span>{readTimeInMinutes} min read</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
