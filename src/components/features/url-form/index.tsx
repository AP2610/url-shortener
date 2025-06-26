'use client';

import { generateShortUrl } from '@/actions/db/generate-short-url';
import { Button } from '@/components/ui/button';
import { DotLoader } from '@/components/ui/dot-loader';
import { Heading } from '@/components/ui/heading';
import { Modal } from '@/components/ui/modal';
import { useModal } from '@/hooks/use-modal';
import { sanitizeUrlInput, validateUrl } from '@/lib/utils/url-utils';
import { motion, type Variants } from 'motion/react';
import { useRef, useState } from 'react';
import { CiLink } from 'react-icons/ci';
import { IoCopyOutline } from 'react-icons/io5';
import { MyDatePicker } from '../../ui/date-picker';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.6,
      delayChildren: 0.2,
    },
  },
};

const slideXLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const slideXRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 1.2,
    },
  },
};

export const UrlForm = () => {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, showModal, closeModal } = useModal();

  const urlInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const urlOutputRef = useRef<HTMLInputElement>(null);
  console.log(errorMessage);

  const handleDateChange = (date: Date | null) => {
    setExpiryDate(date as Date);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const url = sanitizeUrlInput(formData.get('url') as string);
    const expiryDate = formData.get('expiryDate') as string;

    const { isValid, errorMessage } = validateUrl(url);

    if (!isValid && errorMessage) {
      setErrorMessage(errorMessage);
      setIsLoading(false);
      return;
    }

    const urlGenerationData = {
      url,
      expiryDate: new Date(expiryDate),
    };

    try {
      const { hasError, message, shortUrl } = await generateShortUrl(urlGenerationData);

      if (hasError) {
        setErrorMessage(message);
        setIsLoading(false);
        return;
      }

      setShortUrl(shortUrl);
      setErrorMessage(message);
      showModal();
      console.log('message: ', message);
      console.log('shortUrl:', shortUrl);
    } catch (error) {
      console.error(error);

      setErrorMessage('An error occurred while generating the short URL');
    } finally {
      setIsLoading(false);

      if (urlInputRef.current) {
        urlInputRef.current.value = '';
      }

      if (buttonRef.current) {
        buttonRef.current.blur();
      }
    }
  };

  const handleCopyToClipboard = () => {
    if (!urlOutputRef.current) return;

    const copyTextInput = urlOutputRef.current;
    copyTextInput.select();
    copyTextInput.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(copyTextInput.value);
  };

  // TODO: show error message below url input
  // TODO: show toast after copying to clipboard

  return (
    <>
      <form onSubmit={handleFormSubmit} className="w-full md:w-5xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex h-[var(--input-height)] w-full items-center gap-2"
        >
          <motion.div
            variants={slideXLeftVariants}
            className="relative h-full w-[60%] [border-top-left-radius:50px] [border-top-right-radius:4px] [border-bottom-right-radius:4px] [border-bottom-left-radius:50px] border-2 border-dark-gray bg-blue-black focus-within:border-primary"
          >
            <input
              ref={urlInputRef}
              required
              placeholder=""
              className="peer h-full w-full appearance-none pt-7 pr-4 pb-3 pl-12 text-light-gray transition-all focus:outline-none"
              type="url"
              name="url"
            />

            <CiLink className="absolute top-1/2 left-3 h-6 w-6 -translate-y-1/2 -rotate-45 text-dark-gray transition-all peer-focus:rotate-45 peer-focus:text-primary" />

            <label
              className="absolute left-12 text-dark-gray transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-4 peer-focus:-translate-y-1/2 peer-focus:text-[11px] peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:text-[11px]"
              htmlFor="url"
            >
              Enter your link here
            </label>
          </motion.div>

          <motion.div variants={slideXRightVariants} className="relative h-full w-[20%]">
            <MyDatePicker showIcon name="expiryDate" selected={expiryDate} onChange={handleDateChange} />
            <motion.label
              variants={fadeInVariants}
              htmlFor="expiryDate"
              className="absolute top-4 left-[20px] -translate-y-1/2 text-[11px] text-dark-gray"
            >
              Expiry date
            </motion.label>
          </motion.div>

          <motion.button
            variants={slideXRightVariants}
            type="submit"
            disabled={isLoading}
            ref={buttonRef}
            className="h-full w-[20%] [border-top-left-radius:4px] [border-top-right-radius:50px] [border-bottom-right-radius:50px] [border-bottom-left-radius:4px] border-2 border-dark-gray bg-dark-gray/60 py-3 text-light-gray transition-colors duration-300 hover:bg-dark-gray/40 focus:border-primary focus:outline-none"
          >
            {isLoading ? <DotLoader /> : 'Shorten!'}
          </motion.button>
        </motion.div>
      </form>

      {shortUrl && (
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <div className="flex flex-col items-center gap-8 p-4">
            <Heading level="h2" as="h3">
              Here is your short URL!
            </Heading>

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
                <IoCopyOutline className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
