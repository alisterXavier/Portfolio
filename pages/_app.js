import { createContext, createRef, useEffect, useRef, useState } from "react";
import "../styles/globals.css";
import "../styles/styles.sass";

export const ContactApi = createContext();
export const Screen = createContext();
export const Nav = createContext();

function MyApp({ Component, pageProps }) {
  const [contactState, setContactState] = useState(false);
  const [screen, setScreen] = useState();
  const [navState, setNavState] = useState("");

  useEffect(() => {
    setScreen(document.documentElement.clientWidth);
  }, []);
  return (
    <Screen.Provider value={screen}>
      <Nav.Provider value={[navState, setNavState]}>
        <ContactApi.Provider value={[contactState, setContactState]}>
          <Component {...pageProps} />
        </ContactApi.Provider>
      </Nav.Provider>
    </Screen.Provider>
  );
}

export default MyApp;
