import cheerio from "cheerio"
import React from "react"
import ReactDOMServer from "react-dom/server"

export type ReactComponent = Parameters<typeof React.createElement>[0]

const WORDS_PER_MINUTE = 200

export function getReadTimeInMinutes(Component: ReactComponent): number {
    const html = ReactDOMServer.renderToStaticMarkup(
        React.createElement(Component)
    )

    const $ = cheerio.load(html)

    $("code").remove()
    const text = $.text()

    const words = text.split(/\s/g).length

    const minutes = Math.ceil(words / WORDS_PER_MINUTE)
    return minutes
}
