import ReactLenis from '@studio-freight/react-lenis';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowRight } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import { ImCross } from 'react-icons/im';
import { useSmallDeviceSize } from '../Hooks/smalDeviceHook';
import { ProjectDataInterface } from '../types/types';
import AboutMe from './Components/About/AboutMe';
import Contact from './Components/Contact/Contact';
import Header from './Components/Header/Header';
import Navbar from './Components/Navbar/Navbar';
import Project from './Components/Projects/Project';
import Projects from './Components/Projects/Projects';
import Stack from './Components/Stack/Stack';

export default function Home() {
  const isSmallScreen = useSmallDeviceSize();
  const [navToggle, setNavToggle] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<
    ProjectDataInterface | undefined
  >(undefined);

  const notify = () => {
    const handleClick = () => {
      toast.dismiss();
    };
    toast(
      <div className="neon flex justify-between items-center">
        <ImCross size={15} className="mr-2 cursor-pointer" onClick={handleClick} />
        <p className="cursor-pointer">Check out my new portfolio</p>
        <a className="ml-2" href="https://alister-xavier.vercel.app/" target='__blank'>
          <FaArrowRight size={20} />
        </a>
      </div>,
      {
        position: 'top-right',
        duration: 10000,
        style: {
          width: '300px',
          background: 'var(--background)',
          border: '3px solid var(--neon)',
        },
      }
    );
  };

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

  useEffect(() => {
    notify();
  }, []);
  return (
    <ReactLenis
      root
      options={{
        lerp: isSmallScreen ? 0 : 0.04,
        duration: isSmallScreen ? 0 : 0.05,
        syncTouch: !isSmallScreen,
      }}
    >
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
      <Toaster />
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
