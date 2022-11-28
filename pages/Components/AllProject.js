import SingleProject from "./Single";
import allp from "@/assets/data/projects.json";
import Image from "next/image";
import { BiArrowBack } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

const AllProjects = ({allProjectsVis, setAllProjectVis}) => {
  const allProjectRef = useRef();
  const [projectSelected, setProjectSelected] = useState();
  
  return (
    <div className={`all-projects-wrapper ${allProjectsVis && "active"}`}>
      <BiArrowBack
        className="absolute z-10 top-5 left-5 cursor-pointer glow-text"
        size={30}
        onClick={(e) => {
          allProjectRef.current.classList.add("fade-out");
          setTimeout(() => {
            setTimeout(() => {
              allProjectRef.current.classList.remove("fade-out");
            }, 1000);
            setAllProjectVis(false);
          }, 1000);
        }}
      ></BiArrowBack>
      <div ref={allProjectRef} className={`all-projects lg:ml-20 lg:mt-10`}>
        {allp.map((p, index) => {
          return (
            <motion.div key={index} className="">
              <motion.div className="option-title my-3 lg:my-5 cursor-pointer text-md lg:text-3xl w-fit">
                <p
                  className="w-fit"
                  onClick={() => {
                    setProjectSelected(p);
                  }}
                >
                  {p.title}
                </p>
              </motion.div>
              <motion.figure
                layoutId={p.title}
                id={p.title}
                className="absolute"
              >
                <Image
                  src={p.img[0]}
                  className="absolute top-0 left-0 right-0 bottom-0"
                  width={500}
                  height={250}
                />
              </motion.figure>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {projectSelected && (
          <SingleProject
            projectSelected={projectSelected}
            setProjectSelected={setProjectSelected}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllProjects;
