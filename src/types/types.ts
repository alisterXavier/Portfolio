export interface ProjectDataInterface {
  img?: Array<string>;
  title: string;
  stack: string[];
  desc: string;
  git_link: string;
  app_link?: string;
  completed: boolean;
}
export interface SelectedProjectInterface {
  selectedProject: ProjectDataInterface | undefined;
  setSelectedProject: (value: ProjectDataInterface | undefined) => void;
}

export interface VerticalProjectCarouselType
  extends Omit<SelectedProjectInterface, 'selectedProject'> {
  filter: string | null;
  unBlurr: (e: React.MouseEvent) => void;
  blurEffect: (e: React.MouseEvent) => void;
}

export interface AddFilter
  extends Omit<SelectedProjectInterface, 'selectedProject'> {
  filter: string | null;
}
