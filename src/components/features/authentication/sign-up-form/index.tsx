'use client';

import { AuthenticationForm } from '@/components/features/authentication/authentication-form';
import { VerificationForm } from '@/components/features/authentication/verification-form';
import { Modal } from '@/components/ui/modal';
import { useModal } from '@/hooks/use-modal';
import { useSignUp } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { type ClerkAPIError } from '@clerk/types';
import { useRouter } from 'next/navigation';
import { type FormEvent, useEffect, useState } from 'react';

export const SignUpForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isOpen, showModal, closeModal } = useModal();

  useEffect(() => {
    if (verifying) {
      showModal();
    }
  }, [verifying]);

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

      // Set 'verifying' true to display second form and capture the OTP code
      setVerifying(true);
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        setErrors(error.errors);
      }

      console.error(JSON.stringify(error, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle the submission of the verification form
  const handleVerify = async (event: FormEvent<HTMLFormElement>, code: string) => {
    event.preventDefault();

    if (!isLoaded) return;

    try {
      setIsLoading(true);

      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.push('/');
      } else {
        setErrors([
          {
            code: 'email_sign_up_failed',
            message: 'Sign up failed. Please try again or contact support if the problem persists.',
          },
        ]);
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        setErrors(err.errors);
      }

      console.error('Error:', JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthenticationForm
        buttonText="Sign Up"
        formTitle="Sign Up"
        onSubmit={handleSubmit}
        type="signup"
        errors={errors}
        isLoading={isLoading}
      />

      {verifying && (
        <Modal isOpen={isOpen} closeModal={closeModal} preventCloseOnBackdropClick>
          <VerificationForm handleVerify={handleVerify} isLoading={isLoading} />
        </Modal>
      )}

      {/* Clerk captcha for bot protection */}
      <div id="clerk-captcha" />
    </>
  );
};
