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
  const canvas = useRef();
  const navigationPanel = useRef();
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
        <Navbar ref={navigationPanel}></Navbar>
        <Header ref={navigationPanel}></Header>
        <main className="main relative">
          <canvas
            ref={canvas}
            id="gradient-canvas"
            className="absolute top-0 z-1"
            data-transition-in
          ></canvas>
          <div className="gradient-section"></div>
          <AboutMe ref={navigationPanel} />
          <Stack
            changeRoute={(value) => {
              handleRoute(value);
            }}
            ref={navigationPanel}
          />
          <Projects
            changeRoute={(value) => {
              handleRoute(value);
            }}
            ref={{ canvasRef: canvas, navigationRef: navigationPanel }}
          />
        </main>
        {contactState === true && <Contact></Contact>}
      </div>
    </div>
  );
}
