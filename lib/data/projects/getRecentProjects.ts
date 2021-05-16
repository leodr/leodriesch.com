import { getAllProjects, ProjectMeta } from "./getAllProjects"

export function getRecentProjects({ take = 2 }): ProjectMeta[] {
    const allProjects = getAllProjects()

    const sortedByDate = allProjects.sort((a, b) => {
        const aDate = new Date(a.publishDate)
        const bDate = new Date(b.publishDate)

        return bDate.getTime() - aDate.getTime()
    })

    return sortedByDate.slice(0, take)
}
