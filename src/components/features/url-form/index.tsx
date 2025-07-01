'use client';

import { DotLoader } from '@/components/ui/animation/dot-loader';
import { MyDatePicker } from '@/components/ui/date-picker';
import { useFloatingLabel } from '@/hooks/use-floating-label';
import { useModal } from '@/hooks/use-modal';
import useAnimationStore from '@/lib/stores/animation-store';
import { cn } from '@/lib/utils/cn';
import { createShortUrl } from '@/server-actions/create-short-url';
import { motion } from 'motion/react';
import { useActionState, useEffect, useRef, useState } from 'react';
import { CiLink } from 'react-icons/ci';
import { IoCalendarNumberOutline } from 'react-icons/io5';
import { SuccessModal } from './success-modal';
import { ErrorModal } from './error-modal';
import { containerVariants, fadeInVariants, slideXLeftVariants, slideXRightVariants } from './animation-variants';

export const UrlForm = () => {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isDatePickerFocussed, setIsDatePickerFocussed] = useState(false);

  const { isOpen: isSuccessModalOpen, showModal: showSuccessModal, closeModal: closeSuccessModal } = useModal();
  const { isOpen: isErrorModalOpen, showModal: showErrorModal, closeModal: closeErrorModal } = useModal();

  const [state, createShortUrlAction, isPending] = useActionState(createShortUrl, {
    hasError: false,
    message: '',
    shortUrl: null,
  });

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

  const urlInputRef = useRef<HTMLInputElement | null>(null);
  const urlOutputRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const resetForm = () => {
    if (urlInputRef.current) {
      urlInputRef.current.value = '';
      setHasValueForLabelUrlInput(false);
    }

    setExpiryDate(null);
    setHasValueForLabelDatePicker(false);

    if (buttonRef.current) {
      buttonRef.current.blur();
    }
  };

  // Submission success
  useEffect(() => {
    if (!state.shortUrl || state.hasError) return;

    setShortUrl(state.shortUrl);
    setIsCopied(false);
    showSuccessModal();
    resetForm();
  }, [state.shortUrl, state.hasError]);

  useEffect(() => {
    if (!state.hasError || !state.message) return;

    setErrorMessage(state.message);
    showErrorModal();
    resetForm();
  }, [state.hasError, state.message]);

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

  const handleCopyToClipboard = () => {
    if (!urlOutputRef.current) return;

    const copyTextInput = urlOutputRef.current;
    copyTextInput.select();
    copyTextInput.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(copyTextInput.value);
    setIsCopied(true);
  };

  // TODO: show toast after copying to clipboard

  return (
    <>
      <form action={createShortUrlAction} className="w-full lg:w-4xl">
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

            <motion.label
              variants={fadeInVariants}
              className={cn(
                'absolute left-12 text-dark-gray transition-all',
                shouldFloatLabelUrlInput ? 'top-4 -translate-y-1/2 text-[11px]' : 'top-1/2 -translate-y-1/2 text-base',
              )}
              htmlFor="url"
            >
              Enter your link here
            </motion.label>
          </motion.div>

          <motion.div variants={slideXRightVariants} className="relative h-[var(--input-height)] w-full md:w-[25%]">
            <IoCalendarNumberOutline
              className={cn(
                'absolute top-1/2 left-3 z-1 h-6 w-6 -translate-y-1/2 text-dark-gray transition-all',
                shouldFloatLabelDatePicker ? 'mt-2' : 'mt-0',
                isDatePickerFocussed ? 'text-primary' : 'text-dark-gray',
              )}
            />

            {/* TODO: Add info tooltip to mention if no date is selected expiry will be set to one year */}
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
            disabled={isPending}
            ref={buttonRef}
            className="h-[var(--input-height)] w-full cursor-pointer rounded-sm border-2 border-dark-gray bg-dark-gray/60 py-3 text-light-gray transition-colors duration-300 hover:bg-dark-gray/40 focus:border-primary focus:outline-none md:w-[20%] md:[border-top-left-radius:4px] md:[border-top-right-radius:50px] md:[border-bottom-right-radius:50px] md:[border-bottom-left-radius:4px]"
          >
            {isPending ? <DotLoader /> : 'Shorten!'}
          </motion.button>
        </motion.div>
      </form>

      {shortUrl && (
        <SuccessModal
          isOpen={isSuccessModalOpen}
          closeModal={closeSuccessModal}
          shortUrl={shortUrl}
          urlOutputRef={urlOutputRef}
          isCopied={isCopied}
          handleCopyToClipboard={handleCopyToClipboard}
        />
      )}

      {errorMessage && <ErrorModal isOpen={isErrorModalOpen} closeModal={closeErrorModal} errorMessage={errorMessage} />}
    </>
  );
};
