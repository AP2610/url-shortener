import prisma from '@/lib/db/prisma';

export const setLastVisited = async ({ shortCode }: { shortCode: string }) => {
  try {
    await prisma.uRL.update({
      where: {
        shortCode,
      },
      data: {
        lastVisitedAt: new Date(),
      },
    });
  } catch (error) {
    console.error(error);

    return {
      hasError: true,
      message: 'Failed to set last visited',
    };
  }
};
