import { DefaultSeo } from "next-seo"
import Head from "next/head"
import "tailwindcss/tailwind.css"
import "../styles/blog.css"
import "../styles/globals.css"

export default function CustomApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page)

    return getLayout(
        <>
            <Head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link rel="icon" type="image/png" href="/favicon.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg"
                    color="#5bbad5"
                />
                <meta name="apple-mobile-web-app-title" content="Leo Driesch" />
                <meta name="application-name" content="Leo Driesch" />
                <meta name="msapplication-TileColor" content="#f9fafb" />
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
