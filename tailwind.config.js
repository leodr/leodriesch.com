const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

module.exports = {
    purge: {
        content: ["./src/**/*.{js,mdx}"],
        options: {
            safelist: [/^(bg|text)-[\w-]*-[\d]{2,3}$/],
        },
    },
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter var", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                rose: colors.rose,
                orange: colors.orange,
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
        require("@tailwindcss/aspect-ratio"),
    ],
}
