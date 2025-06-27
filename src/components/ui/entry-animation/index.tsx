'use client';

import { Logo } from '@/components/ui/logo';
import useAnimationStore from '@/lib/stores/animation-store';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

export const EntryAnimation = () => {
  const [showEntryAnimation, setShowEntryAnimation] = useState(true);
  const { animationCompletionStatus, setAnimationCompletionStatus } = useAnimationStore();

  const isLogoCompleted = animationCompletionStatus['logo'];

  useEffect(() => {
    if (isLogoCompleted) {
      setShowEntryAnimation(false);
    }
  }, [isLogoCompleted]);

  return (
    <AnimatePresence>
      {showEntryAnimation && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => setAnimationCompletionStatus('entry-animation')}
        >
          <Logo layoutId="logo" scale={4} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
