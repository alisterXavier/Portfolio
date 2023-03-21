import "../styles/globals.css";
import "../styles/styles.sass";
import "../styles/navbar.css";
import "../styles/header.css";
import "../styles/about.css";
import "../styles/keyframes.css";
import "../styles/stack.css";
import "../styles/projects.css";
import "../styles/contact.css";
import type { AppProps } from 'next/app'
import { useEffect } from "react";
import { useRandomNumber } from "@/Hooks/randomNumber";
import colors from "@a/data/colors.json";

export default function App({ Component, pageProps }: AppProps) {

  const colorId = useRandomNumber();

  useEffect(() => {
    if (colorId || colorId === 0) {
      document.documentElement.style.setProperty(
        "--neon",
        colors[colorId].base
      );
      document.documentElement.style.setProperty(
        "--neon-shadow",
        colors[colorId].shadow
      );
      document.documentElement.style.setProperty(
        "--background",
        colors[colorId].background
      );
      document.documentElement.style.setProperty(
        "--lighter-background",
        colors[colorId].lighter
      );
      document.documentElement.style.setProperty(
        "--glow-text-shadow",
        colors[colorId].text
      );
      document.documentElement.style.setProperty(
        "--stack-shadow",
        colors[colorId].itemsShadow
      );
      document.documentElement.style.setProperty(
        "--inset-neu-shadow",
        colors[colorId].inset
      );
    }
  }, [colorId]);
  
  return <Component {...pageProps} />
}
