export type Langs = "en" | "es";

export type BreadcrumbTypes = "link" | "separator" | "current";
export type BreadcrumbsItem = {
  name?: string;
  type: BreadcrumbTypes;
  url?: string;
};

export type Project = {
  name: string;
  lang: Langs;
  title: string;
  description: string;
  images: {
    small: string;
    medium: string;
    large: string;
  };
  category: string;
  content?: any
};

export type ProjectWithLang = {
  [key in Langs]: Project;
};

/*

  PageLayout

*/

export type NavItemProps = {
  label: string;
  name: string;
  path: string;
};

export type NavItemsProps = {
  label: string;
  items: NavItemProps[];
};

export type NavProps = {
  items: NavItemsProps[];
};

export type PageLayoutProps = {
  title: string;
  breadcrumbs: any[];
  nav?: NavProps;
  name?: string;
};
