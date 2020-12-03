import { getRecentPosts } from "api/posts/getRecentPosts"
import { BlogCard } from "components/BlogCard"
import { BlogGrid } from "components/BlogGrid"
import { ProjectCard } from "components/ProjectCard"
import { SectionHeader } from "components/SectionHeader"
import { StandardLayout } from "layouts/StandardLayout"
import Link from "next/link"

export default function HomePage({ recentPosts }) {
    return (
        <>
            <div className="bg-white pt-16">
                <div className="mb-4">
                    <SectionHeader
                        title="Projects"
                        headline="What I'm Working On"
                        subHeadline={
                            <>
                                Whenever I publish a project, I try to round it
                                all up with a short article on here.
                            </>
                        }
                    />
                </div>

                <ProjectCard
                    title="Tired of the same old Messenger?"
                    subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt assumenda dicta perspiciatis aperiam totam!"
                    href="/projects/bla"
                    color="purple"
                    imageSrc="https://cdn.dribbble.com/users/1615584/screenshots/14656091/media/1d74c2c5dc6a875f457912fa63378871.jpg"
                />

                <ProjectCard
                    title="Mobile banking reimagined"
                    subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt assumenda dicta perspiciatis aperiam totam!"
                    href="/projects/bla"
                    color="gray"
                    imageSrc="https://cdn.dribbble.com/users/1615584/screenshots/14607162/media/be69c5101757a823d147ea315e2830b4.jpg"
                />
            </div>

            <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
                <div className="absolute inset-0">
                    <div className="bg-white h-1/3 sm:h-2/3" />
                </div>
                <div className="relative max-w-7xl mx-auto">
                    <SectionHeader
                        title="Blog"
                        headline="What I'm Thinking About"
                        subHeadline={
                            <>
                                I write about JavaScript, my workflow and any
                                crazy idea I might have under the shower.
                            </>
                        }
                    />

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

HomePage.getLayout = (page) => (
    <StandardLayout
        headline={
            <>
                <div className="flex justify-center mb-6">
                    <img
                        src="https://avatars1.githubusercontent.com/u/39763575?s=460&u=01a1ae18c167cc4a6151db80befa333dd84975c5&v=4"
                        alt=""
                        className="w-24 h-24 rounded-full shadow-lg"
                    />
                </div>
                <span className="block xl:inline">Hi, I'm</span>
                <span className="block text-indigo-600 xl:inline">
                    {" Leo Driesch!"}
                </span>
            </>
        }
        subHeadline={
            <>
                I am a web developer and hobbyist designer. I currently work at{" "}
                <a
                    href="https://labs.tobit.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500"
                >
                    Tobit.Labs
                </a>{" "}
                on bringing the digital age to anything and anyone.
            </>
        }
        actions={
            <div className="sm:flex sm:justify-center">
                <div className="rounded-md shadow">
                    <Link href="/projects">
                        <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                            Explore projects
                        </a>
                    </Link>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <Link href="/blog">
                        <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                            Read blog
                        </a>
                    </Link>
                </div>
            </div>
        }
    >
        {page}
    </StandardLayout>
)

export async function getStaticProps() {
    const recentPosts = await getRecentPosts({ take: 3 })

    return {
        props: { recentPosts },
    }
}
