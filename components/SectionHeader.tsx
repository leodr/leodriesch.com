interface Props {
    title: string
    headline: string
    subHeadline: string
}

export function SectionHeader({ title, headline, subHeadline }: Props) {
    return (
        <div className="text-center">
            <h3 className="text-base font-semibold text-indigo-600 tracking-wide uppercase mb-1">
                {title}
            </h3>
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
                {headline}
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                {subHeadline}
            </p>
        </div>
    )
}
