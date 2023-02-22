import { RefObject, useEffect, useRef } from "react";
import { useSmallDeviceSize } from "@/Hooks/smalDeviceHook";

interface NavbarInterface {
  navToggle: boolean;
  setNavToggle: (value: boolean) => void;
  navRef: RefObject<HTMLElement>;
}

const Navbar = ({ navToggle, setNavToggle, navRef }: NavbarInterface) => {
  const isSmallScreen = useSmallDeviceSize();

  const EnterPrevNav = (e: React.MouseEvent) => {
    const { id } = e.currentTarget;
    const child = e.currentTarget.querySelector("p");

    (function (child) {
      const value = (child as HTMLParagraphElement).innerText;
      var count = 0;
      if (child)
        var interval = setInterval(() => {
          if (count < value.length) {
            child.innerText = value
            .split("")
            .map((l) => value.split("")[Math.floor(Math.random() * value.length)])
              .join(""); 
          } else {
            clearInterval(interval);
            child.innerText = value;
          }
          count++;
        }, 20);
    })(child);

    const translate =
      id === "about"
        ? "0px"
        : id === "stack"
        ? "200px 0px"
        : id === "projects"
        ? "400px 0px"
        : "600px 0px";
    if (navRef.current) {
      (navRef.current.querySelector(".slider") as HTMLElement).style.translate =
        translate;
    }
  };
  const leavePrevNav = (e: React.MouseEvent) => {
    const { id } = e.currentTarget;
    if (navRef.current) {
      (navRef.current.querySelector(".slider") as HTMLElement).removeAttribute(
        "style"
      );
    }
  };
  const handleClick = (e: HTMLElement) => {
    const { id } = e;
    const active = navRef.current?.querySelector("[data-active]");
    delete (active as HTMLElement)?.dataset.active;

    if (id !== "me") e.dataset.active = "true";

    document
      .querySelector(`[data-${id}]`)
      ?.scrollIntoView({ behavior: "smooth" });
    setNavToggle(false);
  };
  const hoverLetterMix = () => {};
  return (
    <nav
      className={`navigation-panel flex items-center ${navToggle && "active"}`}
      ref={navRef}
      data-nav
    >
      {!isSmallScreen && (
        <span className="m-5">
          <p
            className="neon hello cursor-pointer active:scale-95"
            id="me"
            onClick={() => {
              window?.scrollTo(0, 0);
            }}
          >
            ALISTER XAVIER
          </p>
        </span>
      )}
      <ul
        className="nav-wrapper lg:ml-auto Omnes"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <li
          className="cursor-pointer text-center flex items-center lg:justify-center"
          id="about"
          onClick={(e) => {
            handleClick(e.currentTarget);
          }}
          onMouseEnter={(e) => {
            EnterPrevNav(e);
          }}
          onMouseLeave={(e) => {
            leavePrevNav(e);
          }}
        >
          <p>About Me</p>
        </li>
        <li
          className="cursor-pointer text-center flex items-center lg:justify-center"
          id="stack"
          onClick={(e) => {
            handleClick(e.currentTarget);
          }}
          onMouseEnter={(e) => {
            EnterPrevNav(e);
          }}
          onMouseLeave={(e) => {
            leavePrevNav(e);
          }}
        >
          <p>Stack</p>
        </li>
        <li
          className="cursor-pointer text-center flex items-center lg:justify-center"
          id="projects"
          onClick={(e) => {
            handleClick(e.currentTarget);
          }}
          onMouseEnter={(e) => {
            EnterPrevNav(e);
          }}
          onMouseLeave={(e) => {
            leavePrevNav(e);
          }}
        >
          <p>Projects</p>
        </li>
        <li
          className="cursor-pointer text-center flex items-center lg:justify-center"
          id="contact"
          onClick={(e) => {
            handleClick(e.currentTarget);
          }}
          onMouseEnter={(e) => {
            EnterPrevNav(e);
          }}
          onMouseLeave={(e) => {
            leavePrevNav(e);
          }}
        >
          <p>Contact Me</p>
        </li>
        <span className="slider"></span>
      </ul>
    </nav>
  );
};

export default Navbar;
