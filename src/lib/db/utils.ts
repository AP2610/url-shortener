'use server';

import prisma from './prisma';
import { type URL } from '../../../generated/prisma';

export const isUrlExpired = async (expiryDate: Date | null) => {
  if (!expiryDate) {
    return false;
  }

  return expiryDate && expiryDate < new Date();
};

export const getUrlRecord = async (
  shortCode: string,
): Promise<{
  hasError: boolean;
  message: string;
  url: URL | null;
  isExpired: boolean;
}> => {
  const url = await prisma.uRL.findUnique({
    where: {
      shortCode,
    },
  });

  if (!url) {
    return {
      hasError: true,
      message: 'URL does not exist',
      url: null,
      isExpired: false,
    };
  }

  const isExpired = await isUrlExpired(url.expiresAt);

  return {
    hasError: false,
    message: 'URL found',
    url,
    isExpired,
  };
};

export const incrementVisitCount = async (shortCode: string) => {
  await prisma.uRL.update({
    where: {
      shortCode,
    },
    data: {
      visitCount: {
        increment: 1,
      },
    },
  });
};
