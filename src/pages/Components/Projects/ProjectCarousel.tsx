import { motion } from 'framer-motion';
import Image from 'next/image';
import projects from '@a/data/projects.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  AddFilter,
  SelectedProjectInterface,
  VerticalProjectCarouselType,
} from '@/types/types';
import { Autoplay, Mousewheel, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { AiOutlineWarning } from 'react-icons/ai';

export const HorizontalProjectCarousel = ({
  filter,
  setSelectedProject,
}: AddFilter) => {
  return (
    <>
      <Swiper
        mousewheel={true}
        autoplay={{
          delay: 1800,
        }}
        modules={[Mousewheel, Autoplay, Navigation]}
        breakpoints={{
          200: {
            width: 350,
            slidesPerView: 1,
            spaceBetween: 40,
          },
          800: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1024: {
            width: 1350,
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        className="mySwiper transition-all duration-75"
      >
        {projects
          .filter((item) => {
            return filter === null ? item.stack : item.stack.includes(filter);
          })
          .map((project, index) => {
            return (
              <SwiperSlide
                key={`${project.title}${index}`}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedProject(project);
                }}
              >
                <motion.div
                  className="project-item text-white"
                  layoutId={project.title}
                >
                  <figure className="relative">
                    {project.img && project.img.length > 0 ? (
                      <Image
                        object-fit="cover"
                        quality={100}
                        sizes="100%"
                        src={project.img[0]}
                        alt={project.title}
                        width={100}
                        height={100}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-black">
                        <p className="text-5xl neon glow hello">NO IMAGE</p>
                      </div>
                    )}
                  </figure>
                  <div>
                    <div className="project-detail p-2 Omnes">
                      <h1 className="text-lg font-semibold flex">
                        {project.title}
                        {!project.completed && (
                          <AiOutlineWarning
                            size={25}
                            className="ml-5"
                            color="var(--neon)"
                          />
                        )}
                      </h1>
                      <p className="text-sm mt-2">
                        {project.stack.map(
                          (i, index) =>
                            `${i}${
                              index < project.stack.length - 1 ? ',' : ''
                            } `
                        )}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
};

export const VerticalProjectCarousel = ({
  filter,
  setSelectedProject,
  unBlurr,
  blurEffect,
}: VerticalProjectCarouselType) => {
  return (
    <div className="w-[85%] h-full overflow-hidden" onMouseLeave={unBlurr}>
      <div className="flex flex-wrap w-full h-full overflow-y-scroll pr-[17px] box-content">
        {projects
          .filter((item) => {
            return filter === null ? item.stack : item.stack.includes(filter);
          })
          .map((p, index) => {
            return (
              <motion.div
                key={index}
                layoutId={p.title}
                className={`relative overflow-hidden ${
                  index === 0 && 'z-10'
                } project-card cursor-pointer`}
                onClick={() => {
                  setSelectedProject(p);
                }}
                onMouseMove={blurEffect}
              >
                <figure className={`relative w-[400px] h-[200px]`}>
                  {p.img && p.img.length > 0 ? (
                    <Image fill sizes="100%" src={p.img[0]} alt={p.title} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-black">
                      <p className="text-5xl neon glow hello">NO IMAGE</p>
                    </div>
                  )}
                </figure>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
};
