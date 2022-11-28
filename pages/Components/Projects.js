import Image from "next/image";
import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import mernApp from "/public/assets/blaaApp.png";
import netflixClone from "/public/assets/netflix.png";
import eCommerce from "/public/assets/e-commerce.png";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { GoMarkGithub, GoLink } from "react-icons/go";
import { Screen } from "../_app";

const carouselProjects = [
  {
    img: netflixClone,
    title: "Netflix Clone",
    para: "ReactJS, Css, TMDB Api",
    git_link: "https://github.com/Alister153/NetflixClone.git",
    app_link: "https://netflix-clone-qwerty.vercel.app/",
  },
  {
    img: mernApp,
    title: "Mern App",
    para: "MongoDB, ExpressJS, ReactJS, NodeJS, Css",
    git_link: "https://github.com/Alister153/blaa-app",
    app_link: "https://blaa-app.herokuapp.com/",
  },
  {
    img: eCommerce,
    title: "e-commerce App",
    para: "ReactJS, Css",
    git_link: "https://github.com/Alister153/e-commerce",
    app_link: "https://e-commerce-opal-gamma.vercel.app/",
  },
];

const Projects = forwardRef(({ changeRoute, section, setAllProjectVis }, ref) => {
  const slides = useRef();
  const carousel = useRef();
  const projectRibbon = useRef();
  const eachProject = useRef([]);
  const projects = useRef();
  const projectsScroll = useRef();
  const screen = useContext(Screen);
  const observer = useRef();
  const waveObserver = useRef();
  const wave = useRef();

  const fadeLeft = () => {
    document.addEventListener("scroll", (e) => {
      const left = window.scrollY - projectsScroll.current;
      document
        .querySelector(".project-title")
        ?.style.setProperty("--Left", left);
    });
  };

  const btnClick = (btn) => {
    const activeSlide = slides.current.querySelector("[data-active='true']");
    const PrevSlide = slides.current.querySelector("[data-prev='true']");
    const NextSlide = slides.current.querySelector("[data-next='true']");

    var activeNewIndex = [...slides.current.children].indexOf(activeSlide);
    var prevNewIndex = [...slides.current.children].indexOf(PrevSlide);
    var nextNewIndex = [...slides.current.children].indexOf(NextSlide);

    if (prevNewIndex >= slides.current.children.length) prevNewIndex = 0;

    const obj = {
      1: () => {
        slides.current.children[activeNewIndex].dataset.prev = true;
        slides.current.children[prevNewIndex].dataset.next = true;
        slides.current.children[nextNewIndex].dataset.active = true;
      },
      2: () => {
        slides.current.children[nextNewIndex].dataset.prev = true;
        slides.current.children[prevNewIndex].dataset.active = true;
        slides.current.children[activeNewIndex].dataset.next = true;
      },
    };

    obj[btn]();

    delete activeSlide.dataset.active;
    delete PrevSlide.dataset.prev;
    delete NextSlide.dataset.next;
  };

  const ViewAllProjects = () => {
    setAllProjectVis(true)
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            carousel.current.classList.add("active");
            carousel.current.classList.add("parallex");
            projects.current.classList.add("active")            
            eachProject.current.forEach((project) => {
              project.classList.add("active");
            });
            setTimeout(() => {
              eachProject.current.forEach((project) => {
                project.classList.remove("active");
                project.classList.remove("animate-in");
              });
            }, 600);
            projectRibbon.current.classList.add("active");
            ref.current[1].style.opacity = 1;
            section("#projects");
          } else {
            if (ref.current[1]) {
              ref.current[1].style.opacity = 0;
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    waveObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            wave?.current.classList.add("fixed");
          } else wave?.current?.classList.remove("fixed");
        });
      },
      {
        threshold: 0.3,
      }
    );

    observer.current.observe(projects.current);
    waveObserver.current.observe(projects.current);

    projectsScroll.current = Math.abs(
      document.getElementsByTagName("body")[0].getBoundingClientRect().top -
        projects.current.getBoundingClientRect().top
    );
    fadeLeft();
  }, []);

  return (
    <section
      className="projects view relative z-10 overflow-hidden"
      ref={projects}
      id="Projects"
      data-projects
    >
      <div
        className="w-full flex flex-col items-center justify-center"
        style={{ width: "100%", height: "100vh" }}
      >
        <div className="project-title my-5" ref={projectRibbon}>
          <div className="">
            <h2 className="project-glitch my-0 mx-auto text-5xl lg:text-6xl">
              PROJECTS
            </h2>
          </div>
        </div>
        <div
          className="carousel-all projects--carousel"
          ref={carousel}
          data-parent
        >
          <ul className="w-full h-full" data-slides ref={slides}>
            {carouselProjects.map((cp, index) => {
              return (
                <li
                  className="project animate-in"
                  key={index}
                  data-active={index == 0}
                  data-next={index === 1}
                  data-prev={index === 2}
                  ref={(elem) => {
                    eachProject.current.splice(index, 1, elem);
                  }}
                >
                  <figure className="project-img">
                    <Image alt={cp.img} src={cp.img} layout="fill" priority />
                  </figure>
                  <div className="details">
                    <h2 className="text-xl lg:text-3xl my-2">{cp.title}</h2>
                    <p className="description text-sm my-2">{cp.para}</p>
                    <span className="links-wrapper my-2 flex justify-evenly">
                      <a
                        href={cp.git_link}
                        rel="noreferrer"
                        target="_blank"
                        className="link"
                        id="github"
                      >
                        <GoMarkGithub size={50}></GoMarkGithub>
                      </a>
                      <a
                        href={cp.app_link}
                        className="link"
                        rel="noreferrer"
                        target="_blank"
                        id="link"
                      >
                        <GoLink size={50}></GoLink>
                      </a>
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>

          {screen > 500 && (
            <div className="next-btn">
              <FaAngleLeft
                onClick={() => {
                  btnClick(1);
                }}
                size={40}
                id="prev-btn"
              ></FaAngleLeft>
              <FaAngleRight
                onClick={() => {
                  btnClick(2);
                }}
                size={40}
                id="next-btn"
              ></FaAngleRight>
            </div>
          )}
        </div>
        <button
          className="more-projects flex items-center"
          onClick={ViewAllProjects}
        >
          <p>More Projects</p>
          <FaAngleRight className="angle-right" size={25}></FaAngleRight>
        </button>
      </div>
      {/* <div className="w-full flex items-center justify-start px-2 mt-3 lg-mt-0">
        {noDep.map((n) => (
          <div
            key={n.name}
            className="no-deploy-container flex border rounded glow-border w-fit p-3"
            onMouseEnter={(e) => {
              e.currentTarget.classList.add("glow-shadow");
            }}
            onMouseLeave={(e) => {
              e.target.classList.remove("glow-shadow");
            }}
          >
            <div className="projects-no-deploy glow-text mt-10">
              <div className="">
                <h1 className="text-3xl font-semibold">{n.name}</h1>
              </div>
              <div>
                <p className="my-3">{n.para}</p>
                <button className="text-black">
                  <a href={n.git_link} target="_blank_">
                    Github
                  </a>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div> */}
      <svg width="100%" className="wave" ref={wave}>
        <path
          fill="black"
          d="
          M0 67
          C 273,183
            822,-40
            1920.00,106 

          V 359 
          H 0 
          V 67
          Z"
        >
          <animate
            repeatCount="indefinite"
            attributeName="d"
            dur="15s"
            values="
            M0 77 
            C 473,283
              822,-40
              1920,116 

            V 359 
            H 0 
            V 67 
            Z; 

            M0 77 
            C 473,-40
              1222,283
              1920,136 

            V 359 
            H 0 
            V 67 
            Z; 

            M0 77 
            C 973,260
              1722,-53
              1920,120 

            V 359 
            H 0 
            V 67 
            Z; 

            M0 77 
            C 473,283
              822,-40
              1920,116 

            V 359 
            H 0 
            V 67 
            Z
            "
          ></animate>
        </path>
      </svg>
    </section>
  );
});

Projects.displayName = Projects;

export default Projects;
