// @ts-expect-error: I don't know if these kind of imports can be typed.
import pages from "../../../pages/projects/**/*.mdx"

export type ProjectColor =
    | "gray"
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "blue"
    | "indigo"
    | "purple"
    | "pink"
    | "rose"

export interface ProjectMeta {
    color: ProjectColor
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
