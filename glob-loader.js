const glob = require("fast-glob")
const path = require("path")

const REPLACEMENT_REGEX = /.?import + ?((\w+) +from )?(['"])(.*?)\3/gm
const MODULE_IMPORT_REGEX = /import +(\w+) +from +(['"])(.*?)\2/gm

/**
 * Based on `import-glob`: https://github.com/terpiljenya/import-glob
 */
module.exports = function globImport(source) {
    this.cacheable()

    const resourceDir = path.dirname(this.resourcePath)

    function replacer(match, _, obj, quote, filename) {
        const modules = []
        let withModules = false

        /**
         * If the import filename does not have any globbing syntax, skip the
         * lookup.
         */
        if (!glob.isDynamicPattern(filename)) {
            return match
        }

        let result = glob
            .sync(filename, {
                cwd: resourceDir,
            })
            .flatMap((file, index) => {
                const fileName = quote + file + quote

                if (match.match(MODULE_IMPORT_REGEX)) {
                    const moduleName = obj + index

                    modules.push(moduleName)
                    withModules = true

                    return "import * as " + moduleName + " from " + fileName
                }
                return []
            })
            .join("; ")

        if (result && withModules) {
            result += "; let " + obj + " = [" + modules.join(", ") + "]"
        }

        return result
    }

    return source.replace(REPLACEMENT_REGEX, replacer)
}
