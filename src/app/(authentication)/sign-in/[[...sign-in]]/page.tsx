import { SignInForm } from '@/components/features/authentication/sign-in-form';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const SignIn = async () => {
  const { userId } = await auth();

  if (userId) {
    return redirect('/');
  }

  return (
    <div className="container mx-auto flex h-full flex-col items-center justify-center gap-10 px-4 pt-[var(--header-height)]">
      <SignInForm />
    </div>
  );
};

export default SignIn;
