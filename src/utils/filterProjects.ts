import type { Langs, ProjectWithLang } from "../types";

export const filterProjects = async ({
  projects = [],
  lang,
  limit = null,
}: {
  projects: any;
  lang: Langs;
  limit?: number | null;
}) => {
  const projectsByLang = projects.map((project: any) => project[lang]) || [];
  const projectList = limit ? projectsByLang.slice(0, limit) : projectsByLang;
  return projectList;
};
