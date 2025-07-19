'use client';

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
import { useState } from 'react';
import { ResetPasswordForm } from '../reset-password-form';

interface AuthenticationFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  formTitle: string;
  buttonText: string;
  type: 'login' | 'register';
  errors?: ClerkAPIError[];
  isLoading?: boolean;
}

export const AuthenticationForm = ({ onSubmit, formTitle, buttonText, type, errors, isLoading }: AuthenticationFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { emailErrorMessage, hasEmail, handleEmailBlur, setEmailErrorMessage } = useEmailValidation(email);
  const { passwordErrorMessage } = usePasswordValidation(password);
  const { isOpen, showModal: showResetPasswordModal, closeModal } = useModal();

  const isFormValid = hasEmail && !emailErrorMessage && !passwordErrorMessage;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormValid) {
      onSubmit(event);
    }
  };

  return (
    <>
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

            <Button variant="primary" className="w-full rounded-sm" type="submit" disabled={!isFormValid || isLoading}>
              {isLoading ? <DotLoader color="white" /> : buttonText}
            </Button>
          </div>
        </form>

        {type === 'register' ? (
          <p className="text-center text-dark-gray">
            Already have an account? <MyLink href="/login">Login</MyLink>.
          </p>
        ) : (
          <div className="space-y-2">
            <p className="text-center text-dark-gray">
              Don't have an account? <MyLink href="/sign-up">Register</MyLink>.
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

        {errors?.length && (
          <ul className="text-sm text-red">
            {errors.map((error, index) => (
              <li key={index}>{error.longMessage}</li>
            ))}
          </ul>
        )}
      </div>

      {type === 'login' && (
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <ResetPasswordForm formTitle="Forgot Password?" />
        </Modal>
      )}
    </>
  );
};
