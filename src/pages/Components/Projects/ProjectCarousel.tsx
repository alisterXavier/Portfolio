import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import projects from "@a/data/projects.json";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { SelectedProjectInterface } from "@/types/types";
import { Autoplay, Mousewheel, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const ProjectCarousel = ({
  selectedProject,
  setSelectedProject,
}: SelectedProjectInterface) => {
  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    swiperRef.current && selectedProject
      ? swiperRef.current?.swiper.autoplay.stop()
      : swiperRef.current?.swiper.autoplay.start();
  }, [selectedProject]);

  return (
    <>
      <div className="carousel">
        <Swiper
          ref={swiperRef}
          mousewheel={true}
          autoplay={{
            delay: 1800,
          }}
          modules={[Mousewheel, Autoplay, Navigation]}
          breakpoints={{
            200: {
              width: 300,
              slidesPerView: 1,
              spaceBetween: 40,
            },
            800: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          className="mySwiper"
        >
          {projects.map((project, index) => {
            return (
              <SwiperSlide
                key={index}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedProject(project);
                }}
              >
                <motion.div
                  onMouseEnter={() => {
                    swiperRef.current?.swiper.autoplay.stop();
                  }}
                  onMouseLeave={() => {
                    !selectedProject &&
                      swiperRef.current?.swiper.autoplay.start();
                  }}
                  className="project-item text-white"
                  layoutId={project.title}
                >
                  <figure className="relative">
                    {!project.img ? (
                      <div className="w-full h-full flex items-center justify-center bg-black">
                        <p className="text-5xl neon glow hello">NO IMAGE</p>
                      </div>
                    ) : (
                      <Image
                        fill
                        quality={100}
                        src={project.img[0]}
                        alt={project.title}
                        sizes="100%"
                      />
                    )}
                  </figure>
                  <div>
                    <div className="project-detail p-2 Omnes">
                      <h1 className="text-lg font-semibold">{project.title}</h1>
                      <p className="text-sm mt-2">{project.stack}</p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default ProjectCarousel;
