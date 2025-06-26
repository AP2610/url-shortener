'use client';

import { motion } from 'motion/react';

const logoContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.4,
      delayChildren: 0.2,
    },
  },
};

const slideYAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: 'spring' as const,
      stiffness: 100,
      damping: 10,
    },
  },
};

const slideXAnimation = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      type: 'spring' as const,
      stiffness: 100,
      damping: 10,
    },
  },
};

const LOGO_TEXT = 'SHORTLY';

export const Logo = () => {
  return (
    <motion.div
      variants={logoContainerVariants}
      initial="hidden"
      animate="visible"
      className="text-2xl font-bold text-primary"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {[...LOGO_TEXT].map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            ...(index % 2 === 0 ? slideXAnimation : slideYAnimation),
            visible: {
              ...(index % 2 === 0 ? slideXAnimation.visible : slideYAnimation.visible),
              scale: [1, 1.2, 1],
              transition: {
                ...(index % 2 === 0 ? slideXAnimation.visible.transition : slideYAnimation.visible.transition),
                scale: {
                  delay: 4 + index * 0.1,
                  duration: 0.3,
                },
              },
            },
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};
