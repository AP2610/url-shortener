'use client';

import { motion, MotionProps, Variants } from 'motion/react';
import { LOGO_TEXT } from '@/components/ui/logo/entry-animation-logo';
import useAnimationStore from '@/lib/stores/animation-store';
import { cn } from '@/lib/utils/cn';

interface HeaderLogoProps extends MotionProps {
  layoutId?: string;
  className?: string;
}

export const HeaderLogo = ({ layoutId, className, ...props }: HeaderLogoProps) => {
  const { setAnimationCompletionStatus } = useAnimationStore();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('text-2xl font-bold text-primary', className)}
      onAnimationComplete={() => setAnimationCompletionStatus('header-logo')}
      layoutId={layoutId}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      {...props}
    >
      {[...LOGO_TEXT].map((letter, index) => (
        <motion.span key={index} className="inline-block" variants={childVariants}>
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};
