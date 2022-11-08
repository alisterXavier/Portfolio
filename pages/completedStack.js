import Image from "next/future/image";
import { useContext, useEffect, useRef } from "react";
import familiarStack from "../components/familiarStack.json";
import stack from "../components/stack.json";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";
import { Screen } from "./_app";

const AllStack = () => {
  const router = useRouter();
  const screen = useContext(Screen)
  const eachLang = useRef([]);
  useEffect(() => {
    eachLang.current.forEach((lang) => {
      setTimeout(() => {
        lang.classList.add("animate-in");
      }, 500);
    });
  }, []);

  const languageOn = (e) => {
    const Pelement = e.currentTarget;
    Pelement.style.boxShadow = `0px 0px 2rem #0fa, inset 0px 0px 20px #0fa`;
    Pelement.style.border = `3px solid #0fa`;

    const text = Pelement.querySelector(".language-name");
    text.style.color = `#0fa`;
  };

  const languageOff = (e) => {
    const Pelement = e.currentTarget;
    Pelement.removeAttribute("style");
    const text = Pelement.querySelector(".language-name");
    text.removeAttribute("style");
  };

  return (
    <div className="overflow">
      {screen > 500 && (
        <BiArrowBack
          className="absolute z-10 top-5 left-5 cursor-pointer"
          size={30}
          onClick={() => {
            router.back();
          }}
        ></BiArrowBack>
      )}
      <section className="stack complete-stack view overflow-hidden">
        <div className="stack-container-wrapper">
          <div className="stack-container" style={{ width: "90%" }}>
            {stack.map((l, index) => {
              return (
                <div
                  key={index}
                  className="language-container-wrapper"
                  ref={(ele) => eachLang.current.splice(index, 1, ele)}
                  onMouseEnter={languageOn}
                  onMouseLeave={languageOff}
                >
                  <div className="language-container">
                    <div className="img-container">
                      <figure className="">
                        <Image
                          src={l.img}
                          alt={l.img}
                          layout={"fill"}
                          width={100}
                          height={100}
                        />
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
    </div>
  );
};

export default AllStack;
