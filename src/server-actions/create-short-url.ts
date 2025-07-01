'use server';

import { UrlGenerationResult } from '@/lib/types/db';
import { sanitizeUrlInput, validateUrl } from '@/lib/utils/url-utils';
import { generateShortUrl } from '@/server-functions/db/generate-short-url';

export const createShortUrl = async (prevState: UrlGenerationResult, formData: FormData): Promise<UrlGenerationResult> => {
  const url = sanitizeUrlInput(formData.get('url') as string);
  const expiryDate = formData.get('expiryDate') as string;

  console.log('expiryDate: ', expiryDate);

  const { isValid, errorMessage } = validateUrl(url);

  if (!isValid && errorMessage) {
    return {
      hasError: true,
      message: errorMessage,
      shortUrl: null,
    };
  }

  const urlGenerationData = {
    url,
    expiryDate: expiryDate ? new Date(expiryDate) : null,
  };

  try {
    const { hasError, message, shortUrl } = await generateShortUrl(urlGenerationData);

    if (hasError) {
      return {
        hasError: true,
        message,
        shortUrl,
      };
    }

    return {
      hasError: false,
      message,
      shortUrl,
    };
  } catch (error) {
    console.error(error);

    return {
      hasError: true,
      message: 'An error occurred while generating the short URL',
      shortUrl: null,
    };
  }
};
