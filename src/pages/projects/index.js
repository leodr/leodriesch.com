import { ProjectCard } from "components/ProjectCard"
import { StandardLayout } from "layouts/StandardLayout"

export default function ProjectsPage() {
    return (
        <div className="bg-white sm:py-12">
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
    )
}

ProjectsPage.getLayout = (page) => (
    <StandardLayout
        pageTitle="Projects"
        headline="What I'm Working On"
        subHeadline={
            <>
                Whenever I publish a project, I try to round it all up with a
                short article on here.
            </>
        }
    >
        {page}
    </StandardLayout>
)
