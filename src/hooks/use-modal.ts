'use client';

import { useEffect, useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Restore body overflow when modal component unmounts. To handle cases where user navigates to a new page while the modal is open.
  useEffect(() => {
    return () => {
      if (isOpen) {
        document.body.style.overflow = 'auto';
      }
    };
  }, [isOpen]);

  return {
    isOpen,
    showModal,
    closeModal,
  };
};
