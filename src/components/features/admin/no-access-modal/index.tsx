'use client';

import { Heading } from '@/components/ui/heading';
import { Modal } from '@/components/ui/modal';
import { MyLink } from '@/components/ui/my-link';
import { useCountdown } from '@/hooks/use-countdown';
import { useModal } from '@/hooks/use-modal';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface NoAccessModalProps {
  hasAccess: boolean;
  redirectTo: string;
  redirectToLabel: string;
  redirectDelay?: number;
}

export const NoAccessModal = ({ hasAccess, redirectTo, redirectToLabel, redirectDelay = 5 }: NoAccessModalProps) => {
  const router = useRouter();
  const countdown = useCountdown(redirectDelay, () => router.push(redirectTo));
  const { isOpen, showModal, closeModal } = useModal();

  useEffect(() => {
    if (!hasAccess) {
      showModal();
    }
  }, [hasAccess, showModal]);

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} isCloseable={false}>
      <div className="max-w-[300px] space-y-4 text-center">
        <Heading level="h2" as="h3">
          Whoops, looks like you don't have access to this page
        </Heading>

        <p>
          You will be redirected to the {redirectToLabel} in {countdown} seconds.
        </p>

        <MyLink variant="primary" href={redirectTo}>
          {redirectToLabel.slice(0, 1).toUpperCase() + redirectToLabel.slice(1)}
        </MyLink>
      </div>
    </Modal>
  );
};
