import { useEffect, useRef, useState } from "react";
import { useSmallDeviceSize } from "./Hooks/smalDeviceHook";
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import { HiMenu } from "react-icons/hi";
import AboutMe from "./Components/About/AboutMe";
import Stack from "./Components/Stack/Stack";
import Projects from "./Components/Projects/Projects";
import Contact from "./Components/Contact/Contact";
import { AnimatePresence } from "framer-motion";
import Project from "./Components/Projects/Project";
import { ProjectDataInterface } from "./types/types";
import colors from "@a/data/colors.json";

export default function Home() {
  const isSmallScreen = useSmallDeviceSize();
  const [navToggle, setNavToggle] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<
    ProjectDataInterface | undefined
  >(undefined);
  const id = useRef<number>(Math.floor(Math.random() * colors.length));

  const sectionObserver = (id: string) => {
    var active, navSections;
    active = (navRef.current as HTMLElement).querySelector("[data-active]");
    delete (active as HTMLElement)?.dataset.active;

    if (id !== "#me") {
      navSections = (navRef.current as HTMLElement).querySelector(id);
      if (navSections !== null)
        (navSections as HTMLElement).dataset.active = "true";
    }
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--neon",
      colors[id.current].base
    );
    document.documentElement.style.setProperty(
      "--neon-shadow",
      colors[id.current].shadow
    );
    document.documentElement.style.setProperty(
      "--background",
      colors[id.current].background
    );
    document.documentElement.style.setProperty(
      "--lighter-background",
      colors[id.current].lighter
    );
    document.documentElement.style.setProperty(
      "--glow-text-shadow",
      colors[id.current].text
    );
    document.documentElement.style.setProperty(
      "--stack-shadow",
      colors[id.current].itemsShadow
    );
    document.documentElement.style.setProperty(
      "--inset-neu-shadow",
      colors[id.current].inset
    );
  }, []);

  return (
    <>
      <div className={`main ${navToggle && "navbar-active"}`}>
        <Navbar
          navToggle={navToggle}
          setNavToggle={setNavToggle}
          navRef={navRef}
        ></Navbar>
        <div className="content-wrapper relative">
          {isSmallScreen && (
            <div className="flex items-center justify-between h-[8vh] w-screen cursor-default fixed z-10 left-0 backdrop-blur-md px-5">
              <HiMenu
                size={30}
                className="cursor-pointer fill-white"
                onClick={(e) => {
                  e.preventDefault();
                  setNavToggle(!navToggle);
                }}
              ></HiMenu>
              <span className="">
                <p
                  className="neon hello glow active:scale-95"
                  id="me"
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  ALISTER XAVIER
                </p>
              </span>
            </div>
          )}
          <div className="content">
            <Header
              section={(value: string) => {
                sectionObserver(value);
              }}
            ></Header>
            <AboutMe
              navRef={navRef}
              section={(value: string) => {
                sectionObserver(value);
              }}
            />
            <Stack
              section={(value: string) => {
                sectionObserver(value);
              }}
              navRef={navRef}
            />
            <Projects
              section={(value: string) => {
                sectionObserver(value);
              }}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
            />
            <Contact
              section={(value: string) => {
                sectionObserver(value);
              }}
            ></Contact>
          </div>
        </div>
        <AnimatePresence>
          {selectedProject && (
            <Project
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
            ></Project>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
