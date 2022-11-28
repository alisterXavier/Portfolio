import { createContext, createRef, useEffect, useRef, useState } from "react";
import "../styles/globals.css";
import "../styles/styles.sass";

export const ContactApi = createContext();
export const Screen = createContext();
export const Nav = createContext();

function MyApp({ Component, pageProps }) {
  const [contactState, setContactState] = useState(false);
  const [screen, setScreen] = useState();

  useEffect(() => {
    setScreen(document.documentElement.clientWidth);
  }, []);
  return (
    <Screen.Provider value={screen}>
        <ContactApi.Provider value={[contactState, setContactState]}>
          <Component {...pageProps} />
        </ContactApi.Provider>
    </Screen.Provider>
  );
}

export default MyApp;
