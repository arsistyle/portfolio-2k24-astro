import type { Langs, ProjectFromImport, ProjectMDXContent, ProjectMDXGlobResult } from "@/types"

export const getProjects = ({ lang }: { lang: Langs }) => {
	const projectFiles = import.meta.glob<ProjectMDXContent>("@/content/projects/**/*.mdx", {
		eager: true,
	}) as ProjectMDXGlobResult

	const projectList: ProjectFromImport[] = Object.values(projectFiles)
		.filter(
			(project): project is ProjectMDXContent & { frontmatter: { lang: Langs } } =>
				project.frontmatter.lang === lang
		)
		.map(({ frontmatter, Content }) => ({
			...frontmatter,
			Content,
		}))

	return projectList
}
