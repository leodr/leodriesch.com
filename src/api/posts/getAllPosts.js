import { getReadTimeForComponent } from "utils/getReadTimeForComponent"
import pages from "../../pages/blog/**/*.mdx"

export async function getAllPosts() {
    return pages.map((page) => {
        const readTime = getReadTimeForComponent(page.default)

        return { readTime, ...page.meta }
    })
}
