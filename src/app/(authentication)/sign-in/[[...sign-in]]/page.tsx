import { LoginForm } from '@/components/features/authentication/login-form';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const Login = async () => {
  const { userId } = await auth();

  if (userId) {
    return redirect('/');
  }

  return (
    <div className="container mx-auto flex h-full flex-col items-center justify-center gap-10 px-4 pt-[var(--header-height)]">
      <LoginForm />
    </div>
  );
};

export default Login;
