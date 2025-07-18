'use client';

import { useAuth, useSignIn } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Send the password reset code to the user's email
  const createPasswordResetCode = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const signInAttempt = await signIn?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });

      if (signInAttempt.status === 'complete') {
        setSuccessfulCreation(true);
        setError('');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        console.error('error', error.errors[0]?.longMessage);
        setError(error.errors[0]?.longMessage ?? null);
      }
    }
  };

  // Reset the user's password. Upon successful reset, the user will be signed in and redirected to the home page
  const resetPassword = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const signInAttempt = await signIn?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });

      if (signInAttempt.status === 'complete') {
        setActive({ session: signInAttempt.createdSessionId });
        setError('');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        console.error('error', error.errors[0]?.longMessage);
        setError(error.errors[0]?.longMessage ?? null);
      }
    }
  };

  return (
    <>
      <h1>Forgot Password?</h1>

      <form onSubmit={!successfulCreation ? createPasswordResetCode : resetPassword}>
        {!successfulCreation && (
          <>
            <label htmlFor="email">Provide your email address</label>
            <input type="email" placeholder="e.g john@doe.com" value={email} onChange={(e) => setEmail(e.target.value)} />

            <button>Send password reset code</button>
            {error && <p>{error}</p>}
          </>
        )}

        {successfulCreation && (
          <>
            <label htmlFor="password">Enter your new password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <label htmlFor="password">Enter the password reset code that was sent to your email</label>
            <input type="code" value={code} onChange={(e) => setCode(e.target.value)} />

            <button>Reset</button>
            {error && <p>{error}</p>}
          </>
        )}
      </form>
    </>
  );
};
