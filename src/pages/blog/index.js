import { BlogCard } from "components/BlogCard"
import { BlogGrid } from "components/BlogGrid"
import { BlogSearchBox } from "components/BlogSearchBox"
import { StandardLayout } from "layouts/StandardLayout"

export default function BlogPage() {
    return (
        <>
            <div className="relative bg-gray-50 pb-20 px-4 sm:px-6 lg:pt-12 lg:pb-28 lg:px-8">
                <div className="absolute inset-0">
                    <div className="bg-white h-1/3 sm:h-2/3" />
                </div>
                <div className="relative max-w-7xl mx-auto">
                    <BlogGrid>
                        <BlogCard
                            category="Article"
                            title="Boost your conversion rate"
                            intro={
                                <>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Architecto accusantium
                                    praesentium eius, ut atque fuga culpa,
                                    similique sequi cum eos quis dolorum.
                                </>
                            }
                            readTimeInMinutes={6}
                            publishingDate={new Date(2020, 5, 5)}
                            imageSrc="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"
                        />
                        <BlogCard
                            category="Video"
                            title="How to use search engine optimization to drive sales"
                            intro={
                                <>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Velit facilis asperiores
                                    porro quaerat doloribus, eveniet dolore.
                                    Adipisci tempora aut inventore optio animi.,
                                    tempore temporibus quo laudantium.
                                </>
                            }
                            readTimeInMinutes={4}
                            publishingDate={new Date(2020, 2, 10)}
                            imageSrc="https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"
                        />
                        <BlogCard
                            category="Case Study"
                            title="Improve your customer experience"
                            intro={
                                <>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Sint harum rerum
                                    voluptatem quo recusandae magni placeat
                                    saepe molestiae, sed excepturi cumque
                                    corporis perferendis hic.
                                </>
                            }
                            readTimeInMinutes={11}
                            publishingDate={new Date(2020, 1, 12)}
                            imageSrc="https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"
                        />
                    </BlogGrid>
                </div>
            </div>
        </>
    )
}

BlogPage.getLayout = (page) => (
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
