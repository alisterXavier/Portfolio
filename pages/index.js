import { createContext, useContext, useEffect, useRef, useState } from "react";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import Stack from "./Components/Stack";
import Projects from "./Components/Projects.js";
import Contact from "./Components/Contact";
import { useRouter } from "next/router";
import { Gradient } from "../components/Gradient";
import { ContactApi } from "./_app";
import AboutMe from "./Components/AboutMe";
import AllProjects from "./Components/AllProject";

export const ProjectsVisibility = createContext();

export default function Home() {
  const router = useRouter();
  const navCanvas = useRef([]);
  const [contactState, setContactState] = useContext(ContactApi);
  const [nav, setNav] = useState(false);
  const [allProjectsVis, setAllProjectVis] = useState(false);

  const handleRoute = (value) => {
    setTimeout(() => {
      router.push(`/${value}`);
    }, 1000);
  };

  const handleClick = (e) => {
    const { id } = e.currentTarget;
    const nav = navCanvas.current[0];
    const active = nav.querySelector("[data-active]");
    delete active?.dataset.active;

    if (id !== "me") e.currentTarget.dataset.active = true;

    if (id !== "contact") {
      document
        .querySelector(`[data-${id}]`)
        .scrollIntoView({ behavior: "smooth" });
      contactState && setContactState(false);
    }
    closeMobileNav();
  };

  const closeMobileNav = () => {
    navCanvas.current[0].firstChild.classList.add("fade-out");
    setTimeout(() => {
      setNav(false);
      setTimeout(()=> {
        navCanvas.current[0].firstChild.classList.remove("fade-out");
      },700)
    }, 600);
  };

  const sectionObserver = (id) => {
    var navbar, active, navSections;
    navbar = navCanvas.current[0];
    active = navbar.querySelector("[data-active]");
    delete active?.dataset.active;

    if (id !== "#me") {
      navSections = navbar.querySelector(id);
      navSections.dataset.active = true;
    }
  };

  const gradient = () => {
    // Create your instance
    const gradient = new Gradient();
    // Call `initGradient` with the selector to your canvas
    gradient.initGradient("#gradient-canvas");
  };

  const handleContact = (e) => {
    handleClick(e);
    const value = !contactState;
    setContactState(value);
  };

  useEffect(() => {
    gradient();
  }, []);

  return (
    <div className="overflow relative">
      <AllProjects
        allProjectsVis={allProjectsVis}
        setAllProjectVis={setAllProjectVis}
      />
      <div className="overflow-div relative z-10">
        <div className="mainOverflow-container">
          <Navbar
            ref={navCanvas}
            navClick={(value) => {
              handleClick(value);
            }}
            contact={(value) => {
              handleContact(value);
            }}
            nav={nav}
            setNav={setNav}
            closeMobile={closeMobileNav}
          ></Navbar>
          <Header
            section={(value) => {
              sectionObserver(value);
            }}
            ref={navCanvas}
          ></Header>
          <main className="main relative">
            <canvas
              ref={(elem) => {
                navCanvas.current[1] = elem;
              }}
              id="gradient-canvas"
              className="absolute top-0 z-1"
              data-transition-in
            ></canvas>
            <AboutMe
              ref={navCanvas}
              section={(value) => {
                sectionObserver(value);
              }}
            />
            <Stack
              changeRoute={(value) => {
                handleRoute(value);
              }}
              section={(value) => {
                sectionObserver(value);
              }}
              ref={navCanvas}
            />
            {navCanvas.current && (
              <Projects
                changeRoute={(value) => {
                  handleRoute(value);
                }}
                section={(value) => {
                  sectionObserver(value);
                }}
                ref={navCanvas}
                setAllProjectVis={setAllProjectVis}
              />
            )}
          </main>
          {contactState === true && <Contact></Contact>}
        </div>
      </div>
    </div>
  );
}
