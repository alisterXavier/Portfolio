import { useEffect, useRef, Fragment, useState } from "react";
import ProjectCarousel from "./ProjectCarousel";
import { SelectedProjectInterface } from "@/types/types";
import { Menu, Transition } from "@headlessui/react";
import { FaAngleDown } from "react-icons/fa";
import projects from "@a/data/projects.json";

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
  const [filter, setFilter] = useState<string | null>(null);
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
        <div className="carousel flex flex-col justify-end items-end">
          <Filter filter={filter} setFilter={setFilter} />
          <ProjectCarousel
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            filter={filter}
          />
        </div>
      </div>
    </section>
  );
};

const Filter = ({
  filter,
  setFilter,
}: {
  filter: string | null;
  setFilter: (value: string | null) => void;
}) => {
  const stack = new Set(
    projects.map((project) => project.stack.map((i) => i)).flat()
  );
  return (
    <div className="relative z-[1] w-56 text-right mr-10">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {filter === null ? "All" : filter}
            <FaAngleDown
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 h-[250px] overflow-scroll origin-top-right divide-y divide-gray-100 rounded-md bg-[#000000f3] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`neon ${
                      active ? "bg-[#3d3d3df3]" : ""
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => setFilter(null)}
                  >
                    All
                  </button>
                )}
              </Menu.Item>
              {Array.from(stack).map((item, i) => {
                return (
                  <Menu.Item key={i}>
                    {({ active }) => (
                      <button
                        className={`neon ${
                          active ? "bg-[#3d3d3df3]" : ""
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => setFilter(item)}
                      >
                        {item}
                      </button>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
export default Projects;
