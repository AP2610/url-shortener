'use server';

import prisma from '@/lib/db/prisma';

export const incrementVisitCount = async (shortCode: string) => {
  try {
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
  } catch (error) {
    console.error(error);

    return {
      hasError: true,
      message: 'An error occurred while incrementing the visit count',
    };
  }
};
