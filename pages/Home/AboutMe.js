import { forwardRef, useContext, useEffect, useRef } from "react";
import { ContactApi, Nav, Screen } from "../_app";

const AboutMe = forwardRef((props, ref) => {
  const [contactState, setContactState] = useContext(ContactApi);
  const [navState, setNavState] = useContext(Nav);
  const screen = useContext(Screen);
  const about = useRef();
  const innerAbout = useRef();
  const observer = useRef();
  const navRef = useRef();

  const Parallex = (event) => {
    const x = ((event.pageX - 500) * -1) / 15;
    const y = ((event.pageY - 500) * -1) / 15;

    innerAbout.current.style.setProperty("--x", x);
    innerAbout.current.style.setProperty("--y", y);
  };

  const nav = (e) => {
    const text = e.target.text.trim();

    if (text === "Contact me") {
      setContactState(true);
      setNavState("unpop");
    } else {
      document
        .querySelector(`[data-${text}]`)
        .scrollIntoView({ behavior: "smooth" });
    }
  };

  navRef.current = () => {
    ``;
    const navbar = ref.current[0];
    const active = navbar.querySelector("[data-active]");
    const navSections = navbar.querySelector("#about-me");
    delete active.dataset.active;
    navSections.dataset.active = true;
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navRef.current();
            entry.target
              .querySelector(".about-name")
              .classList.add("animate-in");
          }
        });
      },
      {
        threshold: 0.6,
      }
    );
    observer.current.observe(about.current);
  }, []);

  return (
    <section
      className="about flex justify-center items-center text-start"
      id="About-Me"
      ref={about}
      data-About-Me
      onMouseMove={(e) => {
        screen >= 900 && Parallex(e);
      }}
    >
      <div className="about-wrapper relative" ref={innerAbout}>
        <div className="about-name">
          <h1 className="text-3xl lg:text-7xl flex justify-evenly">
            <p className="">Hi, I&apos;m</p>
            <p className="">Alister</p> 
            <p className="">Xavier,</p>
          </h1>
        </div>
        <p className="about-about text-sm lg:text-2xl p-5 lg:p-10">
          A web developer and tireless seeker of knowledge. As a well-rounded
          user and developer, I aim to make sure that systems interfaces,
          languages, and graphics are human-friendly, aesthetically pleasing,
          clear, on-brand, and usable. Check out my
          <span className="text-orange-500 cursor-pointer">
            <a onClick={nav}> stack</a>
          </span>{" "}
          for a clear view of the technologies and languages I have used and
          <span className="text-orange-500 cursor-pointer">
            <a onClick={nav}> projects</a>
          </span>{" "}
          where I used some of them. Looking forward to doing business with you.
          <span className="text-orange-500 cursor-pointer block">
            <a onClick={nav}>Contact me </a>
          </span>
        </p>
      </div>
    </section>
  );
});

AboutMe.displayName = "AboutMe";
export default AboutMe;
