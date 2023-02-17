export interface ProjectDataInterface {
  img?: Array<string>;
  title: string;
  stack: string;
  desc: string;
  git_link: string;
  app_link?: string;
}
export interface SelectedProjectInterface {
  selectedProject: ProjectDataInterface | undefined;
  setSelectedProject: (value: ProjectDataInterface | undefined) => void;
}
