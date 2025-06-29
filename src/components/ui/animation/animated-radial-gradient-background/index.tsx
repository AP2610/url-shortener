'use client';

import { motion } from 'motion/react';

export const AnimatedRadialGradientBackground = () => {
  return (
    <motion.div
      initial={{ scale: 0.3, opacity: 0 }}
      animate={{
        scale: [1, 0.8, 1],
        opacity: 0.8,
      }}
      transition={{
        scale: {
          duration: 4,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        },
        opacity: {
          duration: 4,
          ease: 'easeIn',
        },
      }}
      className="radial-background-gradient absolute inset-0 -z-10"
    ></motion.div>
  );
};
