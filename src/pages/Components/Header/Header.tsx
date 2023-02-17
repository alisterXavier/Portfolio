import { useEffect, useRef } from "react";
import { TbBrandDiscord, TbBrandTelegram } from "react-icons/tb";
import {
  AiOutlineLinkedin,
  AiOutlineMail,
  AiFillCaretDown,
} from "react-icons/ai";
import { useSmallDeviceSize } from "@/Hooks/smalDeviceHook";

const Header = ({ section } : {section: (id: string) => void}) => {
  const headerRef = useRef<HTMLElement>(null);
  const banner = useRef<HTMLDivElement>(null);
  const bannerText = useRef<HTMLParagraphElement>(null);
  const HItext = useRef<HTMLHeadingElement>(null);
  const Fname = useRef<HTMLHeadingElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const platform = useRef<Array<HTMLAnchorElement>>([]);
  const isSmallScreen = useSmallDeviceSize();

  const copy = (e: HTMLElement) => {
    const { id } = e;
    const usernames: {
      "discord uid": string;
      email: string;
    } = {
      "discord uid": "DREMANiC#8953",
      email: "xavieralister153@gmail.com",
    };

    document.querySelector(
      ".tooltip"
    )!.innerHTML = `${id.toUpperCase()} COPIED!`;
    navigator.clipboard.writeText(usernames[id as keyof typeof usernames]);
    document.querySelector(".tooltip")?.classList.add("active");
    setTimeout(() => {
      document.querySelector(".tooltip")?.classList.remove("active");
    }, 1000);
  };

  const downMouse = (e: React.MouseEvent): void => {
    if (e.currentTarget !== null) {
      const x =
        e.clientX - (e.currentTarget as HTMLElement).getBoundingClientRect().x;
      const y =
        e.clientY - (e.currentTarget as HTMLElement).getBoundingClientRect().y;

      document.querySelector(".cursor")?.classList.remove("invisible");
      (document.querySelector(".cursor")! as HTMLElement).style.left = `${x}px`;
      (document.querySelector(".cursor")! as HTMLElement).style.top = `${y}px`;
    }
  };

  const prespectiveEffect = (event: React.MouseEvent) => {
    if (banner.current !== null) {
      const { x, y, width, height } = banner.current.getBoundingClientRect();
      const limit = 50;
      const Xangle = (event.clientX - x - width / 2) / limit;
      const Yangle = -(event.clientY - y - height / 2) / limit;

      if (!isSmallScreen) {
        banner.current.style.setProperty("--XDeg", `${Yangle}`);
        banner.current.style.setProperty("--YDeg", `${Xangle}`);
      }
    }
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        Array.from(entries).forEach((e) => {
          if (e.isIntersecting) {
            section("#me");
            setTimeout(() => {
              banner.current?.classList.add(
                "glow-border",
                "glow-shadow",
                "reflection-lights-on"
              );
              setTimeout(() => {
                bannerText.current?.classList.add("neon");
                HItext.current?.classList.add(
                  "neon",
                  "glow",
                  "flicker-effect-1"
                );
                Fname.current?.classList.add(
                  "neon",
                  "glow",
                  "flicker-effect"
                );
                bannerText.current?.classList.add("glow");
                platform.current.forEach((e: HTMLElement) => {
                  e.classList.add("platform-glow");
                });
              }, 500);
            }, 900);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (headerRef.current) {
      observer.current.observe(headerRef.current);
    }
  }, []);

  return (
    <header
      className="headerBanner view relative"
      ref={headerRef}
      id="Me"
      onMouseMove={(event: React.MouseEvent) => {
        prespectiveEffect(event);
      }}
      data-me
    >
      <div className="hero-container lights-on z-20" ref={banner}>
        <div className="info hello">
          <h1 className="text-4xl hi" ref={HItext}>
            HI I&apos;M
          </h1>
          <h1 className="name text-5xl w-fit d-fname" ref={Fname}>
            ALISTER
          </h1>
          <div className="mt-5">
            <p className="headerBannerText" ref={bannerText}>
              A FRONTEND DEVELOPER.
            </p>
          </div>
          <div className="platforms flex justify-end items-center relative">
            <span className="tooltip top-0 hello neon"></span>
            <div className="platforms--wrapper flex justify-end items-center mt-5">
              <a
                rel="noreferrer"
                onClick={(e) => {
                  copy(e.currentTarget);
                }}
                className="platform discord cursor-pointer"
                id="discord uid"
                target="_blank"
                ref={(e) => {
                  if (e !== null) platform.current[0] = e;
                }}
              >
                <TbBrandDiscord size={20}></TbBrandDiscord>
              </a>
              <a
                onClick={(e) => {
                  copy(e.currentTarget);
                }}
                className="envelope platform cursor-pointer"
                id="email"
                ref={(e) => {
                  if (e !== null) platform.current[1] = e;
                }}
              >
                <AiOutlineMail size={20}></AiOutlineMail>
              </a>
              <a
                rel="noreferrer"
                href="https://t.me/AlisterXavier"
                target="_blank"
                className="platform telegram"
                ref={(e) => {
                  if (e !== null) platform.current[2] = e;
                }}
              >
                <TbBrandTelegram size={20}></TbBrandTelegram>
              </a>
              <a
                rel="noreferrer"
                href="https://www.linkedin.com/in/alister-xavier-63259020b/"
                target="_blank"
                className="platform linkedin"
                ref={(e) => {
                  if (e !== null) platform.current[3] = e;
                }}
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
            .querySelector(`[data-about]`)
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        onMouseMove={downMouse}
        onMouseLeave={() => {
          document.querySelector(".cursor")?.classList.add("invisible");
        }}
      >
        <h1 className="neon hello">MORE ABOUT ME</h1>
        <div className="cursor cursor-none absolute">
          <AiFillCaretDown className="fill-white"/>
        </div>
        <div className="down neon">
          <AiFillCaretDown/>
        </div>
      </div>
    </header>
  );
};

export default Header;
