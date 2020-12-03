const createMdxPlugin = require("@next/mdx")
const rehypePrism = require("@mapbox/rehype-prism")
const visit = require("unist-util-visit")

/**
 * MDX configuration heavily inspired from Tailwind blog, see
 * https://github.com/tailwindlabs/blog.tailwindcss.com/blob/53170d9efa6439bafc2e15dbf80dc72a5d2a4b4f/next.config.js
 */

const tokenClassNames = {
    tag: "text-red-300",
    "attr-name": "text-yellow-300",
    "attr-value": "text-green-300",
    deleted: "text-red-300",
    inserted: "text-green-300",
    punctuation: "text-white-300",
    keyword: "text-purple-300",
    string: "text-green-300",
    function: "text-blue-300",
    boolean: "text-red-300",
    comment: "text-gray-400 italic",
}

const withMDX = createMdxPlugin({
    options: {
        remarkPlugins: [],
        rehypePlugins: [
            rehypePrism,
            () => {
                return (tree) => {
                    visit(tree, "element", (node) => {
                        let [token, type] = node.properties.className || []
                        if (token === "token") {
                            node.properties.className = [tokenClassNames[type]]
                        }
                    })
                }
            },
        ],
    },
})

module.exports = withMDX({
    pageExtensions: ["js", "jsx", "mdx"],
    webpack(config) {
        config.module.rules.unshift({
            test: /.jsx?$/,
            loader: require.resolve("./glob-loader"),
        })

        config.module.rules.push({
            test: /\.(svg|png|jpe?g|gif|mp4)$/i,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        publicPath: "/_next",
                        name: "static/media/[name].[hash:12].[ext]",
                    },
                },
            ],
        })

        return config
    },
})
