import { useSmallDeviceSize } from "@/Hooks/smalDeviceHook";
import { RefObject, useEffect, useRef } from "react";

const AboutMe = ({
  section,
  navRef,
}: {
  section: (id: string) => void;
  navRef: RefObject<HTMLElement>;
}) => {
  const isSmallScreen = useSmallDeviceSize();
  const aboutRef = useRef<HTMLElement>(null);
  const innerAbout = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const Parallex = (event: React.MouseEvent) => {
    const x = ((event.pageX - 500) * -1) / 15;
    const y = ((event.pageY - 500) * -1) / 15;

    innerAbout.current?.style.setProperty("--x", `${x}`);
    innerAbout.current?.style.setProperty("--y", `${y}`);
  };

  const scrollToView = (e: HTMLElement) => {
    var text = e.innerText.trim().toLowerCase();
    text = text.includes("contact") ? "contact" : text;
    document
      .querySelector(`[data-${text}]`)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section("#about");
            entry.target
              .querySelector(".about-name")
              ?.classList.add("animate-in");
          }
        });
      },
      {
        threshold: .9,
      }
    );
    if (aboutRef.current) observer.current.observe(aboutRef.current);
  }, [section]);

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
      <div className="about relative" ref={innerAbout}>
        <div className="about-name">
          <h1 className="text-3xl lg:text-7xl flex justify-evenly">
            <span className="">HI, I&apos;M</span>
            <span className="">ALISTER</span> <span className="">XAVIER,</span>
          </h1>
        </div>
        <div className="about-text text-sm lg:text-2xl p-4 lg:p-6">
          A <span>web developer</span>. As a well-rounded user and developer, I
          aim to make sure that systems interfaces, languages, and graphics are
          human-friendly, aesthetically pleasing, clear, on-brand, and usable.
          Check out my
          <span className="neon cursor-pointer">
            <a
              onClick={(e) => {
                scrollToView(e.currentTarget);
              }}
            >
              {" "}
              stack{" "}
            </a>
          </span>
          for a clear view of the technologies and languages I have used and
          <span className="neon cursor-pointer">
            <a
              onClick={(e) => {
                scrollToView(e.currentTarget);
              }}
            >
              {" "}
              projects{" "}
            </a>
          </span>
          where I used some of them. Looking forward to doing business with you.
          <span className="neon cursor-pointer block">
            <a
              onClick={(e) => {
                scrollToView(e.currentTarget);
              }}
            >
              Contact me{" "}
            </a>
          </span>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
