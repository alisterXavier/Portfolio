import Image from "next/image";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/bundle";
import {
  Mousewheel,
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { BiArrowBack } from "react-icons/bi";

const SingleProject = ({ projectSelected, setProjectSelected }) => {
  if (projectSelected)
    return (
      <motion.div
        className="selected active bg-black absolute top-0 left-0"
        layoutId={projectSelected.title}
      >
        <BiArrowBack
          className="absolute z-10 top-5 left-5 cursor-pointer glow-text"
          size={30}
          onClick={() => {
            setProjectSelected();
          }}
        ></BiArrowBack>
        <div className="selected-wrapper">
          <figure className="selected-figure mx-auto border">
            {projectSelected.img.length > 0 ? (
              <Swiper
                spaceBetween={30}
                effect={"fade"}
                pagination={{
                  clickable: true,
                }}
                mousewheel={true}
                autoplay={{
                  delay: 1500,
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
                {projectSelected.img.map((i, index) => {
                  return (
                    <SwiperSlide key={index}>
                      {i !== "coming-soon" ? (
                        <Image
                          src={i}
                          alt=""
                          quality={100}
                          className="selected-project-img lg:rounded"
                          layout="fill"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-black">
                          <p className="text-5xl glow-text glow hello">
                            COMING SOON
                          </p>
                        </div>
                      )}
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : (
              <div className="glow glow-text w-full h-full flex justify-center items-center">
                <p className="w-fit text-3xl">No image</p>
              </div>
            )}
          </figure>
          <div
            className="selected-project my-5"
            layoutId={projectSelected.title}
          >
            <h1 className="text-3xl">{projectSelected.title}</h1>
            <p>{projectSelected.para}</p>
            <div className="flex justify-between">
              <a
                className="text-teal-300 hover:underline"
                href={projectSelected.git_link}
              >
                Github
              </a>
              <a
                className={`text-lime-400 hover:underline ${
                  !projectSelected.app_link && "hidden"
                }`}
                href={projectSelected.app_link}
              >
                App
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    );
};

export default SingleProject;
