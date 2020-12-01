import pages from "../../pages/blog/**/*.mdx"

export async function getAllPostsMeta() {
    return pages.map((page) => page.meta)
}
