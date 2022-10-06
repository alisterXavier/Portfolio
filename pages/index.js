import { createContext, useContext, useEffect, useRef, useState } from "react";
import Navbar from "./Home/Navbar";
import Header from "./Home/Header";
import Stack from "./Home/Stack";
import Projects from "./Home/Projects.js";
import Contact from "./Home/Contact";
import { useRouter } from "next/router";
import { Gradient } from "./Gradient/gradient";

export const ContactApi = createContext();
export const Screen = createContext();

export default function Home() {
  const router = useRouter();
  const [contactState, setContactState] = useState(false);
  const [screen, setScreen] = useState();
  const canvas = useRef();
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
    setScreen(window.screen.width);
    gradient();
  }, []);

  return (
    <>
      <div className="overflow-div">
        <div className="mainOverflow-container">
          <ContactApi.Provider value={[contactState, setContactState]}>
            <Screen.Provider value={screen}>
              <Navbar></Navbar>
              <Header></Header>
              <main className="main relative">
                <Stack
                  changeRoute={(value) => {
                    handleRoute(value);
                  }}
                />
                <Projects
                  canvasElem={canvas}
                  changeRoute={(value) => {
                    handleRoute(value);
                  }}
                />
                <canvas
                  ref={canvas}
                  id="gradient-canvas"
                  className="absolute top-0 z-1"
                  data-transition-in
                ></canvas>
              </main>
              {contactState === true && <Contact></Contact>}
            </Screen.Provider>
          </ContactApi.Provider>
        </div>
      </div>
    </>
  );
}
