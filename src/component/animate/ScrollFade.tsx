"use client";
import { fadeIn } from "@/utils/animate";
import { motion } from "framer-motion";
import { CSSProperties, HTMLProps, ReactNode } from "react";

type ScrollFadeProps = {
  side: string;
  children: ReactNode;
  id?: string;
  className?: HTMLProps<HTMLElement>["className"];
  style?: CSSProperties;
  htmlTag?: keyof JSX.IntrinsicElements;
};

function ScrollFade({
  side,
  children,
  id,
  className,
  style,
  htmlTag = "div",
}: ScrollFadeProps) {
  const Motion = motion.create(htmlTag);
  return (
    <Motion
      id={id}
      variants={fadeIn(side, 0)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true }}
      className={className}
      style={style}
    >
      {children}
    </Motion>
  );
}

export default ScrollFade;
