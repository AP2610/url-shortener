'use client';

import { DotLoader } from '@/components/ui/animation/dot-loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/forms/input';
import { Heading } from '@/components/ui/heading';
import { MyLink } from '@/components/ui/my-link';
import { type ClerkAPIError } from '@clerk/types';
import { useEffect, useState } from 'react';

const validationRules = {
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessage: 'Please enter a valid email address',
  },
  password: {
    specialCharacter: {
      regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
      errorMessage: 'at least one special character',
    },
    length: {
      min: 8,
      errorMessage: 'at least 8 characters',
    },
    number: {
      regex: /\d/,
      errorMessage: 'at least one number',
    },
  },
};

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
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(null);

  const handleEmailBlur = () => {
    const emailValidationMessage = getEmailValidation();
    setEmailErrorMessage(emailValidationMessage);
  };

  useEffect(() => {
    const passwordValidationMessage = getPasswordValidation();
    setPasswordErrorMessage(passwordValidationMessage);
  }, [password]);

  // email validation
  const hasEmail = email.length > 0;
  const isEmailValid = validationRules.email.regex.test(email);

  // password validation
  const { specialCharacter, length, number } = validationRules.password;
  const hasMinLength = password.length >= length.min;
  const hasSpecialCharacter = specialCharacter.regex.test(password);
  const hasNumber = number.regex.test(password);
  const isPasswordValid = hasMinLength && hasSpecialCharacter && hasNumber;

  const getEmailValidation = () => {
    if (isEmailValid || !hasEmail) return null;

    return validationRules.email.errorMessage;
  };

  const getPasswordValidation = () => {
    if (password.length === 0) return null;
    if (isPasswordValid) return null;

    const errorMessages = [];
    if (!hasMinLength) errorMessages.push(length.errorMessage);
    if (!hasSpecialCharacter) errorMessages.push(specialCharacter.errorMessage);
    if (!hasNumber) errorMessages.push(number.errorMessage);

    return `Password must contain ${errorMessages.join(', ')}`;
  };

  const isFormValid = hasEmail && !emailErrorMessage && !passwordErrorMessage;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormValid) {
      onSubmit(event);
    }
  };

  return (
    <form className="w-full space-y-8 rounded-sm bg-blue-black/70 p-8 shadow-md md:w-90" onSubmit={handleSubmit}>
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

      {type === 'register' ? (
        <p className="text-center text-dark-gray">
          Already have an account? <MyLink href="/login">Login</MyLink>.
        </p>
      ) : (
        <p className="text-center text-dark-gray">
          Don't have an account? <MyLink href="/sign-up">Register</MyLink>.
        </p>
      )}

      {errors?.length && (
        <ul className="text-sm text-red">
          {errors.map((error, index) => (
            <li key={index}>{error.longMessage}</li>
          ))}
        </ul>
      )}
    </form>
  );
};
