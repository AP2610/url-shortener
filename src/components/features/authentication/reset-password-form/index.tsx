'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/forms/input';
import { Heading } from '@/components/ui/heading';
import { useEmailValidation } from '@/hooks/use-email-validation';
import { usePasswordValidation } from '@/hooks/use-password-validation';
import { useAuth, useSignIn } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ResetPasswordFormProps {
  formTitle: string;
}

export const ResetPasswordForm = ({ formTitle }: ResetPasswordFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { emailErrorMessage, hasEmail, handleEmailBlur, setEmailErrorMessage } = useEmailValidation(email);
  const { passwordErrorMessage } = usePasswordValidation(password);

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/');
    }
  }, [isSignedIn, router]);

  if (!isLoaded) {
    return null;
  }

  const handleBackToEmailClick = () => {
    setSuccessfulCreation(false);
    setEmail('');
    setPassword('');
    setCode('');
  };

  // Send the password reset code to the user's email
  const createPasswordResetCode = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Step 1: Create the sign-in with reset password strategy
      console.log('Running create');
      const signInResult = await signIn?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });
      console.log('signInResult', signInResult);

      const emailAddressId = signInResult?.supportedFirstFactors?.find(
        (factor) => factor.strategy === 'reset_password_email_code',
      )?.emailAddressId;

      console.log('emailAddressId', emailAddressId);

      // Step 2: Prepare the first factor to actually send the email

      setSuccessfulCreation(true);
      setError('');
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        setError(error.errors[0]?.longMessage ?? null);
      }
      console.error('error', error);
    }
  };

  // Reset the user's password. Upon successful reset, the user will be signed in and redirected to the home page
  const resetPassword = async (event: React.FormEvent) => {
    event.preventDefault();

    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })
      .then((result) => {
        if (result.status === 'complete') {
          // Set the active session to the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId });
          setError('');
        } else {
          setError('Failed to reset password. Please try again or contact support if the problem persists.');
          console.log(result);
        }
      })
      .catch((error) => {
        if (isClerkAPIResponseError(error)) {
          setError(error.errors[0]?.longMessage ?? null);
        }

        console.error('error', error.errors[0]?.longMessage);
      });
  };

  const isEmailValid = hasEmail && !emailErrorMessage;
  const isPasswordValid = !passwordErrorMessage;

  return (
    <form className="w-full space-y-8 p-8 md:w-90" onSubmit={!successfulCreation ? createPasswordResetCode : resetPassword}>
      <Heading level="h2">{formTitle}</Heading>

      {!successfulCreation && (
        <div className="space-y-4">
          <p>Enter your email address below and we'll send you a password reset code to your email.</p>

          <Input
            id="email"
            label="Enter your email"
            autoFocus
            required
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={handleEmailBlur}
            onFocus={() => setEmailErrorMessage(null)}
            validationMessage={emailErrorMessage}
          />

          <Button type="submit" className="w-full" disabled={!isEmailValid}>
            Send password reset code
          </Button>

          {error && <p className="text-sm text-red">{error}</p>}
        </div>
      )}

      {successfulCreation && (
        <div className="space-y-4">
          <p>Enter your new password below and the password reset code that was sent to your email.</p>

          <Input
            id="password"
            label="Enter your new password"
            required
            type="password"
            name="password"
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            validationMessage={passwordErrorMessage}
          />

          <Input
            id="code"
            label="Enter code"
            required
            type="text"
            pattern="[0-9]*"
            name="code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />

          <Button type="submit" className="w-full" disabled={!isPasswordValid}>
            Reset
          </Button>

          {error && <p className="text-sm text-red">{error}</p>}

          <Button variant="inline" onClick={handleBackToEmailClick}>
            Back to email
          </Button>
        </div>
      )}
    </form>
  );
};
