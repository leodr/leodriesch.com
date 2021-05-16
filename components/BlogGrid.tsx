import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export function BlogGrid({ children }: Props) {
    return (
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {children}
        </div>
    )
}
