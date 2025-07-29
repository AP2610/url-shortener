import prisma from '@/lib/db/prisma';
import { auth } from '@clerk/nextjs/server';

export const isAdmin = async () => {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
    select: {
      isAdmin: true,
    },
  });

  return user?.isAdmin ?? false;
};
