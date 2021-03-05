// @ts-expect-error: I don't know if these kind of imports can be typed.
import pages from "../../../pages/projects/**/*.mdx"

export interface ProjectMeta {
    color: string
    headImage: string
    intro: string
    publishDate: string
    slug: string
    title: string
}

interface ProjectModule {
    default: React.Component
    meta: ProjectMeta
}

export function getAllProjects(): ProjectMeta[] {
    return (pages as ProjectModule[]).map((page) => page.meta)
}
