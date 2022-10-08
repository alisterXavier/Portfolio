import { useContext, useEffect, useRef, useState } from "react";
import { ContactApi, Screen } from "../_app";
import { HiMenu } from "react-icons/hi";

const Navbar = () => {
  const navigation = useRef();
  const screen = useContext(Screen);
  const [contactState, setContactState] = useContext(ContactApi);
  const [nav, setNav] = useState(false);

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
    const navbar = document.querySelector(".navigation-panel");
    const active = navbar.querySelector("[data-active]");

    delete active.dataset.active;
    e.currentTarget.dataset.active = true;

    if (id !== "contact" && id !== "about-me") {
      document
        .querySelector(`[data-${id}]`)
        .scrollIntoView({ behavior: "smooth" });
      setContactState(false);
    }
  };

  const handleContact = (e) => {
    handleClick(e);
    setNav(false);
    const value = !contactState;
    setContactState(value);
    if (value === true)
      navigation.current.style.animation = "nav-unpop 500ms forwards";
    else navigation.current.style.animation = "nav-pop 500ms forwards";
  };

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (navigation.current) {
        if (window.scrollY > 20) {
          navigation.current.classList.remove("unpop");
          navigation.current.classList.add("pop");
        } else {
          navigation.current.classList.remove("pop");
          navigation.current.removeAttribute("style");
          navigation.current.classList.add("unpop");
        }
      }
    });
  });

  return (
    <div>
      {screen < 900 && (
        <div
          className={`nav-open cursor-pointer`}
          onClick={() => {
            setNav(!nav);
          }}
        >
          <HiMenu></HiMenu>
        </div>
      )}
      <nav
        className={`navigation-panel flex justify-end items-center ${
          nav && "active"
        }`}
        onClick={() => {
          setNav(false);
        }}
        ref={navigation}
        data-navparent
      >
        <ul
          className="nav-wrapper"
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
            id="me"
            onMouseEnter={lightsOn}
            onMouseLeave={lightsOff}
            onClick={handleClick}
            data-active
          >
            <p>Me</p>
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
            id="about-me"
            onMouseEnter={lightsOn}
            onMouseLeave={lightsOff}
            onClick={handleClick}
          >
            <p>About Me</p>
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
};

export default Navbar;
