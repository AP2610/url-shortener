'use server';

import prisma from '@/lib/db/prisma';
import { UrlGenerationResult } from '@/lib/types/db';
import { generateShortCode } from '@/lib/utils/url-utils';
import { revalidatePath } from 'next/cache';

const BASE_URL = process.env.BASE_URL;

export const generateShortUrl = async ({
  url,
  expiryDate,
}: {
  url: string;
  expiryDate: Date | null;
}): Promise<UrlGenerationResult> => {
  const shortCode = generateShortCode();
  const shortUrl = `${BASE_URL}/${shortCode}`;
  const defaultExpiry = new Date(Date.now() + 1 * 365 * 24 * 60 * 60 * 1000); // 1 year

  try {
    await prisma.uRL.create({
      data: {
        url,
        shortCode,
        shortUrl,
        expiresAt: expiryDate || defaultExpiry,
      },
    });

    // Revalidate the admin page so the new url shows up on the next load.
    revalidatePath('/admin');

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
