import { RefObject, useEffect, useRef } from 'react';
import { useSmallDeviceSize } from '@/Hooks/smalDeviceHook';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface NavbarInterface {
  navToggle: boolean;
  setNavToggle: (value: boolean) => void;
  navRef: RefObject<HTMLElement>;
}
const Navbar = ({ navToggle, setNavToggle, navRef }: NavbarInterface) => {
  const isSmallScreen = useSmallDeviceSize();
  const animateNav = {
    initial: {
      opacity: 0,
      translate: isSmallScreen ? '-10px 0%' : '0%',
    },

    visible: {
      opacity: 1,
      translate: '0% 0%',
      transition: {
        type: 'spring',
      },
    },
  };
  const control = useAnimation();
  const [optionRef, inView] = useInView();
  const EnterPrevNav = (e: React.MouseEvent) => {
    const { id } = e.currentTarget;
    const child = e.currentTarget.querySelector('p');

    const translate =
      id === 'about'
        ? '0px'
        : id === 'stack'
        ? '200px 0px'
        : id === 'projects'
        ? '400px 0px'
        : '600px 0px';
    if (navRef.current) {
      (navRef.current.querySelector('.slider') as HTMLElement).style.translate =
        translate;
    }
  };
  const leavePrevNav = (e: React.MouseEvent) => {
    const { id } = e.currentTarget;
    if (navRef.current) {
      (navRef.current.querySelector('.slider') as HTMLElement).removeAttribute(
        'style'
      );
    }
  };
  const handleClick = (e: HTMLElement) => {
    const { id } = e;
    const active = navRef.current?.querySelector('[data-active]');
    delete (active as HTMLElement)?.dataset.active;

    if (id !== 'me') e.dataset.active = 'true';

    document
      .querySelector(`[data-${id}]`)
      ?.scrollIntoView({ behavior: 'smooth' });
    setNavToggle(false);
  };

  useEffect(() => {
    if (inView) control.start('visible');
    else control.start('initial');
  }, [control, inView]);

  return (
    <nav
      className={`navigation-panel flex items-center ${navToggle && 'active'}`}
      ref={navRef}
      data-nav
    >
      {!isSmallScreen && (
        <span className="m-5">
          <p
            className="neon hello cursor-pointer active:scale-95"
            id="me"
            onClick={() => {
              window?.scrollTo(0, 0);
            }}
          >
            ALISTER XAVIER
          </p>
        </span>
      )}
      <motion.ul
        className="nav-wrapper lg:ml-auto Omnes"
        onClick={(e) => {
          e.stopPropagation();
        }}
        ref={optionRef}
        initial={'initial'}
        animate={control}
        transition={{
          delayChildren: 0.2,
          staggerChildren: 0.1,
        }}
      >
        <motion.li
          variants={animateNav}
          className="cursor-pointer text-center flex items-center lg:justify-center"
          id="about"
          onClick={(e) => {
            handleClick(e.currentTarget);
          }}
          onMouseEnter={(e) => {
            EnterPrevNav(e);
          }}
          onMouseLeave={(e) => {
            leavePrevNav(e);
          }}
        >
          <p>About Me</p>
        </motion.li>
        <motion.li
          variants={animateNav}
          className="cursor-pointer text-center flex items-center lg:justify-center"
          id="stack"
          onClick={(e) => {
            handleClick(e.currentTarget);
          }}
          onMouseEnter={(e) => {
            EnterPrevNav(e);
          }}
          onMouseLeave={(e) => {
            leavePrevNav(e);
          }}
        >
          <p>Stack</p>
        </motion.li>
        <motion.li
          variants={animateNav}
          className="cursor-pointer text-center flex items-center lg:justify-center"
          id="projects"
          onClick={(e) => {
            handleClick(e.currentTarget);
          }}
          onMouseEnter={(e) => {
            EnterPrevNav(e);
          }}
          onMouseLeave={(e) => {
            leavePrevNav(e);
          }}
        >
          <p>Projects</p>
        </motion.li>
        <motion.li
          variants={animateNav}
          className="cursor-pointer text-center flex items-center lg:justify-center"
          id="contact"
          onClick={(e) => {
            handleClick(e.currentTarget);
          }}
          onMouseEnter={(e) => {
            EnterPrevNav(e);
          }}
          onMouseLeave={(e) => {
            leavePrevNav(e);
          }}
        >
          <p>Contact Me</p>
        </motion.li>
        <span className="slider"></span>
      </motion.ul>
    </nav>
  );
};

export default Navbar;
