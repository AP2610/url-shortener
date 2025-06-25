'use server';

import prisma from '@/lib/db/prisma';
import { nanoid } from 'nanoid';

const BASE_URL = process.env.BASE_URL;

export const generateShortUrl = async (formData: FormData): Promise<string> => {
  const url = formData.get('url') as string;

  const shortCode = nanoid(6);
  const shortUrl = `${BASE_URL}/${shortCode}`;

  await prisma.uRL.create({
    data: {
      url,
      shortCode,
      shortUrl,
    },
  });

  return shortUrl;
};
