import { useRef, useState } from 'react';
import { useSmallDeviceSize } from '../Hooks/smalDeviceHook';
import Header from './Components/Header/Header';
import Navbar from './Components/Navbar/Navbar';
import { HiMenu } from 'react-icons/hi';
import AboutMe from './Components/About/AboutMe';
import Stack from './Components/Stack/Stack';
import Projects from './Components/Projects/Projects';
import Contact from './Components/Contact/Contact';
import { AnimatePresence } from 'framer-motion';
import Project from './Components/Projects/Project';
import { ProjectDataInterface } from '../types/types';
import Head from 'next/head';
import ReactLenis from '@studio-freight/react-lenis';

export default function Home() {
  const isSmallScreen = useSmallDeviceSize();
  const [navToggle, setNavToggle] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<
    ProjectDataInterface | undefined
  >(undefined);

  const sectionObserver = (id: string) => {
    var active, navSections;
    active = (navRef.current as HTMLElement).querySelector('[data-active]');
    delete (active as HTMLElement)?.dataset.active;

    if (id !== '#me') {
      navSections = (navRef.current as HTMLElement).querySelector(id);
      if (navSections !== null)
        (navSections as HTMLElement).dataset.active = 'true';
    }
  };
  return (
    <ReactLenis root options={{
      lerp: !isSmallScreen ? 0.04 : 0 ,
      duration: !isSmallScreen ? 0.05 : 0,
      syncTouch: true,
    }}>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className={`main ${navToggle && 'navbar-active'}`}>
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
                  const value = !navToggle;
                  setNavToggle(value);
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
            {/* <Certificates /> */}
            {/* <TimelineComp /> */}

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
    </ReactLenis>
  );
}
