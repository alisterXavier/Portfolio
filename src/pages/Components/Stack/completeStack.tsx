import Image from "next/image";
import { useEffect, useRef } from "react";
import { useSmallDeviceSize } from "@/Hooks/smalDeviceHook";
import stack from "@a/data/stack.json";

const AllStack = () => {
  const isSmallScreen = useSmallDeviceSize();
  const eachLang = useRef<Array<HTMLDivElement>>([]);

  useEffect(() => {
    eachLang.current.forEach((lang) => {
      setTimeout(() => {
        lang.classList.add("animate-in");
      }, 500);
    });
  }, []);

  return (
    <div className="content-wrapper lighter-background">
      <section className="stack complete-stack view overflow-hidden">
        <div className="stack-container-wrapper">
          <div className="stack-container" style={{ width: "100%" }}>
            {stack.map((l, index) => {
              return (
                <div
                  key={index}
                  className="language-container-wrapper back-neu-shadow"
                  ref={(e) => {
                    if (e !== null) eachLang.current.splice(index, 1, e);
                  }}
                >
                  <div
                    className="language-container"
                    onMouseEnter={(e) => {
                      e.currentTarget.classList.add("neu-shadow");
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.classList.remove("neu-shadow");
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
