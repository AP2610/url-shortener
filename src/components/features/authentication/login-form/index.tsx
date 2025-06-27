'use client';

import { AuthenticationForm } from '@/components/features/authentication/authentication-form';

export const LoginForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    console.log(email, password);
  };

  return <AuthenticationForm formTitle="Login" buttonText="Login" onSubmit={handleSubmit} type="login" />;
};
