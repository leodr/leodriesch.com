import { getAllProjects } from "./getAllProjects"

export async function getRecentProjects({ take = 2 }) {
    const allProjects = await getAllProjects()

    const sortedByDate = allProjects.sort(
        (a, b) => b.publishDate - a.publishDate
    )

    return sortedByDate.slice(0, take)
}
