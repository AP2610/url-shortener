import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Modal } from '@/components/ui/modal';
import { IoMdCheckmark } from 'react-icons/io';
import { IoCopyOutline } from 'react-icons/io5';

interface SuccessModalProps {
  isOpen: boolean;
  closeModal: () => void;
  shortUrl: string;
  urlOutputRef: React.RefObject<HTMLInputElement | null>;
  isCopied: boolean;
  handleCopyToClipboard: () => void;
}

export const SuccessModal = ({
  isOpen,
  closeModal,
  shortUrl,
  urlOutputRef,
  isCopied,
  handleCopyToClipboard,
}: SuccessModalProps) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="flex flex-col items-center gap-8 p-4">
        <Heading level="h2" as="h3">
          Awh Yeah!
        </Heading>

        <p className="text-center text-dark-gray">Here is your short URL!</p>

        <div className="flex w-full items-center rounded-md border-2 border-dark-gray bg-dark-gray/50 focus-within:border-primary">
          <label htmlFor="shortUrlOutput" className="sr-only">
            Short URL
          </label>

          <input
            type="url"
            name="shortUrlOutput"
            value={shortUrl}
            readOnly
            className="h-full w-full pl-4 text-light-gray focus:outline-none"
            ref={urlOutputRef}
          />

          <Button
            variant="secondary"
            className="rounded-l-none rounded-r-sm border-0 text-light-gray"
            onClick={handleCopyToClipboard}
          >
            {isCopied ? <IoMdCheckmark className="h-6 w-6" /> : <IoCopyOutline className="h-6 w-6" />}
          </Button>
        </div>

        {isCopied && <p className="text-center text-sm text-dark-gray">Copied to clipboard!</p>}
      </div>
    </Modal>
  );
};
