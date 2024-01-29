import type { Langs, ProjectWithLang } from '../types';

export const filterProjects = async ({
  projects = [],
  lang,
  limit = null,
}: {
  projects: ProjectWithLang[];
  lang: Langs;
  limit?: number | null;
}) => {

  console.log(projects, lang, limit)

  const projectsByLang = projects.map((project) => project[lang]) || [];
  const projectList = limit ? projectsByLang.slice(0, limit) : projectsByLang;
  return projectList;
};
