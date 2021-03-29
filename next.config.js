const createMdxPlugin = require("@next/mdx")
const rehypePrism = require("@mapbox/rehype-prism")
const withImages = require("next-images")
const tokenColorizer = require("./token-colorizer")

/**
 * MDX configuration inspired by Tailwind blog, see
 * https://github.com/tailwindlabs/blog.tailwindcss.com/blob/53170d9efa6439bafc2e15dbf80dc72a5d2a4b4f/next.config.js
 */

const withMDX = createMdxPlugin({
    options: {
        remarkPlugins: [],
        rehypePlugins: [rehypePrism, tokenColorizer],
    },
})

module.exports = withImages(
    withMDX({
        pageExtensions: ["tsx", "mdx"],
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
