export interface NavbarData {
  logo?: { source: string; height?: number; width?: number };
  sections: { title: string; href: string; type?: 'link' }[];
}
export interface HomeData { name: string; roles: string[]; }
export interface SocialData { social: { network: string; href: string }[]; }
export interface AboutData {
  about: string;
  imageSource?: string;
  headline?: string;
  location?: string;
  status?: string;
  stats?: { value: string; label: string }[];
  highlights?: { icon: string; title: string; text: string }[];
  focus?: string[];
}
export interface SkillsData {
  intro: string;
  skills: { title: string; items: Skill[] }[];
}
export interface Skill {
  title: string;
  icon: string;
  mono?: boolean;
  details?: { summary: string; projects: { name: string; text: string }[] };
}
export interface EducationData {
  education: {
    title: string;
    cardTitle: string;
    cardSubtitle: string;
    cardDetailedText: string;
    icon?: { src: string; alt?: string };
  }[];
}
export interface ExperienceData {
  experiences: {
    title: string;
    subtitle: string;
    dateText: string;
    workType?: string;
    workDescription: string[];
  }[];
}
export interface Project {
  title: string;
  bodyText: string;
  image?: string;
  links?: { text: string; href: string }[];
  tags?: string[];
}
export interface ProjectsData { projects: Project[]; }
