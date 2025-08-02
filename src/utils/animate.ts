export const fadeIn = (direction: string, delay: number) => {
  return {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 1,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

export const blur = (delay: number = 0.1) => {
  return {
    hidden: {
      filter: "blur(5px)",
      opacity: 0,
    },

    show: {
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.8,
        delay: delay,
      },
    },
  };
};

export const zoom = () => {
  return {
    show: { opacity: 1, scale: 1, transition: { duration: 1.3 } },
    hidden: { opacity: 0, scale: 0 },
  };
};

export const staggeredFade = (delay: number = 0) => {
  return {
    hidden: { opacity: 0 },
    show: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: delay + i * 0.07,
      },
    }),
  };
};
