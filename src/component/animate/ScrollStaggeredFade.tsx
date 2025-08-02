"use client";
import { staggeredFade } from "@/utils/animate";
import { motion } from "framer-motion";
import { HTMLProps, ReactNode } from "react";

type ScrollStaggeredFadeProps = {
  children: ReactNode;
  className?: HTMLProps<HTMLElement>["className"];
  id?: string;
  htmlTag?: keyof JSX.IntrinsicElements;
  delay?: number;
  custom: number;
};

function ScrollStaggeredFade({
  children,
  className,
  id,
  htmlTag = "div",
  delay,
  custom,
}: ScrollStaggeredFadeProps) {
  const Motion = motion.create(htmlTag);

  return (
    <Motion
      variants={staggeredFade(delay)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true }}
      id={id}
      className={className}
      custom={custom}
    >
      {children}
    </Motion>
  );
}

export default ScrollStaggeredFade;
