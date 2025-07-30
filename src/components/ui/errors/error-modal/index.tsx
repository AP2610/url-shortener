'use client';

import { Heading } from '@/components/ui/heading';
import { Modal, ModalProps } from '@/components/ui/modal';
import { MyLink } from '@/components/ui/my-link';
import { useModal } from '@/hooks/use-modal';
import { useEffect } from 'react';

interface ErrorModalProps extends Pick<ModalProps, 'isCloseable' | 'preventCloseOnBackdropClick'> {
  success: boolean;
  hasError?: boolean;
  message?: string;
  redirectTo?: string;
  redirectToLabel?: string;
  errorType?: string;
}

export const ErrorModal = ({
  success,
  hasError,
  message,
  redirectTo,
  redirectToLabel,
  isCloseable,
  preventCloseOnBackdropClick,
  errorType,
}: ErrorModalProps) => {
  const { isOpen, showModal, closeModal } = useModal();

  useEffect(() => {
    if (!success || hasError) {
      showModal();
    }
  }, [success, hasError, showModal]);

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      isCloseable={isCloseable}
      preventCloseOnBackdropClick={preventCloseOnBackdropClick}
    >
      <div className="space-y-4 text-center">
        <Heading level="h2" as="h3" className="max-w-[300px]">
          Awh Snap! Something went wrong.
        </Heading>

        <p className="text-light-gray">{message}</p>

        {errorType && <p className="text-left text-sm text-red">Support code: {errorType}</p>}

        {redirectTo && redirectToLabel && (
          <MyLink href={redirectTo} variant="primary" className="w-full">
            {redirectToLabel}
          </MyLink>
        )}
      </div>
    </Modal>
  );
};
