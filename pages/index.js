import { createRef, useContext, useEffect, useRef } from "react";
import Navbar from "./Home/Navbar";
import Header from "./Home/Header";
import Stack from "./Home/Stack";
import Projects from "./Home/Projects.js";
import Contact from "./Home/Contact";
import { useRouter } from "next/router";
import { Gradient } from "../components/Gradient/Gradient";
import { ContactApi } from "./_app";
import AboutMe from "./Home/AboutMe";

export default function Home() {
  const router = useRouter();
  const navCanvas = useRef([]);
  const [contactState] = useContext(ContactApi);
  const handleRoute = (value) => {
    setTimeout(() => {
      router.push(`/${value}`);
    }, 1000);
  };

  const gradient = () => {
    // Create your instance
    const gradient = new Gradient();
    // Call `initGradient` with the selector to your canvas
    gradient.initGradient("#gradient-canvas");
  };

  useEffect(() => {
    gradient();
  }, []);

  return (
    <div className="overflow-div">
      <div className="mainOverflow-container">
        <Navbar ref={navCanvas}></Navbar>
        <Header ref={navCanvas}></Header>
        <main className="main relative">
          <canvas
            ref={(elem) => {
              navCanvas.current[1] = elem;
            }}
            id="gradient-canvas"
            className="absolute top-0 z-1"
            data-transition-in
          ></canvas>
          <AboutMe ref={navCanvas} />
          <Stack
            changeRoute={(value) => {
              handleRoute(value);
            }}
            ref={navCanvas}
          />
          {navCanvas.current && (
            <Projects
              changeRoute={(value) => {
                handleRoute(value);
              }}
              ref={navCanvas}
            />
          )}
        </main>
        {contactState === true && <Contact></Contact>}
      </div>
    </div>
  );
}
