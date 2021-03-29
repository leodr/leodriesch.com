import { CheckIcon, XIcon } from "@heroicons/react/solid"
import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import { subscribeToNewsletter } from "lib/api/subscribeToNewsletter"
import { FormEvent, useEffect, useState } from "react"
import { Spinner } from "./Spinner"

interface FormElements extends HTMLFormControlsCollection {
    emailAddress: HTMLInputElement
}
interface NewsletterFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

export function NewsletterForm() {
    const [submissionState, setSubmissionState] = useState("idle")

    async function handleSubmit(event: FormEvent<NewsletterFormElement>) {
        event.preventDefault()

        const formElements = (event.target as NewsletterFormElement).elements
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
                                <CheckIcon className="h-6 w-6" />
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
                                <XIcon className="h-6 w-6" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </form>
    )
}
