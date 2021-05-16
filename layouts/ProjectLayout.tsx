import { format } from "date-fns"
import { ProjectData } from "lib/data/projects/getAllProjects"
import { NextSeo } from "next-seo"
import { ReactNode } from "react"
import { StandardLayout } from "./StandardLayout"

interface Props {
    children: ReactNode
    meta: ProjectData
}

export function ProjectLayout({ children, meta }: Props) {
    return (
        <StandardLayout
            headline={
                <>
                    <span className="inline-block text-xl mb-2 tracking-normal font-medium text-gray-400">
                        {format(
                            new Date(meta.publishDate),
                            "EEEE, MMMM d, yyyy"
                        )}
                    </span>
                    <br />
                    <span className="max-w-4xl inline-block">{meta.title}</span>
                </>
            }
        >
            <NextSeo
                title={`${meta.title} - Leo Driesch`}
                description={meta.intro}
                openGraph={{
                    url: `https://leodriesch.com/blog/${meta.slug}`,
                    title: `${meta.title} - Leo Driesch`,
                    description: meta.intro,
                    site_name: "Leo Driesch's Blog",
                    images: [
                        {
                            url:
                                (process.env.NODE_ENV === "development"
                                    ? "http://localhost:3000"
                                    : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`) +
                                `/api/og-image/projects/${meta.slug}`,
                            alt: meta.title,
                            width: 1200,
                            height: 600,
                        },
                    ],
                }}
                twitter={{
                    handle: "@leodriesch",
                    site: "@leodriesch",
                    cardType: "summary_large_image",
                }}
            />
            <div className="bg-white">
                <article className="prose prose-indigo sm:prose-lg mx-auto py-12 sm:py-24 px-3">
                    {children}
                </article>
            </div>
        </StandardLayout>
    )
}
