import pages from "../../pages/projects/**/*.mdx"

export async function getAllProjects() {
    return pages.map((page) => page.meta)
}
