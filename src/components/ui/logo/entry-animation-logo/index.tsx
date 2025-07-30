'use client';

import useAnimationStore from '@/lib/stores/animation-store';
import { cn } from '@/lib/utils/cn';
import { motion, MotionProps } from 'motion/react';

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

export const LOGO_TEXT = 'SHORTLY';

interface EntryAnimationLogoProps extends MotionProps {
  shouldAnimate?: boolean;
  layoutId?: string;
  className?: string;
}

export const EntryAnimationLogo = ({ layoutId, className, ...props }: EntryAnimationLogoProps) => {
  const { setAnimationCompletionStatus } = useAnimationStore();

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

  return (
    <motion.div
      variants={logoContainerVariants}
      initial="hidden"
      animate="visible"
      className={cn('text-4xl font-bold text-primary md:text-9xl', className)}
      onAnimationComplete={() => setAnimationCompletionStatus('entry-animation-logo')}
      layoutId={layoutId}
      viewport={{ once: true }}
      {...props}
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
