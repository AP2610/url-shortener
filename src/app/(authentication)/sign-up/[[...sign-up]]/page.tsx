import { SignUpForm } from '@/components/features/authentication/sign-up-form';

const SignUp = () => {
  return (
    <div className="container mx-auto flex h-full flex-col items-center justify-center gap-10 px-4 pt-[var(--header-height)]">
      <SignUpForm />
    </div>
  );
};

export default SignUp;
