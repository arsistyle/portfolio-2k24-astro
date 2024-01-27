import type { Langs, ProjectWithLang } from '../types';

export const filterProjects = async ({
  projects = [],
  lang,
  limit = -1,
}: {
  projects: ProjectWithLang[];
  lang: Langs;
  limit?: number;
}) => {
  const projectsByLang = projects.map((project) => project[lang]) || [];
  const projectList = projectsByLang.slice(0, limit);
  return projectList;
};
