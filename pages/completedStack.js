import Image from "next/future/image";
import { useEffect, useRef } from "react";
import familiarStack from "../components/familiarStack.json";
import stack from "../components/stack.json";

const AllStack = () => {
  const eachLang = useRef([]);
  useEffect(() => {
    eachLang.current.forEach((lang) => {
      setTimeout(() => {
        lang.classList.add("animate-in");
      }, 500);
    });
  }, []);

  return (
    <div className="overflow-div">
      <section className="stack view">
        <div className="stack-title">
          <h1 className="technologies text-5xl lg:text-6xl text-center">
            Stack Used{" "}
          </h1>
        </div>
        <div className="stack-container-wrapper">
          <div className="stack-container overflow-hidden">
            {stack.map((l, index) => {
              return (
                <div
                  key={index}
                  className="language-container-wrapper"
                  ref={(ele) => eachLang.current.splice(index, 1, ele)}
                >
                  <div className="language-container">
                    <div className="img-container">
                      <figure>
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
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="stack view">
        <div className="stack-title">
          <h1 className="technologies text-5xl lg:text-6xl text-center">
            Familiar with
          </h1>
        </div>
        <div className="stack-container-wrapper">
          <div className="stack-container">
            {familiarStack.map((fl, index) => {
              return (
                <div
                  key={index + stack.length}
                  className="language-container-wrapper"
                  ref={(ele) =>
                    eachLang.current.splice(index + stack.length, 1, ele)
                  }
                >
                  <div className="language-container">
                    <div className="img-container">
                      <figure>
                        <Image
                          alt={fl.img}
                          src={fl.img}
                          width={100}
                          height={100}
                        />
                      </figure>
                    </div>
                    <p className="language-name">{fl.lang}</p>
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
