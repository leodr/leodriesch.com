import { subscribeToNewsletter } from "api/newsletter/subscribeToNewsletter"
import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Spinner } from "./Spinner"

export function NewsletterForm() {
    const [submissionState, setSubmissionState] = useState("idle")

    async function handleSubmit(event) {
        event.preventDefault()

        const formElements = event.target.elements
        const email = formElements.emailAddress.value

        setSubmissionState("pending")

        try {
            await subscribeToNewsletter({ email })
            setSubmissionState("success")
        } catch {
            setSubmissionState("error")
        }
    }

    /**
     * Reset submission state after 3 seconds.
     */
    useEffect(() => {
        if (submissionState === "success" || submissionState === "error") {
            const timeout = setTimeout(() => setSubmissionState("idle"), 3000)

            return () => {
                clearTimeout(timeout)
            }
        }
    }, [submissionState])

    const buttonClasses = clsx(
        "relative w-full sm:w-28 border border-transparent rounded-md h-11 px-4 flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800",
        "transition",
        (submissionState === "idle" || submissionState === "pending") &&
            "bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500",
        submissionState === "success" &&
            "bg-green-500 hover:bg-green-600 focus:ring-green-500",
        submissionState === "error" &&
            "bg-red-500 hover:bg-red-600 focus:ring-red-500"
    )

    return (
        <form onSubmit={handleSubmit} className="mt-4 sm:flex sm:max-w-md">
            <label htmlFor="emailAddress" className="sr-only">
                Email address
            </label>
            <input
                type="email"
                name="emailAddress"
                id="emailAddress"
                autoComplete="email"
                required
                className="appearance-none min-w-0 w-full bg-white border border-transparent rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400"
                placeholder="Enter your email"
            />

            <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button type="submit" className={buttonClasses}>
                    <AnimatePresence initial={false}>
                        {submissionState === "idle" && (
                            <motion.div
                                key="subscribe-text"
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ stiffness: 200 }}
                            >
                                Subscribe
                            </motion.div>
                        )}
                        {submissionState === "pending" && (
                            <motion.div
                                key="spinner"
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ rotate: 0, scale: 0 }}
                                animate={{ rotate: 0, scale: 1 }}
                                exit={{ rotate: 90, scale: 0 }}
                                transition={{ stiffness: 200 }}
                            >
                                <Spinner className="w-6 h-6" />
                            </motion.div>
                        )}
                        {submissionState === "success" && (
                            <motion.div
                                key="success-check"
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ rotate: -90, scale: 0 }}
                                animate={{ rotate: 0, scale: 1 }}
                                exit={{ rotate: 0, scale: 0 }}
                                transition={{ stiffness: 200 }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </motion.div>
                        )}
                        {submissionState === "error" && (
                            <motion.div
                                key="success-check"
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ rotate: -90, scale: 0 }}
                                animate={{ rotate: 0, scale: 1 }}
                                exit={{ rotate: 0, scale: 0 }}
                                transition={{ stiffness: 200 }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </form>
    )
}
