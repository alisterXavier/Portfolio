import Image from "next/image";
import { useContext, useEffect, useRef } from "react";
import mernApp from "/public/assets/abc.png";
import netflixClone from "/public/assets/netflix-clone.png";
import eCommerce from "/public/assets/e-commerce.png";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { GoMarkGithub, GoLink } from "react-icons/go";
import { Screen } from "../_app";

const Projects = ({ changeRoute, canvasElem }) => {
  const slides = useRef();
  const carousel = useRef();
  const projectRibbon = useRef();
  const eachProject = useRef([]);
  const projects = useRef();
  const projectsScroll = useRef();
  const screen = useContext(Screen);
  const observer = useRef();
  const mount = useRef();
  const carouselProjects = [
    {
      img: mernApp,
      title: "Mern App",
      para: "Responsive MERN App",
      git_link: "https://github.com/Alister153/blaa-app",
      app_link: "https://blaa-app.herokuapp.com/",
    },
    {
      img: netflixClone,
      title: "Netflix Clone",
      para: "Netflix clone made with ReactJS on the frontend and NodeJS (express, firebase) on the backend",
      git_link: "https://github.com/Alister153/NetflixClone.git",
      app_link: "https://netflix-clone-qwerty.vercel.app/",
    },
    {
      img: eCommerce,
      title: "e-commerce App",
      para: "e-commerce App made with ReactJS",
      git_link: "https://github.com/Alister153/e-commerce",
      app_link: "https://e-commerce-opal-gamma.vercel.app/",
    },
  ];

  const fadeLeft = () => {
    document.addEventListener("scroll", (e) => {
      const left = window.scrollY - projectsScroll.current;
      document
        .querySelector(".project-title")
        ?.style.setProperty("--Left", left);
    });
  };

  const nextBtn = () => {
    const activeSlide = slides.current.querySelector("[data-active='true']");
    const PrevSlide = slides.current.querySelector("[data-prev='true']");
    const NextSlide = slides.current.querySelector("[data-next='true']");

    var activeNewIndex = [...slides.current.children].indexOf(activeSlide);
    var prevNewIndex = [...slides.current.children].indexOf(PrevSlide);
    var nextNewIndex = [...slides.current.children].indexOf(NextSlide);

    if (prevNewIndex >= slides.current.children.length) prevNewIndex = 0;

    slides.current.children[activeNewIndex].dataset.next = true;
    slides.current.children[prevNewIndex].dataset.active = true;
    slides.current.children[nextNewIndex].dataset.prev = true;

    delete activeSlide.dataset.active;
    delete PrevSlide.dataset.prev;
    delete NextSlide.dataset.next;
  };

  const prevBtn = () => {
    const activeSlide = slides.current.querySelector("[data-active='true']");
    const PrevSlide = slides.current.querySelector("[data-prev='true']");
    const NextSlide = slides.current.querySelector("[data-next='true']");

    var activeNewIndex = [...slides.current.children].indexOf(activeSlide);
    var prevNewIndex = [...slides.current.children].indexOf(PrevSlide);
    var nextNewIndex = [...slides.current.children].indexOf(NextSlide);

    if (prevNewIndex >= slides.current.children.length) prevNewIndex = 0;

    slides.current.children[activeNewIndex].dataset.prev = true;
    slides.current.children[prevNewIndex].dataset.next = true;
    slides.current.children[nextNewIndex].dataset.active = true;

    delete activeSlide.dataset.active;
    delete PrevSlide.dataset.prev;
    delete NextSlide.dataset.next;
  };

  const Navbar = () => {
    const id = document.querySelector("[data-projects]");
    const navbar = document.querySelector(".navigation-panel");
    const active = navbar.querySelector("[data-active]");
    const navSections = navbar.querySelector("#projects");
    delete active.dataset.active;
    navSections.dataset.active = true;
  };

  const ViewAllProjects = () => {
    changeRoute("allProjects");
    observer.current.unobserve(projects.current);
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
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            carousel.current.classList.add("active");
            carousel.current.classList.add("parallex");
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
            canvasElem.current.style.opacity = 1;
            Navbar();
          } else {
            if (canvasElem.current) {
              canvasElem.current.style.opacity = 0;
            }
          }
        });
      },
      {
        threshold: 0.6,
      }
    );
    observer.current.observe(projects.current);
    projectsScroll.current = Math.abs(
      document.getElementsByTagName("body")[0].getBoundingClientRect().top -
        projects.current.getBoundingClientRect().top
    );
    fadeLeft();
  }, []);

  return (
    <section
      className="projects view relative z-10"
      ref={projects}
      id="Projects"
      data-projects
    >
      <div className="project-title" ref={projectRibbon}>
        <div className="">
          <h2 className="project-glitch my-0 mx-auto text-5xl lg:text-6xl">
            PROJECTS
          </h2>
        </div>
      </div>
      <button
        className="more-projects flex items-center"
        onClick={ViewAllProjects}
      >
        <p>More Projects</p>
        <FaAngleRight></FaAngleRight>
      </button>
      <div
        className="carousel-all projects--carousel"
        ref={carousel}
        data-parent
      >
        <ul className="" data-slides ref={slides}>
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
                  <Image alt={cp.img} src={cp.img} />
                </figure>
                <div className="details">
                  <h2 className="text-xl lg:text-3xl my-2">{cp.title}</h2>
                  <p className="description my-2">{cp.para}</p>
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
              onClick={prevBtn}
              size={40}
              id="prev-btn"
            ></FaAngleLeft>
            <FaAngleRight
              onClick={nextBtn}
              size={40}
              id="next-btn"
            ></FaAngleRight>
          </div>
        )}
      </div>
      {screen > 500 && (
        <svg width="100%" className="wave">
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
      )}
    </section>
  );
};

export default Projects;
