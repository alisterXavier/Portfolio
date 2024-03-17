import React, { RefObject, useEffect, useRef } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import Image from 'next/image';
import { useSmallDeviceSize } from '@/Hooks/smalDeviceHook';
import Link from 'next/link';
import languages from '@a/data/displayStack.json';
import ParallaxText from './ParallexText';
import { useInView } from 'react-intersection-observer';

const Stack = ({
  section,
}: {
  section: (id: string) => void;
  navRef: RefObject<HTMLElement>;
}) => {
  const isSmallScreen = useSmallDeviceSize();
  const eachLanguage = useRef<Array<HTMLDivElement>>([]);
  const [stackRef, inView, entry] = useInView({ threshold: 0.2 });

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
      (document.querySelector('.content-wrapper') as HTMLElement).classList.add(
        'lighter-background'
      );
      (document.querySelector('.project-title') as HTMLElement).classList.add(
        'lighter-background'
      );

      eachLanguage.current.forEach((lang) => {
        (lang as HTMLElement).classList.add(
          'animate-in',
          'back-neu-shadow',
          'lighter-background'
        );
      });
    } else {
      (
        document.querySelector('.content-wrapper') as HTMLElement
      ).classList.remove('lighter-background');
      (
        document.querySelector('.project-title') as HTMLElement
      ).classList.remove('lighter-background');
      eachLanguage.current.forEach((lang) => {
        (lang as HTMLElement).classList.remove(
          'back-neu-shadow',
          'lighter-background'
        );
      });
    }
  }, [inView, section]);

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
        <div className="stack-container">
          {languages.map((l, index) => {
            return (
              <div
                key={index}
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Stack;
