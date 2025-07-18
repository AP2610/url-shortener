'use client';

import { cn } from '@/lib/utils/cn';
import { motion, Variants } from 'motion/react';

interface DotLoaderProps {
  color?: 'primary' | 'white';
}

export const DotLoader = ({ color = 'primary' }: DotLoaderProps) => {
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

  const dotClassName = cn('h-2 w-2 rounded-full', {
    'bg-primary': color === 'primary',
    'bg-white': color === 'white',
  });

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
        <motion.span key={index} className={dotClassName} variants={childVariants}></motion.span>
      ))}
    </motion.span>
  );
};
