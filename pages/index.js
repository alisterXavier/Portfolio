import { createRef, useContext, useEffect, useRef, useState } from "react";
import Navbar from "./Home/Navbar";
import Header from "./Home/Header";
import Stack from "./Home/Stack";
import Projects from "./Home/Projects.js";
import Contact from "./Home/Contact";
import { useRouter } from "next/router";
import { Gradient } from "../components/Gradient/Gradient";
import { ContactApi, Nav } from "./_app";
import AboutMe from "./Home/AboutMe";

export default function Home() {
  const router = useRouter();
  const navCanvas = useRef([]);
  const [contactState, setContactState] = useContext(ContactApi);
  const [navState, setNavState] = useContext(Nav);
  const [nav, setNav] = useState(false);

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
    console.log(id)
    if (id !== "me") e.currentTarget.dataset.active = true;

    if (id !== "contact") {
      document
        .querySelector(`[data-${id}]`)
        .scrollIntoView({ behavior: "smooth" });
      id !== "me" && setNavState("pop");
      contactState && setContactState(false);
    }
    setNav(false);
  };

  const closeMobileNav = () => {
    setNav(false)
  }

  const sectionObserver = (id) => {
    var navbar, active, navSections;
    if (id !== "#me") {
      navbar = navCanvas.current[0];
      active = navbar.querySelector("[data-active]");
      navSections = navbar.querySelector(id);
      navSections.dataset.active = true;
    }
    delete active?.dataset.active;
  };

  const NavPop = () => {
    navCanvas.current[0].classList.remove("unpop");
    navCanvas.current[0].classList.add("pop");
  };

  const NavUnpop = () => {
    navCanvas.current[0].classList.remove("pop");
    navCanvas.current[0].classList.add("unpop");
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
    if (value) setNavState("unpop");
    else if (window.scrollY > 20) setNavState("pop");
  };

  useEffect(() => {
    gradient();
    document.addEventListener("scroll", () => {
      if (navCanvas.current[0]) {
        if (window.scrollY > 20) {
          NavPop();
        } else {
          NavUnpop();
        }
      }
    });
  }, []);

  return (
    <div className="overflow relative">
      {/* <h1 className="bg-A glow glow-text hello">A</h1> */}
      <div className="overflow-div relative z-10">
        <div className="mainOverflow-container">
          {/* <Navbar
            ref={navCanvas}
            navClick={(value) => {
              handleClick(value);
            }}
            contact={(value) => {
              handleContact(value);
            }}
            mobileNav={[nav, setNav]}
            closeMobile={closeMobileNav}
          ></Navbar> */}
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
              />
            )}
          </main>
          {contactState === true && <Contact></Contact>}
        </div>
      </div>
    </div>
  );
}
