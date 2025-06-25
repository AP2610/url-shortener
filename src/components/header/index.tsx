'use client';

import { motion } from 'motion/react';
import { CiLogin } from 'react-icons/ci';

export const Header = () => {
  const logoContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.6,
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

  const BAnimation = {
    ...slideYAnimation,
    visible: {
      ...slideYAnimation.visible,
      scale: [1, 1.1, 1],
      transition: {
        ...slideYAnimation.visible.transition,
        scale: {
          delay: 3.7,
          duration: 0.3,
        },
      },
    },
  };

  const RAnimation = {
    ...slideXAnimation,
    visible: {
      ...slideXAnimation.visible,
      scale: [1, 1.1, 1],
      transition: {
        ...slideXAnimation.visible.transition,
        scale: {
          delay: 3.8,
          duration: 0.3,
        },
      },
    },
  };

  const NAnimation = {
    ...slideYAnimation,
    visible: {
      ...slideYAnimation.visible,
      scale: [1, 1.1, 1],
      transition: {
        ...slideYAnimation.visible.transition,
        scale: {
          delay: 3.9,
          duration: 0.3,
        },
      },
    },
  };

  const KAnimation = {
    ...slideXAnimation,
    visible: {
      ...slideXAnimation.visible,
      scale: [1, 1.1, 1],
      transition: {
        ...slideXAnimation.visible.transition,
        scale: {
          delay: 4,
          duration: 0.3,
        },
      },
    },
  };

  return (
    <header className="flex items-center justify-between p-4 md:px-8 md:py-4">
      <motion.div variants={logoContainerVariants} initial="hidden" animate="visible" className="text-2xl font-bold text-primary">
        <motion.span className="inline-block" variants={BAnimation}>
          B
        </motion.span>
        <motion.span className="inline-block" variants={RAnimation}>
          R
        </motion.span>
        <motion.span className="inline-block" variants={NAnimation}>
          N
        </motion.span>
        <motion.span className="inline-block" variants={KAnimation}>
          K
        </motion.span>
      </motion.div>

      <div className="flex items-center gap-4 text-sm">
        <button className="flex items-center gap-2 rounded-full border-2 border-dark-gray bg-dark-gray/40 px-4 py-2 text-white">
          Login
          <CiLogin className="h-6 w-6" />
        </button>

        <button className="rounded-full border-2 border-transparent bg-primary px-4 py-2 text-white">Register Now</button>
      </div>
    </header>
  );
};
