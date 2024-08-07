import Image from 'next/image';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/bundle';
import {
  Mousewheel,
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BiArrowBack } from 'react-icons/bi';
import { SelectedProjectInterface } from '@/types/types';
import { useSmallDeviceSize } from '@/Hooks/smalDeviceHook';
import { useRef } from 'react';

const Project = ({
  selectedProject,
  setSelectedProject,
}: SelectedProjectInterface) => {
  const isSmallScreen = useSmallDeviceSize();
  const selected = useRef<HTMLDivElement>(null);

  const flexD = ['flex-row', 'flex-row-reverse'];
  return (
    <motion.div
      className="selected-wrapper active bg-black fixed top-0 left-0 text-white"
      layoutId={selectedProject?.title}
    >
      <BiArrowBack
        className="absolute z-10 top-5 left-5 cursor-pointer neon"
        size={30}
        onClick={() => {
          selected.current?.classList.remove('selected');
          selected.current?.classList.add('disselected');
          setTimeout(() => {
            setSelectedProject(undefined);
          }, 600);
        }}
      ></BiArrowBack>
      <div
        className={`selected flex w-[80%] ${
          isSmallScreen
            ? 'flex-col'
            : flexD[Math.floor(Math.random() * flexD.length)]
        }`}
        ref={selected}
      >
        <figure className="selected-figure mx-auto w-full">
          {selectedProject?.img?.length && selectedProject?.img.length > 0 ? (
            <Swiper
              spaceBetween={30}
              effect={'fade'}
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
              {selectedProject.img.map((i, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Image
                      src={i}
                      alt=""
                      quality={100}
                      className="selected-project-img lg:rounded"
                      fill
                      sizes="100%"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <div className="glow neon w-full h-full flex justify-center bg-black items-center">
              <p className="w-fit text-3xl hello">NO IMAGE</p>
            </div>
          )}
        </figure>
        <div className="selected-project lg:mx-5 Omnes lg:w-[50%]">
          <div className="my-3">
            <h1 className="text-2xl lg:text-3xl flex justify-between items-end">
              {selectedProject?.title}{' '}
              {!selectedProject?.completed && <span className='text-[var(--neon)] text-sm'>In Progress</span>}
            </h1>
            <p className="text-sm lg:text-base">
              {selectedProject?.stack.map(
                (i, index) =>
                  `${i}${index < selectedProject?.stack.length - 1 ? ',' : ''} `
              )}
            </p>
          </div>
          <p className="text-sm lg:text-base my-2">{selectedProject?.desc}</p>
          <div className="flex justify-between">
            <a
              className="text-teal-300 hover:underline"
              href={selectedProject?.git_link}
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
            <a
              className={`text-lime-400 hover:underline ${
                !selectedProject?.app_link && 'hidden'
              }`}
              href={selectedProject?.app_link}
              target="_blank"
              rel="noreferrer"
            >
              App
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Project;
