import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Skiper31.css";

const Bracket = ({ className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 27 78"
      className={className}
    >
      <path
        fill="currentColor"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      ></path>
    </svg>
  );
};

export const CharacterV1 = ({ char, index, centerIndex, scrollYProgress }) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 35, 0]
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 35, 0]
  );

  return (
    <motion.span
      className={`skiper-char-span ${isSpace ? "skiper-space" : ""}`}
      style={{
        x,
        rotateX,
      }}
    >
      {char}
    </motion.span>
  );
};

export const CharacterV2 = ({ iconItem, index, centerIndex, scrollYProgress }) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 40, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.7, 1]);
  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    [Math.abs(distanceFromCenter) * 30, 0]
  );

  return (
    <motion.div
      className="skiper-tech-badge"
      style={{
        x,
        scale,
        y,
        transformOrigin: "center",
      }}
    >
      <i className={iconItem.iconClass} style={{ color: iconItem.brandColor }}></i>
      <span>{iconItem.name}</span>
    </motion.div>
  );
};

export const CharacterV3 = ({ iconItem, index, centerIndex, scrollYProgress }) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 60, 0]
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 35, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    [-Math.abs(distanceFromCenter) * 18, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);

  return (
    <motion.div
      className="skiper-tech-badge"
      style={{
        x,
        rotate,
        y,
        scale,
        transformOrigin: "center",
      }}
    >
      <i className={iconItem.iconClass} style={{ color: iconItem.brandColor }}></i>
      <span>{iconItem.name}</span>
    </motion.div>
  );
};

export const Skiper31 = () => {
  const targetRef = useRef(null);
  const targetRef2 = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: targetRef2,
    offset: ["start end", "end start"],
  });

  const text = "Zain Yarfa Tech Stack";
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  const techIcons = [
    { name: "React", iconClass: "fab fa-react", brandColor: "#61DAFB" },
    { name: "Figma", iconClass: "fab fa-figma", brandColor: "#F24E1E" },
    { name: "Node.js", iconClass: "fab fa-node-js", brandColor: "#5FA04E" },
    { name: "GitHub", iconClass: "fab fa-github", brandColor: "#333333" },
    { name: "Canva", iconClass: "fas fa-palette", brandColor: "#00C4CC" },
    { name: "PPT Deck", iconClass: "fas fa-file-powerpoint", brandColor: "#D24726" },
    { name: "JS ES6+", iconClass: "fab fa-js", brandColor: "#F7DF1E" },
    { name: "UDINUS", iconClass: "fas fa-graduation-cap", brandColor: "#D4B06A" },
  ];
  const iconCenterIndex = Math.floor(techIcons.length / 2);

  return (
    <section className="skiper31-container">
      {/* SECTION 1: SCROLL TEXT CONVERGENCE */}
      <div ref={targetRef} className="skiper31-scroll-block">
        <div className="skiper31-text-wrap">
          {characters.map((char, index) => (
            <CharacterV1
              key={index}
              char={char}
              index={index}
              centerIndex={centerIndex}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>

      {/* SECTION 2: SCROLL TECH STACK ICON CONVERGENCE */}
      <div ref={targetRef2} className="skiper31-scroll-block">
        <div className="skiper31-header-badge">
          <Bracket className="bracket-icon" />
          <span>Integrated With Modern Tech & Design Stack</span>
          <Bracket className="bracket-icon flip" />
        </div>
        <div className="skiper31-icons-grid">
          {techIcons.map((iconItem, index) => (
            <CharacterV2
              key={index}
              iconItem={iconItem}
              index={index}
              centerIndex={iconCenterIndex}
              scrollYProgress={scrollYProgress2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skiper31;
