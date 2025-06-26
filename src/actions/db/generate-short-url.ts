'use server';

import prisma from '@/lib/db/prisma';
import { generateShortCode } from '@/lib/utils/url-utils';

const BASE_URL = process.env.BASE_URL;

export const generateShortUrl = async ({
  url,
  expiryDate,
}: {
  url: string;
  expiryDate: Date;
}): Promise<{
  hasError: boolean;
  message: string;
  shortUrl: string;
}> => {
  const shortCode = generateShortCode();
  const shortUrl = `${BASE_URL}/${shortCode}`;

  try {
    await prisma.uRL.create({
      data: {
        url,
        shortCode,
        shortUrl,
        expiresAt: expiryDate,
      },
    });

    return {
      hasError: false,
      message: 'Short URL generated successfully',
      shortUrl,
    };
  } catch (error) {
    console.error(error);

    return {
      hasError: true,
      message: 'An error occurred while generating the short URL',
      shortUrl: '',
    };
  }
};
