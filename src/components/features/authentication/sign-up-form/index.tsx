'use client';

import { AuthenticationForm } from '@/components/features/authentication/authentication-form';

export const SignUpForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    console.log(email, password);
  };

  return <AuthenticationForm buttonText="Sign Up" formTitle="Sign Up" onSubmit={handleSubmit} />;
};
