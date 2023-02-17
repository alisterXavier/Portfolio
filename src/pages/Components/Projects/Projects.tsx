import { useEffect, useRef } from "react";
import ProjectCarousel from "./ProjectCarousel";
import { SelectedProjectInterface } from "@/types/types";

interface ProjectInterface extends SelectedProjectInterface {
  section: (id: string) => void;
}
const Projects = ({
  section,
  selectedProject,
  setSelectedProject,
}: ProjectInterface) => {
  const projects = useRef<HTMLElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section("#projects");
          }
        });
      },
      {
        threshold: 0.5,
      }
    );
    if (projects.current) observer.current.observe(projects.current);
  }, [section]);

  return (
    <section
      className="projects view relative overflow-hidden"
      ref={projects}
      id="Projects"
      data-projects
    >
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="project-title my-5">
          <h2 className="project-glitch my-0 mx-auto text-5xl lg:text-6xl hello neon">
            PROJECTS
          </h2>
        </div>
        <ProjectCarousel
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      </div>
    </section>
  );
};

export default Projects;
