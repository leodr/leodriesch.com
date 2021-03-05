import { ProjectCard } from "components/ProjectCard"
import { StandardLayout } from "layouts/StandardLayout"
import { ProjectMeta } from "lib/data/projects/getAllProjects"
import { getRecentProjects } from "lib/data/projects/getRecentProjects"
import type { GetStaticProps } from "next"
import { ReactNode } from "react"

interface Props {
    recentProjects: ProjectMeta[]
}

export default function ProjectsPage({ recentProjects }: Props) {
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

ProjectsPage.getLayout = (page: ReactNode) => (
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

export const getStaticProps: GetStaticProps<Props> = async () => {
    const recentProjects = getRecentProjects({ take: Infinity })

    return {
        props: { recentProjects },
    }
}
