import { DefaultSeo } from "next-seo"
import type { AppProps } from "next/app"
import Head from "next/head"
import { ReactNode } from "react"
import "styles/blog.css"
import "styles/fonts.css"
import "styles/globals.css"
import "tailwindcss/tailwind.css"

export default function CustomApp({ Component, pageProps }: AppProps) {
    // @ts-expect-error: Next does not really provide a way to type static props onto pages.
    const getLayout = Component.getLayout || ((page: ReactNode) => page)

    return getLayout(
        <>
            <Head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/icons/apple-touch-icon.png"
                />
                <link rel="icon" type="image/png" href="/icons/favicon.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/icons/safari-pinned-tab.svg"
                    color="#5bbad5"
                />
                <meta name="apple-mobile-web-app-title" content="Leo Driesch" />
                <meta name="application-name" content="Leo Driesch" />
                <meta name="theme-color" content="#f9fafb" />
            </Head>
            <DefaultSeo
                openGraph={{
                    type: "website",
                    locale: "en_US",
                    url: "https://leodriesch.com/",
                    site_name: "Leo Driesch's Website",
                }}
                twitter={{
                    handle: "@leodriesch",
                    site: "@leodriesch",
                    cardType: "summary_large_image",
                }}
            />
            <Component {...pageProps}></Component>
        </>
    )
}
