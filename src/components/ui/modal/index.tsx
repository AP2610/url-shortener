'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

export interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
  isOpen: boolean;
  isCloseable?: boolean;
  preventCloseOnBackdropClick?: boolean;
}

export const Modal = ({ children, closeModal, isOpen, isCloseable = true, preventCloseOnBackdropClick = false }: ModalProps) => {
  useEffect(() => {
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscapePress);

    return () => window.removeEventListener('keydown', handleEscapePress);
  }, []);

  const handleBackdropClick = (event: React.MouseEvent) => {
    // target is the clicked element, currentTarget is what the listener is attached to
    if (event.target === event.currentTarget && isCloseable && !preventCloseOnBackdropClick) {
      closeModal();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px]"
          onClick={(event) => handleBackdropClick(event)}
        >
          <motion.article
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="max-h-[90dvh] w-fit max-w-[90vw] overflow-scroll rounded-md bg-blue-black shadow-md md:max-w-3xl"
          >
            {isCloseable && (
              <header className="flex justify-end">
                <Button
                  variant="icon-button"
                  className="text-primary transition-all duration-300 hover:text-primary/60 focus:outline-none focus-visible:outline-1 focus-visible:outline-primary"
                  onClick={closeModal}
                >
                  <IoCloseOutline className="h-6 w-6" />
                </Button>
              </header>
            )}

            <main className={cn('px-8 pb-8', !isCloseable && 'pt-8')}>{children}</main>
          </motion.article>
        </motion.section>
      )}
    </AnimatePresence>
  );
};
