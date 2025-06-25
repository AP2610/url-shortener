'use client';

import { generateShortUrl } from '@/actions/generate-short-url';
import { useState } from 'react';

export const UrlForm = () => {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  console.log(shortUrl);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const shortUrl = await generateShortUrl(formData);
    setShortUrl(shortUrl);
    console.log(shortUrl);
  };

  // To do, show modal with short url and button to copy to clipboard

  return (
    <form onSubmit={handleFormSubmit}>
      <input className="rounded-md border-2 border-gray-300 p-2" type="url" name="url" />
      <button type="submit">Shorten</button>
    </form>
  );
};
