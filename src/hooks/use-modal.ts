'use client';

import { useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  return {
    isOpen,
    showModal,
    closeModal,
  };
};
