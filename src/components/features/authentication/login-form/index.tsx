'use client';

import { AuthenticationForm } from '@/components/features/authentication/authentication-form';
import { useSignIn } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { type ClerkAPIError } from '@clerk/types';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

export const LoginForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [errors, setErrors] = useState<ClerkAPIError[]>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Clear any errors that may have occurred during previous form submission
    setErrors(undefined);

    if (!isLoaded) return;

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Start the sign-in process using the email and password provided
    try {
      setIsLoading(true);

      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push('/');
      } else {
        setErrors([
          {
            code: 'email_sign_in_failed',
            message: 'Sign in failed. Please try again or contact support if the problem persists.',
          },
        ]);
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        setErrors(error.errors);
      }

      console.error(JSON.stringify(error, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthenticationForm
      formTitle="Login"
      buttonText="Login"
      onSubmit={handleSubmit}
      type="login"
      errors={errors}
      isLoading={isLoading}
    />
  );
};
