import clsx from "clsx"

export default function Home() {
    return (
        <h1
            className={clsx(
                "grid place-items-center h-screen",
                "text-6xl font-extrabold text-transparent tracking-tight",
                "bg-clip-text bg-gradient-to-tr from-blue-400 to-green-400"
            )}
        >
            Hello World!
        </h1>
    )
}
