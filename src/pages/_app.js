import { DefaultSeo } from "next-seo"
import "tailwindcss/tailwind.css"
import "../styles/blog.css"
import "../styles/globals.css"

export default function CustomApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page)

    return getLayout(
        <>
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
