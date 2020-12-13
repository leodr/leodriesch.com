import { StandardLayout } from "./StandardLayout"

export function BlogLayout({ children, meta }) {
    return (
        <StandardLayout headline={meta.title}>
            <div className="bg-white">
                <article className="prose prose-indigo sm:prose-lg mx-auto py-12 px-3">
                    {children}
                </article>
            </div>
        </StandardLayout>
    )
}
