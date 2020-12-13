import { getRecentProjects } from "api/projects/getRecentProjects"
import { ProjectCard } from "components/ProjectCard"
import { StandardLayout } from "layouts/StandardLayout"

export default function ProjectsPage({ recentProjects }) {
    return (
        <div className="bg-white sm:py-12">
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

export async function getStaticProps() {
    const recentProjects = await getRecentProjects({ take: 2 })

    return {
        props: { recentProjects },
    }
}
