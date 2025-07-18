'use client';

import { AuthenticationForm } from '@/components/features/authentication/authentication-form';
import { VerificationForm } from '@/components/features/authentication/verification-form';
import { useSignUp } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { type ClerkAPIError } from '@clerk/types';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';

// TODO: Add loading state when submitting the form
// TODO: Implement error handling
export const SignUpForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Handle submission of the sign-up form
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Clear any errors that may have occurred during previous form submission
    setErrors(undefined);

    if (!isLoaded) return;

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Start the sign-up process using the email and password provided
    try {
      setIsLoading(true);

      await signUp.create({
        emailAddress: email,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerifying(true);
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        setErrors(err.errors);
      }

      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle the submission of the verification form
  const handleVerify = async (event: FormEvent<HTMLFormElement>, code: string) => {
    event.preventDefault();

    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.push('/');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2));
    }
  };

  // Display the verification form to capture the OTP code
  if (verifying) {
    return <VerificationForm handleVerify={handleVerify} />;
  }

  return (
    <>
      <AuthenticationForm
        buttonText="Sign Up"
        formTitle="Sign Up"
        onSubmit={handleSubmit}
        type="register"
        errors={errors}
        isLoading={isLoading}
      />

      {/* Clerk captcha for bot protection */}
      <div id="clerk-captcha" />
    </>
  );
};
