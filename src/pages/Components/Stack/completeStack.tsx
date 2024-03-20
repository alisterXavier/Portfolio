import Image from 'next/image';
import { useEffect, useRef } from 'react';
import stack from '@a/data/stack.json';
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
      type: 'tween',
    },
  },
};

const AllStack = () => {
  const eachLang = useRef<Array<HTMLDivElement>>([]);
  const control = useAnimation();

  useEffect(() => {
    control.start('visible');
  }, [control]);

  return (
    <div className="content-wrapper lighter-background">
      <section className="stack complete-stack view overflow-hidden">
        <div className="stack-container-wrapper">
          <motion.div
            className="stack-container"
            style={{ width: '100%' }}
            initial={'initial'}
            animate={control}
            transition={{
              delayChildren: 0.2,
              staggerChildren: 0.1,
            }}
          >
            {stack.map((l, index) => {
              return (
                <motion.div
                  key={index}
                  className="language-container-wrapper back-neu-shadow lighter-background"
                  ref={(e) => {
                    if (e !== null) eachLang.current.splice(index, 1, e);
                  }}
                  variants={animateStack}
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
                      <figure className="">
                        <Image
                          src={l.img}
                          alt={l.img}
                          width={100}
                          height={100}
                        />
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
    </div>
  );
};

export default AllStack;
