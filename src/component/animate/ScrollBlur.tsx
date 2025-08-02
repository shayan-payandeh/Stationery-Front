"use client";
import { blur } from "@/utils/animate";
import { motion } from "framer-motion";
import { HTMLProps, ReactNode } from "react";

type ScrollBlurProps = {
  children: ReactNode;
  className?: HTMLProps<HTMLElement>["className"];
  id?: string;
  htmlTag?: keyof JSX.IntrinsicElements;
  delay?: number;
};

function ScrollBlur({
  children,
  className,
  id,
  htmlTag = "div",
  delay,
}: ScrollBlurProps) {
  const Motion = motion.create(htmlTag);

  return (
    <Motion
      variants={blur(delay)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true }}
      id={id}
      className={className}
    >
      {children}
    </Motion>
  );
}

export default ScrollBlur;
