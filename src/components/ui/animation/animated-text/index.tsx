'use client';

import { motion, Variants } from 'motion/react';

type AnimatedTextProps = {
  text: string;
  className?: string;
  delay?: number;
};

export const AnimatedText = ({ text, className, delay = 0 }: AnimatedTextProps) => {
  const letters = Array.from(text);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay },
    }),
  };

  const childVariants: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 0.4,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.span className={className} variants={container} initial="hidden" animate="visible">
      {letters.map((letter, index) => (
        <motion.span variants={childVariants} key={index}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};
