import { RefObject, useEffect, useRef } from "react";
import { FaAngleRight } from "react-icons/fa";
import Image from "next/image";
import { useSmallDeviceSize } from "@/Hooks/smalDeviceHook";
import Link from "next/link";
import languages from "@a/data/displayStack.json";
import ParallaxText from "./ParallexText";

const Stack = ({
  section,
  navRef,
}: {
  section: (id: string) => void;
  navRef: RefObject<HTMLElement>;
}) => {
  const isSmallScreen = useSmallDeviceSize();
  const stackRibbon = useRef<HTMLDivElement>(null);
  const eachLanguage = useRef<Array<HTMLDivElement>>([]);
  const stackRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const ViewCompleteStack = () => {
    if (stackRef.current) observer.current?.unobserve(stackRef.current);
    (
      document.querySelector(".main") as HTMLElement
    ).style.transition = `filter 500ms ease`;
    (
      document.querySelector(".main") as HTMLElement
    ).style.filter = `brightness(0)`;
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        Array.from(entries).forEach((e) => {
          if (e.isIntersecting) {
            section("#stack");
            (
              document.querySelector(".content-wrapper") as HTMLElement
            ).classList.add("lighter-background");

            eachLanguage.current.forEach((lang) => {
              (lang as HTMLElement).classList.add(
                "animate-in",
                "back-neu-shadow",
                "lighter-background"
              );
            });
          } else {
            (
              document.querySelector(".content-wrapper") as HTMLElement
            ).classList.remove("lighter-background");
            eachLanguage.current.forEach((lang) => {
              (lang as HTMLElement).classList.remove(
                "back-neu-shadow",
                "lighter-background"
              );
            });
          }
        });
      },
      { threshold: 0.5 }
    );
    if (stackRef.current) {
      observer.current.observe(stackRef.current);
    }
  }, []);

  return (
    <section className="stack view" ref={stackRef} id="Stack" data-stack>
      <ParallaxText baseVelocity={5}>MY STACK</ParallaxText>
      {!isSmallScreen && <ParallaxText baseVelocity={5}>MY STACK</ParallaxText>}
      <div className="more hello">
        <Link
          href="/Components/Stack/completeStack"
          className="cursor-pointer relative neon"
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
                className="language-container-wrapper"
                ref={(elem) => {
                  if (elem !== null)
                    eachLanguage.current.splice(index, 1, elem);
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
                    <figure className="language-img">
                      <Image
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
