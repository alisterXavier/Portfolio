import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import { ContactApi, Nav, Screen } from "../_app";
import { HiMenu } from "react-icons/hi";

const Navbar = forwardRef((props, ref) => {
  const screen = useContext(Screen);
  const [contactState, setContactState] = useContext(ContactApi);
  const [nav, setNav] = useState(false);
  const [navState, setNavState] = useContext(Nav);
  const lightsOn = (e) => {
    const element = e.currentTarget;
    element.style.color = "#0fa";
    element.dataset.hover = true;
  };

  const lightsOff = (e) => {
    const element = e.currentTarget;
    element.removeAttribute("style");
    delete element.dataset.hover;
  };

  const handleClick = (e) => {
    e.stopPropagation();
    const { id } = e.currentTarget;
    const nav = ref.current[0];
    const active = nav.querySelector("[data-active]");
    delete active?.dataset.active;
    if (id !== "me") e.currentTarget.dataset.active = true;

    if (id !== "contact") {
      document
        .querySelector(`[data-${id}]`)
        .scrollIntoView({ behavior: "smooth" });
      id !== "me" && setNavState("pop");
      contactState && setContactState(false);
    }
    setNav(false);
  };

  const handleContact = (e) => {
    handleClick(e);
    const value = !contactState;
    setContactState(value);
    if (value && window.scrollY > 20) setNavState("unpop");
    else setNavState("pop");
  };

  const NavPop = () => {
    ref.current[0].classList.remove("unpop");
    ref.current[0].classList.add("pop");
  };

  const NavUnpop = () => {
    ref.current[0].classList.remove("pop");
    ref.current[0].classList.add("unpop");
  };

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (ref.current[0]) {
        if (window.scrollY > 20) {
          NavPop();
        } else {
          NavUnpop();
        }
      }
    });
  });

  return (
    <div>
      {screen <= 900 && (
        <div className="nav-open flex items-center cursor-default">
          <HiMenu
            className="cursor-pointer"
            onClick={() => {
              setNav(!nav);
            }}
          ></HiMenu>
          {screen <= 900 && (
            <span className="m-5">
              <p
                className="glow-text hello glow-1 active:scale-50"
                id="me"
                onClick={handleClick}
              >
                ALISTER XAVIER
              </p>
            </span>
          )}
        </div>
      )}
      <nav
        className={`navigation-panel flex items-center ${navState} ${
          nav && "active"
        }`}
        onClick={() => {
          setNav(false);
        }}
        ref={(elem) => (ref.current[0] = elem)}
        data-navparent
      >
        {screen >= 900 && (
          <span className="m-5">
            <p
              className="glow-text hello glow-1 cursor-pointer active:scale-95"
              id="me"
              onClick={handleClick}
            >
              ALISTER XAVIER
            </p>
          </span>
        )}
        <ul
          className="nav-wrapper ml-auto"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {screen < 900 && (
            <li
              onClick={() => {
                setNav(false);
              }}
            >
              <svg
                width="14"
                height="15"
                xmlns="http://www.w3.org/2000/svg"
                className="nav-close"
              >
                <path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" />
              </svg>
            </li>
          )}
          <li
            className="cursor-pointer text-center flex items-center md:justify-center"
            id="about-me"
            onMouseEnter={lightsOn}
            onMouseLeave={lightsOff}
            onClick={handleClick}
          >
            <p>About Me</p>
          </li>
          <li
            className="cursor-pointer text-center flex items-center md:justify-center"
            id="stack"
            onMouseEnter={lightsOn}
            onMouseLeave={lightsOff}
            onClick={handleClick}
          >
            <p>Stack</p>
          </li>
          <li
            className="cursor-pointer text-center flex items-center md:justify-center"
            id="projects"
            onMouseEnter={lightsOn}
            onMouseLeave={lightsOff}
            onClick={handleClick}
          >
            <p>Projects</p>
          </li>
          <li
            className="cursor-pointer text-center flex items-center md:justify-center"
            id="contact"
            onMouseEnter={lightsOn}
            onMouseLeave={lightsOff}
            onClick={handleContact}
          >
            <p>Contact Me</p>
          </li>
          <span className="slider"></span>
        </ul>
      </nav>
    </div>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
