import {
    getReadTimeInMinutes,
    ReactComponent,
} from "lib/utils/getReadTimeForComponent"
// @ts-expect-error: I don't know if these kind of imports can be typed.
import pages from "../../../pages/blog/**/*.mdx"

interface PostMeta {
    category: string
    headImage: StaticImageData
    intro: string
    publishDate: string
    slug: string
    title: string
}

interface PostModule {
    default: ReactComponent
    meta: PostMeta
}

export type PostData = PostMeta & {
    readTime: number
}

export function getAllPosts(): PostData[] {
    return (pages as PostModule[]).map((page) => {
        const readTime = getReadTimeInMinutes(page.default)

        return { readTime, ...page.meta }
    })
}
