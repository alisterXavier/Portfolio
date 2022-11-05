import { ImCross } from "react-icons/im";
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
import { Screen } from "../_app";
import { useContext } from "react";

const SingleProject = ({ selected, setSelected }) => {
  const screen = useContext(Screen);
  if (selected)
    return (
      <motion.div
        className="fixed selected top-0"
        layoutId={selected.title}
        onClick={() => {
          setSelected(null);
        }}
      >
        {screen > 900 && (
          <ImCross
            className="absolute right-60 top-10 cursor-pointer"
            style={{ fill: "rgba(255,255,255,.5)" }}
            size={30}
            onClick={() => {
              setSelected(null);
            }}
          ></ImCross>
        )}
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
              {selected.img.map((i, index) => {
                return (
                  <SwiperSlide key={index}>
                   {
                    i !== 'coming-soon' ?
                    <Image
                    src={i}
                    alt=""
                    quality={100}
                    className="selected-project-img lg:rounded"
                    layout="fill"
                    priority
                  />
                  :
                  <div className="w-full h-full flex items-center justify-center bg-black">
                      <p className="text-5xl glow-text glow hello">COMING SOON</p>
                    </div>
                   }
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </figure>
          <div
            className="selected-details w-full m-5 p-5"
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
    );
};

export default SingleProject;
