import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { Screen } from "../_app";

const Header = () => {
  const screen = useContext(Screen);
  const header = useRef();
  const info = useRef();
  const hi = useRef();
  const headerBannerText = useRef();
  const fname = useRef();
  const avatar = useRef();
  const containerTimeout = useRef(0);
  const textTimeout = useRef(0);
  const observer = useRef();
  const Parallex = (event) => {
    const x = (event.pageX * -1) / 20;
    const y = (event.pageY * -1) / 20;

    header.current.style.setProperty("--x", x);
    header.current.style.setProperty("--y", y);
  };

  const prespectiveEffect = (e) => {
    const { x, y, width, height } = info.current.getBoundingClientRect();
    const limit = 50;
    const Xangle = (e.clientX - x - width / 2) / limit;
    const Yangle = -(e.clientY - y - height / 2) / limit;

    if (screen > 900) {
      info.current.style.setProperty("--XDeg", Yangle);
      info.current.style.setProperty("--YDeg", Xangle);
    }
  };

  const Navbar = () => {
    const id = document.querySelector("[data-Me]");
    const navbar = document.querySelector(".navigation-panel");
    const active = navbar.querySelector("[data-active]");
    const navSections = navbar.querySelector("#me");
    delete active.dataset.active;
    navSections.dataset.active = true;
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        Array.from(entries).forEach((e) => {
          if (e.isIntersecting) {
            Navbar();
            containerTimeout.current = setTimeout(() => {
              info.current.style.boxShadow = `0px 0px 2rem #0fa, inset 0px 0px 20px #0fa`;
              info.current.style.border = `3px solid #0fa`;
              info.current.classList.add("reflection-lights-on");
              textTimeout.current = setTimeout(() => {
                hi.current.style.color = `#0fa`;
                fname.current.style.color = `#0fa`;
                headerBannerText.current.style.color = `#0fa`;

                fname.current.classList.add("glow");
                hi.current.classList.add("glow");
                fname.current.classList.add("flicker-effect");
                hi.current.classList.add("flicker-effect-1");
                headerBannerText.current.classList.add("glow-1");
                avatar.current.classList.add("on");
              }, 500);
            }, 1100);
          } else {
            if (containerTimeout.current)
              clearTimeout(containerTimeout.current);
            if (textTimeout.current) clearTimeout(textTimeout.current);
            info.current.removeAttribute("style");
            hi.current.removeAttribute("style");
            fname.current.removeAttribute("style");
            headerBannerText.current.removeAttribute("style");
            hi.current.classList.remove("glow");
            fname.current.classList.remove("glow");
            headerBannerText.current.classList.remove("glow-1");
            fname.current.classList.remove("flicker-effect");
            hi.current.classList.remove("flicker-effect-1");
            info.current.classList.remove("reflection-lights-on");
            avatar.current.classList.remove("on");
          }
        });
      },
      { threshold: 0.6 }
    );
    if (header.current) {
      observer.current.observe(header.current);
    }
  }, []);

  return (
    <header
      className="headerBanner view"
      ref={header}
      id="Me"
      onMouseMove={prespectiveEffect}
      data-me
    >
      <div className="info-container lights-on" ref={info}>
        <div className="info">
          <h1 className="text-4xl hi" ref={hi}>
            HI I'M
          </h1>
          <h1 className="name text-5xl w-fit d-fname" ref={fname}>
            ALISTER
          </h1>
          <p className="headerBannerText" ref={headerBannerText}>
            SELF-TAUGHT FRONT-END DEVELOPER.
          </p>
        </div>
        <div className="avatar-container" ref={avatar}>
          <Image
            className="avatar"
            src="/assets/Zoro.jpg"
            alt=""
            layout="fill"
          />
        </div>
        {screen < 900 && (
          <>
            <div className="floating float1"></div>
            <div className="floating float2"></div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
