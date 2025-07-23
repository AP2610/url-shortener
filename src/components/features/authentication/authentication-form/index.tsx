'use client';

import { type AuthenticationType } from '@/components/features/authentication/types';
import { DotLoader } from '@/components/ui/animation/dot-loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/forms/input';
import { Heading } from '@/components/ui/heading';
import { Modal } from '@/components/ui/modal';
import { MyLink } from '@/components/ui/my-link';
import { useEmailValidation } from '@/hooks/use-email-validation';
import { useModal } from '@/hooks/use-modal';
import { usePasswordValidation } from '@/hooks/use-password-validation';
import { type ClerkAPIError } from '@clerk/types';
import { useEffect, useState } from 'react';
import { ResetPasswordForm } from '../reset-password-form';
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import FullScreenDotLoader from '@/components/ui/loaders/full-screen-dot-loader';
import { SiGoogle } from 'react-icons/si';
import { OAuthButton } from '@/components/features/authentication/oauth-button';
import { ErrorList } from '@/components/ui/errors/error-list';

interface AuthenticationFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  formTitle: string;
  buttonText: string;
  type: AuthenticationType;
  errors?: ClerkAPIError[];
  isLoading?: boolean;
}

export const AuthenticationForm = ({ onSubmit, formTitle, buttonText, type, errors, isLoading }: AuthenticationFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const { emailErrorMessage, hasEmail, handleEmailBlur, setEmailErrorMessage } = useEmailValidation(email);
  const { passwordErrorMessage } = usePasswordValidation(password);
  const { isOpen, showModal: showResetPasswordModal, closeModal } = useModal();

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isFormValid = hasEmail && !emailErrorMessage && !passwordErrorMessage;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormValid) {
      onSubmit(event);
    }
  };

  if (!isMounted) {
    return <FullScreenDotLoader />;
  }

  return (
    <>
      <ClerkLoading>
        <FullScreenDotLoader />
      </ClerkLoading>

      <ClerkLoaded>
        <div className="w-full space-y-8 rounded-sm bg-blue-black/70 p-8 shadow-md md:w-90">
          <form className="w-full space-y-8" onSubmit={handleSubmit}>
            <Heading level="h2">{formTitle}</Heading>

            <div className="w-full space-y-4">
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

              <Input
                id="password"
                label="Enter your password"
                required
                type="password"
                name="password"
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                validationMessage={passwordErrorMessage}
              />

              <div id="clerk-captcha" />

              <Button variant="primary" className="w-full rounded-sm" type="submit" disabled={!isFormValid || isLoading}>
                {isLoading ? <DotLoader color="white" /> : buttonText}
              </Button>
            </div>
          </form>

          {type === 'signup' ? (
            <p className="text-center text-dark-gray">
              Already have an account? <MyLink href="/sign-in">Sign in</MyLink>.
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-center text-dark-gray">
                Don't have an account? <MyLink href="/sign-up">Sign up</MyLink>.
              </p>

              <p className="text-center text-dark-gray">
                Forgot Password?{' '}
                <Button variant="inline" className="p-0 text-base" onClick={showResetPasswordModal}>
                  Reset
                </Button>
                .
              </p>
            </div>
          )}

          <p className="text-center text-dark-gray">OR</p>

          {/* Sign in/up with google */}
          <OAuthButton type={type} oAuthStrategy="oauth_google">
            <SiGoogle className="mr-4" />
            {type === 'signin' ? 'Sign in' : 'Sign up'} with Google
          </OAuthButton>

          {errors?.length && <ErrorList<ClerkAPIError> errors={errors} />}
        </div>

        {type === 'signin' && (
          <Modal isOpen={isOpen} closeModal={closeModal}>
            <ResetPasswordForm formTitle="Forgot Password?" />
          </Modal>
        )}
      </ClerkLoaded>
    </>
  );
};
