"use client";
import { motion, useScroll } from "framer-motion";

function ScrollProgress() {
  const { scrollYProgress } = useScroll({ offset: ["start start", "end end"] });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[99999999] h-[6px] origin-[0%] bg-primary-600"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

export default ScrollProgress;
