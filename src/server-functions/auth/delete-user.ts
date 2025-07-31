'use server';

import { clerkClient } from '@/lib/auth/clerk-client';
import { auth, type User } from '@clerk/nextjs/server';

export const deleteUser = async (): Promise<{ success: boolean; message: string; deletedUser?: User | null }> => {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      message: 'Unauthorized. Unable to delete user.',
    };
  }

  try {
    await clerkClient.users.deleteUser(userId);

    return {
      success: true,
      message: 'User deleted successfully.',
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'Unable to delete user.',
    };
  }
};
