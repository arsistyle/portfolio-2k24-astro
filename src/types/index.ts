export type Langs = 'en' | 'es';

export type BreadcrumbTypes = 'link' | 'separator' | 'current';
export type BreadcrumbsItem = {
  name?: string;
  type: BreadcrumbTypes;
  url?: string;
};

export type Project = {
  name: string;
  title: string
  description: string;
  image: string;
  url: string;
  category: string;
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
  name?: string 
};