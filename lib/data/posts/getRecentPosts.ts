import { getAllPosts, PostData } from "./getAllPosts"

export function getRecentPosts({ take = 3 }): PostData[] {
    const allPosts = getAllPosts()

    const sortedByDate = allPosts.sort((a, b) => {
        const aDate = new Date(a.publishDate)
        const bDate = new Date(b.publishDate)

        return bDate.getTime() - aDate.getTime()
    })

    return sortedByDate.slice(0, take)
}
