'use client';

import useAnimationStore from '@/lib/stores/animation-store';
import { AnimationNames } from '@/lib/types/animations';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

type AnimatedElementPresenceProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  shouldWaitToAnimateFor?: AnimationNames | '';
};

export const AnimatedElementPresence = ({
  children,
  className,
  delay = 0,
  shouldWaitToAnimateFor = '',
}: AnimatedElementPresenceProps) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const { animationCompletionStatus } = useAnimationStore();

  useEffect(() => {
    if (!!shouldWaitToAnimateFor) {
      const isAnimationComplete = animationCompletionStatus[shouldWaitToAnimateFor];

      // Handle the case where the aniimation does not run (for whatever reason, for example, if its disabled)
      setShowAnimation(isAnimationComplete ?? true);
    } else {
      setShowAnimation(true);
    }
  }, [shouldWaitToAnimateFor, animationCompletionStatus]);

  return (
    <AnimatePresence>
      {showAnimation && (
        <motion.div
          className={className}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: delay, duration: 0.2 },
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
