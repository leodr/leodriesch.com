import { getAllPosts } from "./getAllPosts"

export async function getRecentPosts({ take = 3 }) {
    const allPosts = await getAllPosts()

    const sortedByDate = allPosts.sort((a, b) => b.publishDate - a.publishDate)

    return sortedByDate.slice(0, take)
}
