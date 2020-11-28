import "../styles/globals.css"

export default function CustomApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page)

    return getLayout(<Component {...pageProps}></Component>)
}
