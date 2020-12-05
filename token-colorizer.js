const visit = require("unist-util-visit")

const tokenClassNames = {
    arrow: "text-red-300",
    "attr-name": "text-purple-300",
    "attr-value": "text-blue-300",
    boolean: "text-red-300",
    comment: "text-gray-500",
    deleted: "text-red-300",
    dot: "text-red-300",
    function: "text-purple-300",
    inserted: "text-green-300",
    "interpolation-punctuation": "text-purple-300",
    keyword: "text-red-300",
    "known-class-name": "text-blue-300",
    method: "text-blue-300",
    number: "text-blue-300",
    operator: "text-red-300",
    parameter: "text-orange-300",
    "property-access": "text-gray-200",
    punctuation: "text-gray-200",
    "script-punctuation": "text-gray-200",
    script: "text-gray-200",
    string: "text-blue-300",
    tag: "text-green-300",
    "template-punctuation": "text-blue-300",
}

module.exports = function tokenColorizer() {
    return (tree) => {
        visit(tree, "element", (node) => {
            let [token, type] = node.properties.className || []

            if (token === "token") {
                const isDot =
                    type === "punctuation" &&
                    node.children.length === 1 &&
                    node.children[0].value === "."
                if (isDot) type = "dot"

                node.properties.className = [tokenClassNames[type]]
            }
        })
    }
}
