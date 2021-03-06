import { BlogCard } from "components/BlogCard"
import { BlogGrid } from "components/BlogGrid"
import { BlogSearchBox } from "components/BlogSearchBox"
import { StandardLayout } from "layouts/StandardLayout"
import { PostData } from "lib/data/posts/getAllPosts"
import { getRecentPosts } from "lib/data/posts/getRecentPosts"
import type { GetStaticProps } from "next"
import { ReactNode } from "react"

interface Props {
    recentPosts: PostData[]
}

export default function BlogPage({ recentPosts }: Props) {
    return (
        <>
            <div className="relative bg-gray-50 pb-20 px-4 sm:px-6 lg:pt-12 lg:pb-28 lg:px-8">
                <div className="absolute inset-0">
                    <div className="bg-white h-1/3 sm:h-2/3" />
                </div>
                <div className="relative max-w-7xl mx-auto">
                    <BlogGrid>
                        {recentPosts.map((post) => (
                            <BlogCard
                                key={post.slug}
                                category={post.category}
                                title={post.title}
                                intro={post.intro}
                                readTimeInMinutes={post.readTime}
                                publishingDate={new Date(post.publishDate)}
                                imageSrc={post.headImage}
                                href={`/blog/${post.slug}`}
                            />
                        ))}
                    </BlogGrid>
                </div>
            </div>
        </>
    )
}

BlogPage.getLayout = (page: ReactNode) => (
    <StandardLayout
        pageTitle="Blog"
        headline="What I'm Thinking About"
        subHeadline={
            <>
                I write about JavaScript, my workflow and any crazy idea I might
                get while showering.
            </>
        }
        actions={
            <div className="flex justify-center mt-8 w-full">
                <BlogSearchBox />
            </div>
        }
    >
        {page}
    </StandardLayout>
)

export const getStaticProps: GetStaticProps<Props> = async () => {
    const recentPosts = getRecentPosts({ take: Infinity })

    return {
        props: { recentPosts },
    }
}
