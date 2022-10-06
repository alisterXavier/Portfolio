import { useContext, useRef, useState } from "react";
import emailjs from "emailjs-com";
import { FaDiscord } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillLinkedin } from "react-icons/ai";
import { ContactApi } from "../_app";
import { GrRotateRight } from 'react-icons/gr'
import { ImCross } from 'react-icons/im'
import { BiCheck } from 'react-icons/bi'

const Contact = () => {
  const [contactState, setContactState] = useContext(ContactApi);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [send, setSend] = useState();
  const [emailActive, setEmailActive] = useState(false);
  const [nameActive, setNameActive] = useState(false);
  const nameTag = useRef();
  const emailTag = useRef();
  const messageTag = useRef();
  const nameInput = useRef();
  const emailInput = useRef();

  const sendEmail = (e) => {
    if (validate()) {
      try {
        setSend("loading");
        emailjs
          .send(
            "service_qfh5m9x",
            "template_erq4h2c",
            {
              from_name: name,
              to_name: "Alister",
              from_email: email,
              message: message,
            },
            "YGydwiDxBuQnIDA7N"
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

    if (!emailValidate) emailTag.current.style.color = "red";
    if (!nameValidate) nameTag.current.style.color = "red";
    if (!messageValidate) messageTag.current.classList.add("invalid");

    if (!emailValidate || !nameValidate || !messageValidate) {
      setSend(false);
      setTimeout(() => {
        emailTag.current.removeAttribute("style");
        nameTag.current.removeAttribute("style");
        messageTag.current.classList.remove("invalid");
        setSend(undefined);
      }, 2000);
    }
    return (
      emailValidate == true && nameValidate == true && messageValidate == true
    );
  };

  const handleClick = () => {
    const value = !contactState;
    setContactState(value);
    if (!value)
      document.querySelector(".navigation-panel").style.animation =
        "nav-pop 500ms forwards";
  };

  const copyEmail = () => {
    const email = "xavieralister153@gmail.com";
    navigator.clipboard.writeText(email);
    document.querySelector(".tooltip").classList.add("active");
    setTimeout(() => {
      document.querySelector(".tooltip").classList.remove("active");
    }, 1000);
  };

  return (
    <>
      <div className="contact-wrapper" onClick={handleClick}>
        <div
          className="contact"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="w-full text-center">
            <div className="contact-title">
              <h1>Contact Me</h1>
            </div>
            <div className="contact-form">
              <label
                className={`name-wrapper ${nameActive && "active"}`}
                onClick={() => {
                  if (name.length === 0) {
                    if (nameActive) nameInput.current.blur();
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
                      if (nameActive) nameInput.current.blur();
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
                className={`email-wrapper ${emailActive && "active"}`}
                onClick={() => {
                  if (email.length === 0) {
                    if (emailActive) emailInput.current.blur();
                    setEmailActive(!emailActive);
                  }
                  if (nameActive && name.length === 0)
                    setNameActive(!nameActive);
                }}
              >
                <p
                  ref={emailTag}
                  onClick={() => {
                    if (email.length === 0) {
                      if (emailActive) emailInput.current.blur();
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
              <button className="send-btn" onClick={sendEmail}>
                {send === "loading" ? (
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

            <div className="platforms flex justify-end items-center relative w-11/12">
              <span className="tooltip">Email Copied!</span>
              <div className="platforms--wrapper flex justify-evenly items-center">
                <h2 className="hit-me">Hit me up on</h2>
                <a
                rel="noreferrer"
                  href="https://discordapp.com/users/703130890288496650"
                  target="_blank"
                >
                  <FaDiscord className="platform discord"></FaDiscord>
                </a>
                <a onClick={copyEmail} className="envelope relative">
                  <MdEmail className="platform"></MdEmail>
                </a>
                <a
                rel="noreferrer"
                  href="https://www.linkedin.com/in/alister-xavier-63259020b/"
                  target="_blank"
                >
                  <AiFillLinkedin className="platform linkedin"></AiFillLinkedin>
                </a>
              </div>
            </div>
          </div>

          <span className="topBorder"></span>
          <span className="leftBorder"></span>
          <span className="rightBorder"></span>
          <span className="bottomBorder"></span>
        </div>
      </div>
    </>
  );
};

export default Contact;
