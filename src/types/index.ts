export type Langs = 'en' | 'es';

export type Project = {
  name: string;
  description: string;
  image: string;
  url: string;
  category: string;
};

export type ProjectWithLang = {
  [key in Langs]: Project;
}
