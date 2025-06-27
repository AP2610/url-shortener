'use client';

import { Logo } from '@/components/ui/logo';
import { useMediaQuery } from '@/hooks/use-media-query';
import useAnimationStore from '@/lib/stores/animation-store';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

export const EntryAnimation = () => {
  const [showEntryAnimation, setShowEntryAnimation] = useState(true);
  const [logoScale, setLogoScale] = useState(4);
  const { animationCompletionStatus, setAnimationCompletionStatus } = useAnimationStore();
  const isLogoCompleted = animationCompletionStatus['logo'];
  const isMediumScreen = useMediaQuery('md');

  useEffect(() => {
    if (isMediumScreen !== null) {
      setLogoScale(isMediumScreen ? 4 : 2.5);
    }
  }, [isMediumScreen]);

  useEffect(() => {
    if (isLogoCompleted) {
      setShowEntryAnimation(false);
    }
  }, [isLogoCompleted]);

  const hideEntryAnimationFlag = process.env.NEXT_PUBLIC_SHOW_ENTRY_ANIMATION === 'false';

  useEffect(() => {
    if (hideEntryAnimationFlag) {
      setAnimationCompletionStatus('entry-animation');
    }
  }, [hideEntryAnimationFlag]);

  if (hideEntryAnimationFlag) {
    return null;
  }

  return (
    <AnimatePresence onExitComplete={() => setAnimationCompletionStatus('entry-animation')}>
      {showEntryAnimation && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Logo layoutId="logo" scale={logoScale} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
