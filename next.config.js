/**
 * MDX configuration inspired by Tailwind blog, see https://git.io/JslDe
 */

const createMdxPlugin = require("@next/mdx")
const rehypePrism = require("@mapbox/rehype-prism")
const tokenColorizer = require("./token-colorizer")

const withMDX = createMdxPlugin({
    options: {
        remarkPlugins: [],
        rehypePlugins: [rehypePrism, tokenColorizer],
    },
})

module.exports = withMDX({
    pageExtensions: ["ts", "tsx", "mdx"],
    future: {
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
