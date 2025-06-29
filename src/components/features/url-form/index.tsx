'use client';

import { generateShortUrl } from '@/actions/db/generate-short-url';
import { DotLoader } from '@/components/ui/animation/dot-loader';
import { Button } from '@/components/ui/button';
import { MyDatePicker } from '@/components/ui/date-picker';
import { Heading } from '@/components/ui/heading';
import { Modal } from '@/components/ui/modal';
import { useFloatingLabel } from '@/hooks/use-floating-label';
import { useModal } from '@/hooks/use-modal';
import useAnimationStore from '@/lib/stores/animation-store';
import { cn } from '@/lib/utils/cn';
import { sanitizeUrlInput, validateUrl } from '@/lib/utils/url-utils';
import { motion, type Variants } from 'motion/react';
import { useRef, useState } from 'react';
import { CiLink } from 'react-icons/ci';
import { IoMdCheckmark } from 'react-icons/io';
import { IoCalendarNumberOutline, IoCopyOutline } from 'react-icons/io5';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.1,
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
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isDatePickerFocussed, setIsDatePickerFocussed] = useState(false);
  const { isOpen, showModal, closeModal } = useModal();
  const { animationCompletionStatus } = useAnimationStore();

  const {
    setHasValue: setHasValueForLabelUrlInput,
    shouldFloatLabel: shouldFloatLabelUrlInput,
    handleFocus: handleFocusUrlInput,
    handleBlur: handleBlurUrlInput,
    handleChange: handleChangeForLabelUrlInput,
  } = useFloatingLabel({});
  const {
    setHasValue: setHasValueForLabelDatePicker,
    shouldFloatLabel: shouldFloatLabelDatePicker,
    handleFocus: handleFocusForLabelDatePicker,
    handleBlur: handleBlurForLabelDatePicker,
    handleChange: handleChangeForLabelDatePicker,
  } = useFloatingLabel({});
  const isEntryAnimationComplete = animationCompletionStatus['entry-animation'];

  const urlInputRef = useRef<HTMLInputElement>(null);
  const urlOutputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  console.log(errorMessage);

  const handleDateChange = (date: Date | null) => {
    // Need to create a fake event to trigger the handleChange function because datepicker doesn't expose event
    const fakeEvent = {
      target: {
        value: date ? date.toISOString() : '',
        name: 'expiryDate',
      },
    } as React.ChangeEvent<HTMLInputElement>;

    handleChangeForLabelDatePicker(fakeEvent);
    setExpiryDate(date);
  };

  const handleDatePickerFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    handleFocusForLabelDatePicker(event);
    setIsDatePickerFocussed(true);
  };

  const handleDatePickerBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    handleBlurForLabelDatePicker(event);
    setIsDatePickerFocussed(false);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setIsCopied(false);

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
        setHasValueForLabelUrlInput(false);
      }

      setExpiryDate(null);
      setHasValueForLabelDatePicker(false);

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
    setIsCopied(true);
  };

  // TODO: show error message below url input
  // TODO: show toast after copying to clipboard

  return (
    <>
      <form onSubmit={handleFormSubmit} className="w-full lg:w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isEntryAnimationComplete ? 'visible' : 'hidden'}
          className="flex w-full flex-col items-center justify-center gap-4 md:flex-row md:gap-2"
        >
          <motion.div
            variants={slideXLeftVariants}
            className="relative h-[var(--input-height)] w-full rounded-sm border-2 border-dark-gray bg-blue-black focus-within:border-primary md:w-[55%] md:[border-top-left-radius:50px] md:[border-top-right-radius:4px] md:[border-bottom-right-radius:4px] md:[border-bottom-left-radius:50px]"
          >
            <input
              id="url"
              ref={urlInputRef}
              required
              placeholder=""
              className="peer h-full w-full appearance-none pt-7 pr-4 pb-3 pl-12 text-light-gray transition-all focus:outline-none"
              type="url"
              name="url"
              onFocus={handleFocusUrlInput}
              onBlur={handleBlurUrlInput}
              onChange={handleChangeForLabelUrlInput}
            />

            <CiLink className="absolute top-1/2 left-3 h-6 w-6 -translate-y-1/2 -rotate-45 text-dark-gray transition-all peer-focus:rotate-45 peer-focus:text-primary" />

            <label
              className={cn(
                'absolute left-12 text-dark-gray transition-all',
                shouldFloatLabelUrlInput ? 'top-4 -translate-y-1/2 text-[11px]' : 'top-1/2 -translate-y-1/2 text-base',
              )}
              htmlFor="url"
            >
              Enter your link here
            </label>
          </motion.div>

          <motion.div variants={slideXRightVariants} className="relative h-[var(--input-height)] w-full md:w-[25%]">
            <IoCalendarNumberOutline
              className={cn(
                'absolute top-1/2 left-3 z-1 h-6 w-6 -translate-y-1/2 text-dark-gray transition-all',
                shouldFloatLabelDatePicker ? 'mt-2' : 'mt-0',
                isDatePickerFocussed ? 'text-primary' : 'text-dark-gray',
              )}
            />

            <MyDatePicker
              id="expiryDate"
              name="expiryDate"
              selected={expiryDate}
              onChange={handleDateChange}
              minDate={new Date()}
              onFocus={handleDatePickerFocus}
              onBlur={handleDatePickerBlur}
            />
            <motion.label
              variants={fadeInVariants}
              htmlFor="expiryDate"
              className={cn(
                'absolute left-12 text-dark-gray transition-all',
                shouldFloatLabelDatePicker ? 'top-4 -translate-y-1/2 text-[11px]' : 'top-1/2 -translate-y-1/2 text-base',
              )}
            >
              Expiry date
            </motion.label>
          </motion.div>

          <motion.button
            variants={slideXRightVariants}
            type="submit"
            disabled={isLoading}
            ref={buttonRef}
            className="h-[var(--input-height)] w-full cursor-pointer rounded-sm border-2 border-dark-gray bg-dark-gray/60 py-3 text-light-gray transition-colors duration-300 hover:bg-dark-gray/40 focus:border-primary focus:outline-none md:w-[20%] md:[border-top-left-radius:4px] md:[border-top-right-radius:50px] md:[border-bottom-right-radius:50px] md:[border-bottom-left-radius:4px]"
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
                {isCopied ? <IoMdCheckmark className="h-6 w-6" /> : <IoCopyOutline className="h-6 w-6" />}
              </Button>
            </div>

            {isCopied && <p className="text-center text-sm text-dark-gray">Copied to clipboard!</p>}
          </div>
        </Modal>
      )}
    </>
  );
};
