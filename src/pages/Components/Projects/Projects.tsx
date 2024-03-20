import { useEffect, useRef, Fragment, useState } from 'react';
import { SelectedProjectInterface } from '@/types/types';
import { Menu, Transition } from '@headlessui/react';
import { FaAngleDown } from 'react-icons/fa';
import projectList from '@a/data/projects.json';
import Image from 'next/image';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSmallDeviceSize } from '@/Hooks/smalDeviceHook';
import HorizontalProjectCarousel from './Carousel/Horizontal'
import VerticalProjectCarousel from './Carousel/Vertical';
interface ProjectInterface extends SelectedProjectInterface {
  section: (id: string) => void;
}

function genFadePosition() {
  const randomNumber = Math.random();
  const scaledNumber = randomNumber * (3 - 0) + 0;
  const roundedNumber = Math.round(scaledNumber);
  const pos = ['left', 'right', 'bottom', 'top'];
  return pos[roundedNumber];
}
const animeTitle = {
  initial: {
    x: '100%',
    opacity: 0,
    duration: 1,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const Projects = ({
  section,
  selectedProject,
  setSelectedProject,
}: ProjectInterface) => {
  const isSmallScreen = useSmallDeviceSize();
  const [projectsRef, projectInView] = useInView({
    threshold: 0.5,
  });

  const controls = useAnimation();
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    if (projectInView) {
      section('#projects');
      controls.start('visible');
    } else {
      controls.start('initial');
    }
  }, [controls, projectInView, projectsRef, section]);

  const blurEffect = (element: React.MouseEvent) => {
    const parent = element.currentTarget.parentElement;
    const allChildren = parent?.querySelectorAll('.project-card');
    allChildren?.forEach((i) => i.classList.add('blurr'));
    element.currentTarget.classList.remove('blurr');
  };

  const unBlurr = (e: React.MouseEvent) => {
    const parent = e.currentTarget.parentElement;
    const allChildren = parent?.querySelectorAll('.project-card');
    allChildren?.forEach((i) => i.classList.remove('blurr'));
  };

  return (
    <section
      className="projects view relative overflow-hidden"
      ref={projectsRef}
      id="Projects"
      data-projects
    >
      <div className="w-full h-full flex flex-col items-center justify-center p-5">
        <motion.div className="project-title flex items-center z-[2] justify-start bg-[var(--background)] w-[85%] h-[10%]">
          <motion.h2
            className="project-glitch my-0 text-5xl lg:text-8xl hello neon"
            animate={controls}
            initial={'initial'}
            variants={animeTitle}
          >
            PROJECTS
          </motion.h2>
        </motion.div>
        <div className="carousel relative flex flex-col justify-end items-end w-full h-[90%]">
          <div>
            <Filter filter={filter} setFilter={setFilter} />
          </div>
          <div className="relative flex justify-center z-[1] w-full h-[90%]">
            {isSmallScreen ? (
              <HorizontalProjectCarousel
                setSelectedProject={setSelectedProject}
                filter={filter}
              />
            ) : (
              <VerticalProjectCarousel
                filter={filter}
                unBlurr={unBlurr}
                blurEffect={blurEffect}
                setSelectedProject={setSelectedProject}
              />
            )}
          </div>
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
    projectList.map((project) => project.stack.map((i) => i)).flat()
  );
  return (
    <div className="relative z-[2] text-right mr-10">
      <Menu
        as="div"
        className="relative w-[150px] h-[50px] inline-block text-left"
      >
        <div className="w-full">
          <Menu.Button className="inline-flex w-full justify-between items-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-md font-medium text-white hover:bg-opacity-30 border border-[var(--neon)]">
            {filter === null ? 'All' : filter}
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
          <Menu.Items className="absolute right-0 mt-2 w-[200px] h-[250px] overflow-scroll origin-top-right rounded-sm bg-[#000000f3]">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`neon ${
                      active ? 'bg-[#3d3d3df3]' : ''
                    } group flex w-full items-center rounded-sm px-2 py-2 text-sm`}
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
                          active ? 'bg-[#3d3d3df3]' : ''
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
