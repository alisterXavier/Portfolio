import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import allp from "../components/projects.json";
import { AnimatePresence, motion } from "framer-motion";
// import SingleProject from "./Home/Single";

const AllProject = () => {
  const [selected, setSelected] = useState(null);
  const [activeItems, setActiveItems] = useState([]);
  const allprojects = useRef([]);

  const Routes = (e) => {
    const { id } = e.currentTarget;
    // this.$router.push({ path: `/allProjects/${id.replaceAll(/\s/g, '')}`, params: { id } });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          } else {
            entry.target.classList.remove("active");
            entry.target.removeAttribute("style");
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
              <motion.li
                layoutId={p.title}
                key={index}
                className={`project rounded`}
                id={p.title}
                onClick={() => {
                  setSelected(p);
                }}
                ref={(elem) => {
                  allprojects.current.splice(index, 1, elem);
                }}
              >
                <motion.div className="figure--wrapper">
                  <motion.figure className="figure relative">
                    <Image
                      src={p.img[0]}
                      alt=""
                      quality={100}
                      className="project-img"
                      layout="fill"
                      priority
                    />
                  </motion.figure>
                </motion.div>
              </motion.li>
            );
          })}
        </ul>
        {selected && (
          <AnimatePresence>
            <div>{selected.title}</div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default AllProject;
