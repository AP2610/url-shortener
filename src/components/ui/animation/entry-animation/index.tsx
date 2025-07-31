'use client';

import { EntryAnimationLogo } from '@/components/ui/logo/entry-animation-logo';
import useAnimationStore from '@/lib/stores/animation-store';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

// TODO: Animation: Switch to using local storage or a cookie with ttl of 1 hour to track if the animation has been shown
export const EntryAnimation = () => {
  const { animationCompletionStatus, setAnimationCompletionStatus } = useAnimationStore();
  const [showEntryAnimation, setShowEntryAnimation] = useState(true);
  const isLogoCompleted = animationCompletionStatus['entry-animation-logo'];

  // Animation only shows once on page load and not on navigation as Zustand state persists across navigation
  // Zustand state lives in-memory and is not persisted across navigation.
  // Due to this, when navigating back to the homepage, logoCompletion state is true, so useEffect runs again and sets showEntryAnimation to false.
  // However, if you open the site in a new tab, the animation will show again
  // Another option would be to set a cookie to track if the animation has been shown

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

  const hasEntryAnimationBeenShown = animationCompletionStatus['entry-animation'];

  if (hideEntryAnimationFlag || hasEntryAnimationBeenShown) {
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
          <EntryAnimationLogo layoutId="logo" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
