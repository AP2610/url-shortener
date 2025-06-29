'use client';

import { Modal } from '@/components/ui/modal';
import { useModal } from '@/hooks/use-modal';
import { useEffect } from 'react';

interface ExpiryModalProps {
  children: React.ReactNode;
  isExpired: boolean;
}

export const ExpiryModal = ({ children, isExpired }: ExpiryModalProps) => {
  const { isOpen, showModal, closeModal } = useModal();

  useEffect(() => {
    if (isExpired) {
      showModal();
    }
  }, [isExpired]);

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      {children}
    </Modal>
  );
};
