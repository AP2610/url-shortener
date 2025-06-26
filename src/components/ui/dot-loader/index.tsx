'use client';

import { motion, Variants } from 'motion/react';

export const DotLoader = () => {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.5 },
    },
  };

  const childVariants: Variants = {
    visible: {
      opacity: 1,
      y: [0, -10, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 0.5,
      },
    },
  };

  return (
    <motion.span
      className="inline-flex items-center justify-center space-x-2"
      variants={container}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <motion.span key={index} className="h-2 w-2 rounded-full bg-primary" variants={childVariants}></motion.span>
      ))}
    </motion.span>
  );
};
