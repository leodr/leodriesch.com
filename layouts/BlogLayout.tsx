import { format } from "date-fns"
import { PostData } from "lib/data/posts/getAllPosts"
import { ReactNode } from "react"
import { StandardLayout } from "./StandardLayout"

interface Props {
    children: ReactNode
    meta: PostData
}

export function BlogLayout({ children, meta }: Props) {
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
            <div className="bg-white">
                <article className="prose prose-indigo sm:prose-lg mx-auto py-12 sm:py-24 px-3">
                    {children}
                </article>
            </div>
        </StandardLayout>
    )
}
