'use client';

import { motion } from 'motion/react';

interface HoverTapWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const HoverTapWrapper = ({ children, className }: HoverTapWrapperProps) => {
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      transition={{ transform: { duration: 0.2 } }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
