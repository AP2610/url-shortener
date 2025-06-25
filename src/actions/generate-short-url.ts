'use server';

import prisma from '@/lib/db/prisma';
import { nanoid } from 'nanoid';

const BASE_URL = process.env.BASE_URL;

export const generateShortUrl = async ({ url, expiryDate }: { url: string; expiryDate: Date }) => {
  const shortCode = nanoid(6);
  const shortUrl = `${BASE_URL}/${shortCode}`;

  await prisma.uRL.create({
    data: {
      url,
      shortCode,
      shortUrl,
      expiresAt: expiryDate,
    },
  });

  return shortUrl;
};
