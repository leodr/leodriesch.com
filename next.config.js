/**
 * MDX configuration inspired by Tailwind blog, see https://git.io/JslDe
 */

const createMdxPlugin = require("@next/mdx")
const rehypePrism = require("@mapbox/rehype-prism")
const withImages = require("next-images")
const tokenColorizer = require("./token-colorizer")

const withMDX = createMdxPlugin({
    options: {
        remarkPlugins: [],
        rehypePlugins: [rehypePrism, tokenColorizer],
    },
})

module.exports = withImages(
    withMDX({
        pageExtensions: ["ts", "tsx", "mdx"],
        future: {
            webpack5: true,
            strictPostcssConfiguration: true,
        },
        images: {
            domains: ["avatars1.githubusercontent.com"],
        },
        reactStrictMode: true,
        webpack(config) {
            config.module.rules.unshift({
                test: /\.tsx?$/,
                loader: require.resolve("./glob-loader"),
            })

            return config
        },
    })
)
