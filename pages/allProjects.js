import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import allp from "../components/projects.json";
import { GoMarkGithub, GoLink } from "react-icons/go";

const AllProject = () => {
  const [selected, setSelected] = useState();
  const [activeItems, setActiveItems] = useState([]);
  const allprojects = useRef([]);
  const Routes = (e) => {
    const { id } = e.currentTarget;
    // this.$router.push({ path: `/allProjects/${id.replaceAll(/\s/g, '')}`, params: { id } });
  };
  const SelectProject = (e) => {
    setSelected(e.target.closest(".project").id);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
              entry.target.classList.add('active')
          } else {
            entry.target.classList.remove('active')
          }
        });
      },
      {
        threshold: 0.1,
      }
    );
    allprojects.current.forEach((e) => {
      observer.observe(e);
    });
  }, []);

  return (
    <div className="overflow-div">
      <div className="all-projects relative">
        <div className="all-projects-title">
          <h1 className="text-center text-5xl lg:text-6xl glow flicker-effect-1">
            ALL PROJECTS
          </h1>
        </div>
        <ul className="" data-slides>
          {allp.map((p, index) => {
            return (
              <li
                key={index}
                className={`project rounded ${
                  (activeItems.includes(p.title)) ? "active" : ""
                } ${(selected === p.title) && "selected"}`}
                id={p.title}
                onClick={Routes}
                ref={(elem) => {
                  allprojects.current.splice(index, 1, elem);
                }}
              >
                <div className="figure--wrapper">
                  <figure onClick={SelectProject} className="figure relative">
                    <Image
                      src={p.img}
                      alt=""
                      quality={100}
                      className="project-img"
                      layout="fill"
                      priority
                    />
                  </figure>
                </div>
                <div className="details lg:w-full">
                  <h2 className="text-xl lg:text-4xl my-2">{p.title}</h2>
                  <p className="description mt-3 mb-2 text-sm lg:text-lg">
                    {p.para}
                  </p>
                  <span className="links-wrapper lg:my-2 flex justify-between w-1/5">
                    <a
                    href={p.git_link}
                    rel="noreferrer"
                    target="_blank"
                    className="link"
                    id="github"
                  >
                    <GoMarkGithub size={50}></GoMarkGithub>
                  </a>
                  <a
                    href={p.app_link}
                    rel="noreferrer"
                    className="link"
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
      </div>
    </div>
  );
};

export default AllProject;
