const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

module.exports = {
    mode: "jit",
    purge: [
        "./components/**/*.{js,jsx,ts,tsx,vue}",
        "./layouts/**/*.{js,jsx,ts,tsx,vue}",
        "./lib/**/*.{js,jsx,ts,tsx,vue}",
        "./pages/**/*.{js,jsx,ts,tsx,vue}",
        "./styles/**/*.{js,jsx,ts,tsx,vue}",
        "./tailwind-safelist",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter var", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                rose: colors.rose,
                orange: colors.orange,
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        code: {
                            backgroundColor: theme("colors.gray.100"),
                            borderRadius: theme("borderRadius.md"),
                            padding: `${theme("padding.1")} ${theme(
                                "padding.px"
                            )}`,
                            color: theme("colors.pink.600"),
                        },
                    },
                },
            }),
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
