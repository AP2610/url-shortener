'use client';

import { generateShortUrl } from '@/actions/generate-short-url';
import { useState } from 'react';
import { MyDatePicker } from '../date-picker';

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
    <form onSubmit={handleFormSubmit}>
      <input className="rounded-md border-2 border-gray-300 p-2" type="url" name="url" />
      <MyDatePicker name="expiryDate" selected={expiryDate} onChange={handleDateChange} />
      <button type="submit">Shorten</button>
    </form>
  );
};
