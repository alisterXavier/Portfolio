import { Timeline } from 'primereact/timeline';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const itemsList = [
  {
    title: 'Test',
    desc: 'asdas',
    period: 2020,
    position: 'right',
  },
  {
    title: 'Test',
    desc: 'asdas',
    period: 2020,
    position: 'right',
  },
  {
    title: 'Test',
    desc: 'asdas',
    period: 2020,
    position: 'right',
  },
  {
    title: 'Test',
    desc: 'asdas',
    period: 2020,
    position: 'right',
  },
];

const TimelineComp = () => {
  const timelineRef = useRef<HTMLElement>(null);
  const timelineitemRef = useRef<HTMLDivElement[]>([]);
  const timelineitemObserver = useRef<IntersectionObserver | null>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
  });

  const y = useTransform(scrollYProgress, [0, 0.7, 0.9, 1], [0, 450, 450, 600]);
  const springY = useSpring(y, { stiffness: 200, damping: 90, duration: 1000 });

  useEffect(() => {
    timelineitemObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((i) => {
          if (i.isIntersecting) {
            i.target.querySelector('.timeline-item')?.classList.add('fade-in');
          } else {
            i.target
              .querySelector('.timeline-item')
              ?.classList.remove('fade-in');
          }
        });
      },
      {
        threshold: 1,
      }
    );
    if (timelineitemRef.current) {
      timelineitemRef.current.map((i) => {
        timelineitemObserver.current?.observe(i);
      });
    }
  });

  return (
    <section
      className="neon mb-20 min-h-screen h-fit view flex flex-col items-center"
      ref={timelineRef}
    >
      <h2 className="project-glitch h-[80px] my-0 mx-auto text-5xl lg:text-6xl hello neon">
        TIMELINE
      </h2>
      <div className=" w-[60%] mt-20 relative flex overflow-hidden">
        <motion.div
          className="circle absolute top-[0%] left-[50%] w-[20px] h-[20px] rounded-[100%] bg-[var(--neon)]"
          style={{
            translateX: '-50%',
            translateY: springY,
          }}
        ></motion.div>
        <Timeline
          value={itemsList}
          align="alternate"
          color="neon"
          
          content={(item, index) => (
            <motion.div
              // key={index + item.period}
              className={`h-[200px]`}
              ref={(elem) => {
                if (elem !== null)
                  timelineitemRef.current.splice(index, 1, elem);
              }}
            >
              <div
                className={`border p-5 rounded
                timeline-item
                 ${
                   index % 2 != 0 ? 'timeline-item-left' : 'timeline-item-right'
                 }`}
              >
                <p>{item.title}</p>
              </div>
            </motion.div>
          )}
          className="w-[70%] md:w-20rem "
        />
      </div>
    </section>
  );
};

export default TimelineComp;
