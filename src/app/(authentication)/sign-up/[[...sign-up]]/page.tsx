import { SignUpForm } from '@/components/features/authentication/sign-up-form';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const SignUp = async () => {
  const { userId } = await auth();

  if (userId) {
    return redirect('/');
  }

  return (
    <div className="container mx-auto flex h-full flex-col items-center justify-center gap-10 px-4 pt-[var(--header-height)]">
      <SignUpForm />
    </div>
  );
};

export default SignUp;
