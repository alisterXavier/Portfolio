import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useTransform, motion, useScroll, useSpring } from 'framer-motion';
import { GrRotateRight } from 'react-icons/gr';
import { BiCheck } from 'react-icons/bi';
import { TbBrandDiscord } from 'react-icons/tb';
import { AiOutlineLinkedin } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
import { useSmallDeviceSize } from '@/Hooks/smalDeviceHook';
import { useInView } from 'react-intersection-observer';

const Contact = ({ section }: { section: (id: string) => void }) => {
  const isSmallScreen = useSmallDeviceSize();
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const { scrollY } = useScroll();
  const initial = elementTop - clientHeight;
  const convert = isSmallScreen ? [100, -300] : [200, -200];
  const final = elementTop + convert[0];
  const yTransform = useTransform(scrollY, [initial, final], convert);
  const y = useSpring(yTransform, { stiffness: 200, damping: 90 });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [send, setSend] = useState<string | boolean>();
  const [emailActive, setEmailActive] = useState(false);
  const [nameActive, setNameActive] = useState(false);
  const nameTag = useRef<HTMLParagraphElement>(null);
  const emailTag = useRef<HTMLParagraphElement>(null);
  const messageTag = useRef<HTMLTextAreaElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const [contactRef, inView, entry] = useInView({ threshold: 0.8 });

  const sendEmail = () => {
    if (validate()) {
      try {
        setSend('loading');
        emailjs
          .send(
            'service_qfh5m9x',
            'template_erq4h2c',
            {
              from_name: name,
              to_name: 'Alister',
              from_email: email,
              message: message,
            },
            'YGydwiDxBuQnIDA7N'
          )
          .then((res) => {
            setTimeout(() => {
              setSend(true);
            }, 2000);
          });
      } catch (err) {
        setTimeout(() => {
          setSend(false);
        }, 2000);
      }
    }
  };

  const validate = () => {
    const emailValidate =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email.toLowerCase()
      );

    const nameValidate = name.length !== 0;
    const messageValidate = message.length !== 0;

    if (!emailValidate) (emailTag.current as HTMLElement).style.color = 'red';
    if (!nameValidate) (nameTag.current as HTMLElement).style.color = 'red';
    if (!messageValidate)
      (messageTag.current as HTMLElement).classList.add('invalid');

    if (!emailValidate || !nameValidate || !messageValidate) {
      setSend(false);
      setTimeout(() => {
        (emailTag.current as HTMLElement).removeAttribute('style');
        (nameTag.current as HTMLElement).removeAttribute('style');
        (messageTag.current as HTMLElement).classList.remove('invalid');
        setSend(undefined);
      }, 2000);
    }
    return (
      emailValidate == true && nameValidate == true && messageValidate == true
    );
  };

  const copy = (e: HTMLElement) => {
    const { id } = e;
    const usernames = {
      'discord uid': 'DREMANiC#8953',
      email: 'xavieralister153@gmail.com',
    };
    const parent = e.closest('[data-parent]');
    if (parent) {
      (
        parent.querySelector('.tooltip') as HTMLElement
      ).innerText = `${id.toUpperCase()} COPIED!`;
      navigator.clipboard?.writeText(usernames[id as keyof typeof usernames]);
      (parent?.querySelector('.tooltip') as HTMLElement).classList.add(
        'active'
      );
      setTimeout(() => {
        (parent.querySelector('.tooltip') as HTMLElement).classList.remove(
          'active'
        );
      }, 1000);
    }
  };

  useLayoutEffect(() => {
    const element = entry?.target;
    const onResize = () => {
      if (element) {
        setElementTop(element.getBoundingClientRect().top + window.scrollY);
        setClientHeight(window.innerHeight);
      }
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [contactRef, entry?.target]);

  useEffect(() => {
    if (inView) {
      section('#contact');
    }
  }, [inView, section]);

  return (
    <div
      className="contact-wrapper contact overflow-hidden"
      data-contact
      ref={contactRef}
    >
      <div className="contact-title flex neon p-10">
        <motion.div className="hello" style={{ y }}>
          <h1>CONTACT ME</h1>
        </motion.div>
      </div>
      <div
        className="contact-form-wrapper "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-[90%] lg:w-[60%] lg:h-full h-[85%] flex flex-col items-center justify-center inner-contact text-white Omnes">
          <div className="contact-form">
            <label
              className={`name-wrapper ${nameActive && 'active'}`}
              onClick={() => {
                if (name.length === 0) {
                  if (nameActive) nameInput.current?.blur();
                  setNameActive(!nameActive);
                }
                if (emailActive && email.length === 0)
                  setEmailActive(!emailActive);
              }}
            >
              <p
                ref={nameTag}
                onClick={() => {
                  if (name.length === 0) {
                    if (nameActive) nameInput.current?.blur();
                    setNameActive(!nameActive);
                  }
                  if (emailActive && email.length === 0)
                    setEmailActive(!emailActive);
                }}
              >
                Your Name
              </p>
              <input
                id="name"
                type="text"
                value={name}
                ref={nameInput}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>

            <label
              className={`email-wrapper ${emailActive && 'active'}`}
              onClick={() => {
                if (email.length === 0) {
                  if (emailActive) emailInput.current?.blur();
                  setEmailActive(!emailActive);
                }
                if (nameActive && name.length === 0) setNameActive(!nameActive);
              }}
            >
              <p
                ref={emailTag}
                onClick={() => {
                  if (email.length === 0) {
                    if (emailActive) emailInput.current?.blur();
                    setEmailActive(!emailActive);
                  }
                  if (nameActive && name.length === 0)
                    setNameActive(!nameActive);
                }}
              >
                Your Email
              </p>
              <input
                type="text"
                ref={emailInput}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <label>
              <textarea
                ref={messageTag}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                onClick={() => {
                  if (nameActive && name.length === 0)
                    setNameActive(!nameActive);
                  if (emailActive && email.length === 0)
                    setEmailActive(!emailActive);
                }}
                placeholder="Message..."
              ></textarea>
            </label>
            <button className="send-btn" onClick={sendEmail}>
              {send === 'loading' ? (
                <div className="loading">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <GrRotateRight></GrRotateRight>
                </div>
              ) : send === true ? (
                <div className="sent">
                  <BiCheck></BiCheck>
                </div>
              ) : send === false ? (
                <div className="send-error">
                  <ImCross></ImCross>
                </div>
              ) : (
                <span>Send</span>
              )}
            </button>
          </div>
          <div
            className="platforms flex justify-end items-center relative w-11/12 "
            data-parent
          >
            <span className="tooltip hello neon "></span>
            <div className="platforms--wrapper flex justify-evenly items-center">
              <h2 className="hit-me">Hit me up on</h2>
              <a
                rel="noreferrer"
                onClick={(e) => {
                  copy(e.currentTarget);
                }}
                className="platform discord cursor-pointer platform-glow"
                id="discord uid"
                target="_blank"
              >
                <TbBrandDiscord size={20}></TbBrandDiscord>
              </a>
              <a
                rel="noreferrer"
                href="https://www.linkedin.com/in/alister-xavier-63259020b/"
                target="_blank"
                className="platform linkedin platform-glow"
              >
                <AiOutlineLinkedin size={20}></AiOutlineLinkedin>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
