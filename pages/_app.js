import { createContext, createRef, useEffect, useRef, useState } from "react";
import "../styles/globals.css";
import "../styles/styles.sass";
import ReactGA from 'react-ga';

const TRACKING_ID = "G-RH02VTQ8K5"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

export const ContactApi = createContext();
export const Screen = createContext();
export const Nav = createContext();

function MyApp({ Component, pageProps }) {
  const [contactState, setContactState] = useState(false);
  const [screen, setScreen] = useState();
  const [navState, setNavState] = useState("");

  useEffect(() => {
    setScreen(document.documentElement.clientWidth);
    ReactGA.pageview(window.location.pathname + window.location.search);
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
