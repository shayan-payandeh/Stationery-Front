"use client";
import { zoom } from "@/utils/animate";
import { motion } from "framer-motion";
import { CSSProperties, HTMLProps, ReactNode } from "react";

type ScrollViewProps = {
  children: ReactNode;
  id?: string;
  className?: HTMLProps<HTMLElement>["className"];
  style?: CSSProperties;
  htmlTag?: keyof JSX.IntrinsicElements;
};

function ScrollView({
  children,
  id,
  className,
  style,
  htmlTag = "div",
}: ScrollViewProps) {
  const Motion = motion.create(htmlTag);

  return (
    <Motion
      id={id}
      className={className}
      style={style}
      variants={zoom()}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true }}
    >
      {children}
    </Motion>
  );
}

export default ScrollView;
