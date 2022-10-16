import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";

export default function Document() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "G-RH02VTQ8K5");
  },[]);
  return (
    <Html>
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RH02VTQ8K5"
        ></script>
        <link
          href="https://fonts.cdnfonts.com/css/hello-denver-display"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/omnes-regular"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/amcap-eternal"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
