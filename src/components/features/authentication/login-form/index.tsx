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

  // Handle the submission of the sign-in form
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
        // If the status is not complete, check why. User may need to
        // complete further steps.
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
