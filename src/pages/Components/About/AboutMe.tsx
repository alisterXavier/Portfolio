import { useSmallDeviceSize } from '@/Hooks/smalDeviceHook';
import { motion } from 'framer-motion';
import { RefObject, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const text =
  "I specialize in user-friendly systems, backend logic, databases, algorithms, and cloud infrastructure.\n Collaborating with designers, project managers, and QA engineers, I ensure smooth software delivery.\n Explore my tech stack for intriguing details about previous projects. I'm open to collaborations—let's connect!";

const defaultAnimtion = {
  hidden: {
    opacity: 0,
    y: 20,
    x: -10,
    transition: {
      type: 'spring',
      damping: 50,
      stiffness: 200,
    },
  },

  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: 'spring',
      damping: 50,
      stiffness: 200,
    },
  },
};
const AboutMe = ({
  section,
  navRef,
}: {
  section: (id: string) => void;
  navRef: RefObject<HTMLElement>;
}) => {
  const isSmallScreen = useSmallDeviceSize();
  const innerAbout = useRef<HTMLDivElement>(null);
  const [aboutRef, inView, entry] = useInView({
    threshold: 0.9,
  });

  const Parallex = (event: React.MouseEvent) => {
    const x = ((event.pageX - 500) * -1) / 15;
    const y = ((event.pageY - 500) * -1) / 15;

    innerAbout.current?.style.setProperty('--x', `${x}`);
    innerAbout.current?.style.setProperty('--y', `${y}`);
  };

  const scrollToView = (e: HTMLElement) => {
    var text = e.innerText.trim().toLowerCase();
    text = text.includes('connect') ? 'contact' : text;
    document
      .querySelector(`[data-${text}]`)
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  const findWord = (line: string) => {
    const match = ['stack', 'projects', 'connect'];
    return line.split(/\b/).map((word, index) => {
      return match.includes(word.toLowerCase()) ? (
        <span key={index} className="neon cursor-pointer">
          <a
            onClick={(e) => {
              scrollToView(e.currentTarget);
            }}
          >
            {word}
          </a>
        </span>
      ) : (
        <span key={index}>{word}</span>
      );
    });
  };

  useEffect(() => {
    if (inView) {
      section('#about');
      entry?.target?.querySelector('.about-name')?.classList.add('animate-in');
    }
  }, [entry?.target, inView, section]);

  return (
    <section
      className="about-wrapper flex justify-center items-center text-start Amcap"
      id="about-Me"
      ref={aboutRef}
      data-about
      onMouseMove={(e) => {
        !isSmallScreen && Parallex(e);
      }}
    >
      <div className="about relative">
        {/* <div className="about-name">
          <h1 className="text-3xl lg:text-7xl flex justify-evenly">
            <span className="">HI, I&apos;M</span>
            <span className="">ALISTER</span> <span className="">XAVIER,</span>
          </h1>
        </div> */}
        <motion.div
          initial="hidden"
          whileInView={'visible'}
          className="about-text text-sm lg:text-5xl p-4 lg:p-6"
          transition={{
            delayChildren: 0.2,
            staggerChildren: 0.1,
          }}
        >
          {text.split('\n').map((i, index) => (
            <motion.span
              key={index}
              variants={defaultAnimtion}
              className={`inline-block mr-1`}
            >
              {findWord(i)}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
