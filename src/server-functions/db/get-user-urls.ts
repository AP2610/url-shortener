'use server';

import prisma from '@/lib/db/prisma';
import { URL } from '@/generated/prisma';
import { auth } from '@clerk/nextjs/server';

export const getUserUrlsErrorMessage = async (errorType: string) => {
  switch (errorType) {
    case 'user-not-signed-in':
      return 'Please sign in to view your urls.';
    case 'user-not-found':
      return 'The user with the provided credentials was not found. Please contact support.';
    case 'no-urls-found':
      return 'You have not created any urls yet. Create one to get started.';
    default:
      return 'An unknown error occurred. Please contact support.';
  }
};

export const getUserUrls = async (): Promise<{
  success: boolean;
  errorType?: string;
  longMessage?: string;
  urls: URL[];
}> => {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      errorType: 'user-not-signed-in',
      longMessage: await getUserUrlsErrorMessage('user-not-signed-in'),
      urls: [],
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
    include: {
      urls: true,
    },
  });

  if (!user) {
    return {
      success: false,
      errorType: 'user-not-found',
      longMessage: await getUserUrlsErrorMessage('user-not-found'),
      urls: [],
    };
  }

  if (user.urls.length === 0) {
    return {
      success: true,
      errorType: 'no-urls-found',
      longMessage: await getUserUrlsErrorMessage('no-urls-found'),
      urls: [],
    };
  }

  return {
    success: true,
    urls: user?.urls,
  };
};
