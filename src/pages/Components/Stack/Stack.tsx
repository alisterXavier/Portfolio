import React, { RefObject, useEffect, useRef } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import Image from 'next/image';
import { useSmallDeviceSize } from '@/Hooks/smalDeviceHook';
import Link from 'next/link';
import languages from '@a/data/displayStack.json';
import ParallaxText from './ParallexText';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

const animateStack = {
  initial: {
    opacity: 0,
    translate: '0% 50%',
  },

  visible: {
    opacity: 1,
    translate: '0% 0%',
    transition: {
      type:"tween"
    }
  },
};

const Stack = ({
  section,
}: {
  section: (id: string) => void;
  navRef: RefObject<HTMLElement>;
}) => {
  const isSmallScreen = useSmallDeviceSize();
  const eachLanguage = useRef<Array<HTMLDivElement>>([]);
  const [stackRef, inView, entry] = useInView({ threshold: 0.4 });
  const control = useAnimation();
  const ViewCompleteStack = () => {
    (
      document.querySelector('.main') as HTMLElement
    ).style.transition = `filter 500ms ease`;
    (
      document.querySelector('.main') as HTMLElement
    ).style.filter = `brightness(0)`;
  };

  useEffect(() => {
    if (inView) {
      section('#stack');
      control.start('visible');
      // add bg color 
      (document.querySelector('.content-wrapper') as HTMLElement).classList.add(
        'lighter-background'
      );

      eachLanguage.current.forEach((lang) => {
        (lang as HTMLElement).classList.add(
          'back-neu-shadow',
          'lighter-background'
        );
      });
    } else {
      if (entry?.boundingClientRect.y && entry.boundingClientRect.y >= 0)
        control.start('initial');
      // remove bg color 
      (
        document.querySelector('.content-wrapper') as HTMLElement
      ).classList.remove('lighter-background');
      eachLanguage.current.forEach((lang) => {
        (lang as HTMLElement).classList.remove(
          'back-neu-shadow',
          'lighter-background'
        );
      });
    }
  }, [control, entry, inView, section]);

  return (
    <section
      className="stack view font-bold"
      ref={stackRef}
      id="Stack"
      data-stack
    >
      <ParallaxText baseVelocity={5}>MY STACK</ParallaxText>
      {!isSmallScreen && <ParallaxText baseVelocity={5}>MY STACK</ParallaxText>}
      <div className="more hello">
        <Link
          href="/Components/Stack/completeStack"
          className="cursor-pointer relative neon text-xl"
          onClick={ViewCompleteStack}
        >
          COMPLETE STACK
          <FaAngleRight className="angle-right" size={25}></FaAngleRight>
        </Link>
      </div>
      <div className="stack-container-wrapper">
        <motion.div
          className="stack-container"
          animate={control}
          transition={{
            delayChildren: 0.2,
            staggerChildren: 0.1,
          }}
        >
          {languages.map((l, index) => {
            return (
              <motion.div
                key={index}
                variants={animateStack}
                className="language-container-wrapper half"
                ref={(elem) => {
                  if (elem !== null)
                    eachLanguage.current.splice(index, 1, elem);
                }}

                // onMouseMove={parallexImage}
                // onMouseLeave={parallexImageRemove}
              >
                <div
                  className="language-container"
                  onMouseEnter={(e) => {
                    e.currentTarget.classList.add('neu-shadow');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.classList.remove('neu-shadow');
                  }}
                >
                  <div className="img-container">
                    <figure className="language-img relative">
                      <Image
                        className=""
                        alt={l.img}
                        src={l.img}
                        width={100}
                        height={100}
                      ></Image>
                    </figure>
                  </div>
                  <p className="language-name">{l.lang}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
export default Stack;
