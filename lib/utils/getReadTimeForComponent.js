import cheerio from "cheerio"
import ReactDOMServer from "react-dom/server"

const WORDS_PER_MINUTE = 200

export function getReadTimeForComponent(Component) {
    const html = ReactDOMServer.renderToStaticMarkup(<Component />)

    const $ = cheerio.load(html)

    $("code").remove()
    const text = $.text()

    const words = text.split(/\s/g).length

    const minutes = Math.ceil(words / WORDS_PER_MINUTE)
    return minutes
}
