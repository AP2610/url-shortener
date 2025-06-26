'use server';

import prisma from '@/lib/db/prisma';
import { isUrlExpired } from '@/lib/utils/url-utils';
import { type URL as PrismaURL } from '../../../generated/prisma';

export const getUrlRecord = async (
  shortCode: string,
): Promise<{
  hasError: boolean;
  message: string;
  url: PrismaURL | null;
  isExpired: boolean;
}> => {
  try {
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
  } catch (error) {
    console.error(error);

    return {
      hasError: true,
      message: 'An error occurred while getting the URL record',
      url: null,
      isExpired: false,
    };
  }
};
