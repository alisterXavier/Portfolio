import Image from "next/image";
import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import { Nav, Screen } from "../_app";
import { TbBrandDiscord } from "react-icons/tb";
import {
  AiOutlineLinkedin,
  AiOutlineMail,
  AiFillCaretDown,
} from "react-icons/ai";
import BgParticles from "../tsparticles";

const Header = forwardRef((props, ref) => {
  const screen = useContext(Screen);
  const header = useRef();
  const info = useRef();
  const hi = useRef();
  const headerBannerText = useRef([]);
  const fname = useRef();
  const avatar = useRef();
  const containerTimeout = useRef(0);
  const textTimeout = useRef(0);
  const observer = useRef();
  const platform = useRef([]);

  const copy = (e) => {
    const { id } = e.currentTarget;
    const usernames = {
      "discord uid": "DREMANiC#8953",
      email: "xavieralister153@gmail.com",
    };

    document.querySelector(
      ".tooltip"
    ).innerHTML = `${id.toUpperCase()} COPIED!`;
    navigator.clipboard.writeText(usernames[id]);
    document.querySelector(".tooltip").classList.add("active");
    setTimeout(() => {
      document.querySelector(".tooltip").classList.remove("active");
    }, 1000);
  };

  const downMouse = (e) => {
    const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
    const y = e.clientY - e.currentTarget.getBoundingClientRect().y;

    document.querySelector(".cursor").classList.remove("invisible");
    document.querySelector(".cursor").style.left = `${x}px`;
    document.querySelector(".cursor").style.top = `${y}px`;
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

  useEffect(() => {
    const Navbar = () => {
      const navbar = ref.current[0];
      const active = navbar.querySelector("[data-active]");
      const navSections = navbar.querySelector("#me");
      delete active?.dataset.active;
      navSections.dataset.active = true;
    };
    observer.current = new IntersectionObserver(
      (entries) => {
        Array.from(entries).forEach((e) => {
          if (e.isIntersecting) {
            containerTimeout.current = setTimeout(() => {
              info.current.style.boxShadow = `0px 0px 2rem #0fa, inset 0px 0px 20px #0fa`;
              info.current.style.border = `3px solid #0fa`;
              info.current.classList.add("reflection-lights-on");
              textTimeout.current = setTimeout(() => {
                headerBannerText.current.classList.add("glow-text");
                hi.current.classList.add("glow-text");
                fname.current.classList.add("glow-text");
                fname.current.classList.add("glow");
                hi.current.classList.add("glow");
                headerBannerText.current.classList.add("glow-1");
                fname.current.classList.add("flicker-effect");
                hi.current.classList.add("flicker-effect-1");
                platform.current.forEach((e) => {
                  e.classList.add("platform-glow");
                });
                // avatar.current.classList.add("on");
              }, 500);
            }, 900);
          }
        });
      },
      { threshold: 0.6 }
    );
    if (header.current) {
      observer.current.observe(header.current);
    }
  }, [ref]);

  return (
    <header
      className="headerBanner view relative"
      ref={header}
      id="Me"
      onMouseMove={prespectiveEffect}
      data-me
    >
      {/* <BgParticles className="profile-bg-container absolute z-10 bg-black" /> */}
      <div className="info-container lights-on z-20 bg-black" ref={info}>
        <div className="info hello">
          <h1 className="text-4xl hi" ref={hi}>
            HI I&apos;M
          </h1>
          <h1 className="name text-5xl w-fit d-fname" ref={fname}>
            ALISTER
          </h1>
          <div className="mt-5">
            <p className="headerBannerText" ref={headerBannerText}>
              A FRONTEND DEVELOPER.
            </p>
          </div>
          <div className="platforms flex justify-end items-center relative">
            <span className="tooltip top-0" style={{ color: "#0fa" }}></span>
            <div className="platforms--wrapper flex justify-end items-center mt-5">
              <a
                rel="noreferrer"
                onClick={copy}
                className="platform discord cursor-pointer"
                id="discord uid"
                target="_blank"
                ref={(elem) => (platform.current[0] = elem)}
              >
                <TbBrandDiscord size={20}></TbBrandDiscord>
              </a>
              <a
                onClick={copy}
                className="envelope platform cursor-pointer"
                id="email"
                ref={(elem) => (platform.current[1] = elem)}
              >
                <AiOutlineMail size={20}></AiOutlineMail>
              </a>
              <a
                rel="noreferrer"
                href="https://www.linkedin.com/in/alister-xavier-63259020b/"
                target="_blank"
                className="platform linkedin"
                ref={(elem) => (platform.current[2] = elem)}
              >
                <AiOutlineLinkedin size={20}></AiOutlineLinkedin>
              </a>
            </div>
          </div>
        </div>
        <div className="floating float1"></div>
        <div className="floating float2"></div>
      </div>
      <div
        className="move-down absolute bottom-10 w-40 cursor-pointer flex justify-center flex-col items-center"
        onClick={() => {
          document
            .querySelector(`[data-about-me]`)
            .scrollIntoView({ behavior: "smooth" });
        }}
        onMouseMove={downMouse}
        onMouseLeave={() => {
          document.querySelector(".cursor").classList.add("invisible");
        }}
      >
        <h1 className="glow-text hello">MORE ABOUT ME</h1>
        <div className="cursor invisible">
          <AiFillCaretDown />
        </div>
        <div className="down glow-text">
          <AiFillCaretDown />
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";
export default Header;
