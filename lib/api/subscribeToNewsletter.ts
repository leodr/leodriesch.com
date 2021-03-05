interface Options {
    email: string
    firstName: string
}

export async function subscribeToNewsletter({ email, firstName }: Options) {
    const response = await fetch(
        `https://api.convertkit.com/v3/forms/${process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID}/subscribe`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                api_key: process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY,
                email,
                first_name: firstName,
            }),
        }
    )

    if (!response.ok) {
        throw Error(
            `Subscribing to newsletter failed with status code ${response.status}.`
        )
    }
}
