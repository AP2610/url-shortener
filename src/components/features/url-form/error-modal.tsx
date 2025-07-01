import { Heading } from '@/components/ui/heading';
import { Modal } from '@/components/ui/modal';

interface ErrorModalProps {
  isOpen: boolean;
  closeModal: () => void;
  errorMessage: string;
}

export const ErrorModal = ({ isOpen, closeModal, errorMessage }: ErrorModalProps) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="space-y-8 p-4 text-center">
        <Heading level="h2" as="h3" className="text-center">
          Awh Snap!
        </Heading>

        <div className="space-y-2 text-dark-gray">
          <p>Looks like something went wrong.</p>
          <p>{errorMessage}</p>
        </div>
      </div>
    </Modal>
  );
};
