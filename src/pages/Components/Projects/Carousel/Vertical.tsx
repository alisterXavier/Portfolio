import { motion } from 'framer-motion';
import Image from 'next/image';
import projects from '@a/data/projects.json';
import { VerticalProjectCarouselType } from '@/types/types';
import { useEffect, useRef, useState } from 'react';

const VerticalProjectCarousel = ({
  filter,
  setSelectedProject,
  unBlurr,
  blurEffect,
}: VerticalProjectCarouselType) => {
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  useEffect(() => {
    const element = carouselContainerRef.current;

    const handleMouseMove = (event: MouseEvent) => {
      if (!isScrolling) return;
      if (element) {
        const containerRect = element.getBoundingClientRect();
        const deltaY = event.clientY - containerRect.top;

        const maxScrollTop = element.scrollHeight - element.clientHeight;
        const newScrollTop = Math.min(Math.max(0, deltaY), maxScrollTop);

        element.scrollTop = newScrollTop;
      }
    };

    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (element) {
        element.addEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isScrolling]);

  return (
    <div className="w-[85%] h-full overflow-hidden" onMouseLeave={unBlurr}>
      <div
        className="flex flex-wrap w-full h-full overflow-y-scroll pr-[17px] box-content"
        onMouseEnter={() => {
          setIsScrolling(true);
        }}
        onMouseLeave={() => {
          setIsScrolling(false);
        }}
        ref={carouselContainerRef}
      >
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

export default VerticalProjectCarousel;
