import Image from "next/future/image";
import { forwardRef, useEffect, useRef } from "react";
import { FaAngleRight } from "react-icons/fa";

const Stack = forwardRef(({changeRoute, section}, ref) => {
  const stackRibbon = useRef();
  const eachLanguage = useRef([]);
  const stacks = useRef();
  const observer = useRef();
  const languages = [
    {
      lang: "Javascript",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png",
    },
    {
      lang: "Html",
      img: "https://www.w3.org/html/logo/downloads/HTML5_Badge_128.png",
    },
    {
      lang: "Css",
      img: "https://cdn1.iconfinder.com/data/icons/logotypes/32/badge-css-3-512.png",
    },
    {
      lang: "Node.js",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/885px-Node.js_logo.svg.png?20170401104355",
    },
    {
      lang: "Oracle Sql",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/768px-Oracle_logo.svg.png",
    },
    {
      lang: "React",
      img: "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-256.png",
    },
    {
      lang: "Vue.js",
      img: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png",
    },
    {
      lang: "MySQL",
      img: "https://www.mysql.com/common/logos/logo-mysql-170x115.png",
    },
  ];
  const StackScroll = useRef();

  const fadeRight = () => {
    document.addEventListener("scroll", (e) => {
      const right = StackScroll.current - window.scrollY;
      stackRibbon.current &&
        stackRibbon.current.style.setProperty("--Left", right);
    });
  };

  const languageOn = (e) => {
    const Pelement = e.currentTarget;
    Pelement.style.boxShadow = `0px 0px 2rem #0fa, inset 0px 0px 20px #0fa`;
    Pelement.style.border = `3px solid #0fa`;

    const text = Pelement.querySelector(".language-name");
    text.style.color = `#0fa`;
  };

  const languageOff = (e) => {
    const Pelement = e.currentTarget;
    Pelement.removeAttribute("style");
    const text = Pelement.querySelector(".language-name");
    text.removeAttribute("style");
  };

  const Navbar = () => {
    const navbar = ref.current[0];
    const active = navbar.querySelector("[data-active]");
    const navSections = navbar.querySelector("#stack");
    delete active?.dataset.active;
    navSections.dataset.active = true;
  };

  const ViewCompleteStack = () => {
    changeRoute("completedStack");
    observer.current.unobserve(stacks.current);
    document.querySelector(
      ".mainOverflow-container"
    ).style.transition = `filter 500ms ease`;
    document.querySelector(
      ".mainOverflow-container"
    ).style.filter = `brightness(0)`;
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        Array.from(entries).forEach((e) => {
          if (e.isIntersecting) {
            section("#stack")
            stackRibbon.current.classList.add("active");
            eachLanguage.current.forEach((lang) => {
              lang.classList.add("animate-in");
            });
          } else {
            if (stackRibbon.current) {
              stackRibbon.current.style.setProperty("--Left", 1000);
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.current.observe(stacks.current);
    StackScroll.current = Math.abs(
      document.getElementsByTagName("body")[0].getBoundingClientRect().top -
        stacks.current.getBoundingClientRect().top
    );
    fadeRight();
  }, []);

  return (
    <section
      className="stack view overflow-hidden"
      ref={stacks}
      id="Stack"
      data-stack
    >
      <div className="stack-title" ref={stackRibbon}>
        <h1 className="technologies text-5xl lg:text-6xl text-center">
          My Stack
        </h1>
      </div>
      <button
        className="more-projects flex items-center"
        onClick={ViewCompleteStack}
      >
        <p>Complete Stack</p>
        <FaAngleRight className="angle-right" size={25}></FaAngleRight>
      </button>
      <div className="stack-container-wrapper">
        <div className="stack-container">
          {languages.map((l, index) => {
            return (
              <div
                key={index}
                className="language-container-wrapper"
                ref={(elem) => {
                  eachLanguage.current.splice(index, 1, elem);
                }}
                onMouseEnter={languageOn}
                onMouseLeave={languageOff}
              >
                <div className="language-container">
                  <div className="img-container">
                    <figure className="language-img">
                      <Image
                        alt={l.img}
                        src={l.img}
                        width={100}
                        height={100}
                      ></Image>
                    </figure>
                  </div>
                  <p className="language-name">{l.lang}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

Stack.displayName = "Stack";
export default Stack;
