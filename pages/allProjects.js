import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import allp from "../components/projects.json";
import { GoMarkGithub, GoLink } from "react-icons/go";
import { AnimatePresence, motion } from "framer-motion";
import "swiper/css";
import "swiper/css/bundle";
import { Mousewheel, Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

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
                  <motion.figure
                    className="figure relative"
                  >
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
                {/* <div className="details lg:w-full">
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
                </div> */}
              </motion.li>
            );
          })}
        </ul>
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed selected top-0"
              layoutId={selected.title}
              onClick={() => {
                setSelected(null);
              }}
            >
              <div
                className="selected-wrapper h-full lg:w-1/2 mx-auto flex justify-center items-center flex-col"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <figure className="selected-figure">
                  <Swiper
                    spaceBetween={30}
                    effect={"fade"}
                    pagination={{
                      clickable: true,
                    }}
                    mousewheel={true}
                    autoplay={{
                      delay: 1000,
                      disableOnInteraction: false,
                    }}
                    modules={[
                      Mousewheel,
                      Autoplay,
                      EffectFade,
                      Navigation,
                      Pagination,
                    ]}
                    className="mySwiper"
                  >
                    {selected.img.map((i, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <Image
                            src={i}
                            alt=""
                            quality={100}
                            className="selected-project-img"
                            layout="fill"
                            priority
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </figure>
                <div
                  className="selected-details w-full p-10"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <h2 className="text-xl lg:text-4xl my-2">{selected.title}</h2>
                  <p className="selected-description mt-3 mb-2 text-sm lg:text-lg">
                    {selected.para}
                  </p>
                  <span className="selected-links-wrapper lg:my-2 flex justify-between lg:w-1/5">
                    <a
                      href={selected.git_link}
                      rel="noreferrer"
                      target="_blank"
                      className="link text-blue-500 hover:underline decoration-double"
                      id="github"
                    >
                      GitHub
                    </a>
                    <a
                      href={selected.app_link}
                      rel="noreferrer"
                      className="link text-lime-400 hover:underline decoration-double"
                      target="_blank"
                      id="link"
                    >
                      App Link
                    </a>
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AllProject;
