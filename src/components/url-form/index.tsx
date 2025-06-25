'use client';

import { generateShortUrl } from '@/actions/generate-short-url';
import { useState } from 'react';
import { MyDatePicker } from '../date-picker';
import { CiLink } from 'react-icons/ci';
import { motion, type MotionProps } from 'motion/react';

const createStaggerAnimation = (index: number, animation: MotionProps, staggerDelay: number = 0.2) => ({
  initial: animation.initial,
  animate: animation.animate,
  transition: {
    ...animation.transition,
    delay: index * staggerDelay,
  },
});

export const UrlForm = () => {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [expiryDate, setExpiryDate] = useState(new Date());
  console.log(shortUrl);

  const handleDateChange = (date: Date | null) => {
    setExpiryDate(date as Date);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const expiryDate = formData.get('expiryDate') as string;

    const urlGenerationData = {
      url: formData.get('url') as string,
      expiryDate: new Date(expiryDate),
    };

    const shortUrl = await generateShortUrl(urlGenerationData);
    setShortUrl(shortUrl);
  };

  // To do, show modal with short url and button to copy to clipboard

  return (
    <form onSubmit={handleFormSubmit} className="flex w-full max-w-3xl flex-col items-center gap-6">
      <motion.div
        {...createStaggerAnimation(0, {
          initial: { opacity: 0, y: -50 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, type: 'spring', stiffness: 100, damping: 10 },
        })}
        className="relative h-[var(--input-height)] w-full rounded-full border-2 border-dark-gray bg-blue-black text-light-gray focus-within:border-primary"
      >
        <input
          required
          placeholder=""
          className="peer h-full w-full max-w-[calc(100%-168px)] appearance-none pt-7 pr-4 pb-3 pl-12 transition-all focus:outline-none"
          type="url"
          name="url"
        />
        <CiLink className="absolute top-1/2 left-3 h-6 w-6 -translate-y-1/2 -rotate-45 transition-all peer-focus:rotate-45 peer-focus:text-primary" />

        <label
          className="absolute left-12 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-4 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:text-xs"
          htmlFor="url"
        >
          Enter your link here
        </label>

        <button
          type="submit"
          className="absolute top-1/2 right-2 w-[160px] -translate-y-1/2 rounded-full bg-tertiary py-3 text-black transition-all hover:bg-tertiary/80"
        >
          Shorten now!
        </button>
      </motion.div>

      <motion.div
        {...createStaggerAnimation(
          1,
          {
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, type: 'spring', stiffness: 100, damping: 10 },
          },
          0.4,
        )}
        className="flex flex-col gap-2"
      >
        <MyDatePicker showIcon name="expiryDate" selected={expiryDate} onChange={handleDateChange} />
        <motion.label
          {...createStaggerAnimation(
            0,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.5 },
            },
            0.4,
          )}
          htmlFor="expiryDate"
          className="text-sm text-light-gray"
        >
          Expiry date
        </motion.label>
      </motion.div>
    </form>
  );
};
