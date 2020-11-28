import { BlogCard } from "components/BlogCard"
import { BlogGrid } from "components/BlogGrid"
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
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua.
            </>
        }
        actions={
            <div className="flex justify-center mt-8 w-full">
                <div className="relative" style={{ width: 480 }}>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className="block w-full py-3 pr-24 text-base rounded-md placeholder-gray-500 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                        placeholder="Search through articles with Google"
                    />
                    <button
                        type="button"
                        className="absolute top-1/2 transform -translate-y-1/2 right-1 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Search
                    </button>
                </div>
            </div>
        }
    >
        {page}
    </StandardLayout>
)
