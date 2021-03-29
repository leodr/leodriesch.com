import { Transition } from "@headlessui/react"
import { XIcon } from "@heroicons/react/solid"
import clsx from "clsx"
import { Spinner } from "components/Spinner"
import { AnimatePresence, motion } from "framer-motion"
import { StandardLayout } from "layouts/StandardLayout"
import { FormEvent, ReactNode, useEffect, useState } from "react"
import tinykeys from "tinykeys"

interface FormElements extends HTMLFormControlsCollection {
    firstName: HTMLInputElement
    emailAddress: HTMLInputElement
    message: HTMLInputElement
}
interface ContactPageFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

export default function ContactPage() {
    const [submissionState, setSubmissionState] = useState("idle")

    const isDialogOpen = submissionState === "success"

    useEffect(() => {
        if (isDialogOpen) {
            const unsubscribe = tinykeys(window, {
                Escape() {
                    setSubmissionState("idle")
                },
            })
            return () => {
                unsubscribe()
            }
        }
    }, [isDialogOpen])

    async function handleSubmit(event: FormEvent<ContactPageFormElement>) {
        event.preventDefault()

        const formElements = (event.target as ContactPageFormElement).elements
        const firstName = formElements.firstName.value
        const email = formElements.emailAddress.value
        const message = formElements.message.value

        setSubmissionState("pending")

        try {
            const response = await fetch("/api/sendMail", {
                method: "POST",
                body: JSON.stringify({ firstName, email, message }),
                headers: { "Content-Type": "application/json" },
            })

            if (response.ok) {
                setSubmissionState("success")
            } else {
                throw Error("Response not ok.")
            }
        } catch {
            setSubmissionState("error")
        }
    }

    /**
     * Reset submission state after 3 seconds.
     */
    useEffect(() => {
        if (submissionState === "error") {
            const timeout = setTimeout(() => setSubmissionState("idle"), 3000)

            return () => {
                clearTimeout(timeout)
            }
        }
    }, [submissionState])

    const buttonClasses = clsx(
        "relative w-full border border-transparent rounded-md shadow-sm h-12 px-6 inline-flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2",
        "transition",
        ["idle", "pending", "success"].includes(submissionState) &&
            "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
        submissionState === "error" &&
            "bg-red-500 hover:bg-red-600 focus:ring-red-500"
    )

    return (
        <>
            <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
                <div className="relative max-w-xl mx-auto">
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                    >
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                First name
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    autoComplete="given-name"
                                    className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                    placeholder="e.g. John"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="emailAddress"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="email"
                                    autoComplete="email"
                                    className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                    placeholder="e.g. john-doe@example.com"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Message
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                    defaultValue={""}
                                    placeholder="I wanted to reach out to you about..."
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <button type="submit" className={buttonClasses}>
                                <AnimatePresence initial={false}>
                                    {["idle", "success"].includes(
                                        submissionState
                                    ) && (
                                        <motion.div
                                            key="subscribe-text"
                                            className="absolute inset-0 flex items-center justify-center"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ stiffness: 200 }}
                                        >
                                            Let's talk!
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
                                    {submissionState === "error" && (
                                        <motion.div
                                            key="success-check"
                                            className="absolute inset-0 flex items-center justify-center"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            transition={{ stiffness: 200 }}
                                        >
                                            <XIcon className="h-6 w-6" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="fixed z-10 inset-0 overflow-y-auto pointer-events-none">
                <Transition
                    show={isDialogOpen}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 pointer-events-auto"
                >
                    <div
                        className="fixed inset-0 transition-opacity"
                        aria-hidden="true"
                    >
                        <div
                            className="absolute inset-0 bg-gray-500 opacity-75"
                            onClick={(event) => {
                                if (event.target === event.currentTarget) {
                                    setSubmissionState("idle")
                                }
                            }}
                        />
                    </div>
                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        ​
                    </span>

                    <Transition
                        show={isDialogOpen}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                    >
                        <div>
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                <motion.svg
                                    initial={{
                                        opacity: 0,
                                        rotate: -90,
                                        scale: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        rotate: 0,
                                        scale: 1,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 180,
                                        damping: 12,
                                    }}
                                    className="h-6 w-6 text-green-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </motion.svg>
                            </div>
                            <div className="mt-3 text-center sm:mt-5">
                                <h3
                                    className="text-lg leading-6 font-medium text-gray-900"
                                    id="modal-headline"
                                >
                                    Request sent
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Thanks for contacting me! I'll get back
                                        to you in the next few days.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6">
                            <button
                                type="button"
                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                onClick={() => setSubmissionState("idle")}
                            >
                                Close
                            </button>
                        </div>
                    </Transition>
                </Transition>
            </div>
        </>
    )
}

ContactPage.getLayout = (page: ReactNode) => (
    <StandardLayout
        pageTitle="Contact"
        headline="Get in Touch With Me"
        subHeadline={
            <>
                Send me a message about any offer or question you might have. If
                you got something short, mention me on Twitter or slide into my
                DMs.
            </>
        }
    >
        {page}
    </StandardLayout>
)
