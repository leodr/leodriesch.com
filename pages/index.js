import { BlogCard } from "components/BlogCard"
import { BlogGrid } from "components/BlogGrid"
import { ProjectCard } from "components/ProjectCard"
import { SectionHeader } from "components/SectionHeader"
import { StandardLayout } from "layouts/StandardLayout"
import { getRecentPosts } from "lib/data/posts/getRecentPosts"
import { getRecentProjects } from "lib/data/projects/getRecentProjects"
import { NextSeo } from "next-seo"
import Image from "next/image"
import Link from "next/link"

export default function HomePage({ recentPosts, recentProjects }) {
    return (
        <>
            <NextSeo
                title="Leo Driesch"
                description="Leo Driesch is a web developer."
            />
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

                {recentProjects.map((project) => (
                    <ProjectCard
                        key={project.slug}
                        title={project.title}
                        subtitle={project.intro}
                        href={`/projects/${project.slug}`}
                        color={project.color}
                        imageSrc={project.headImage}
                    />
                ))}
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
                    <Image
                        width={100}
                        height={100}
                        loading="eager"
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
    const recentProjects = await getRecentProjects({ take: 2 })

    return {
        props: { recentPosts, recentProjects },
    }
}
