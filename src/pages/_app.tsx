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

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
