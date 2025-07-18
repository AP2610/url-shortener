'use client';

import { useState } from 'react';
import { validationRules } from '@/lib/validation/validation-rules';

export const useEmailValidation = (
  email: string,
): {
  emailErrorMessage: string | null;
  hasEmail: boolean;
  handleEmailBlur: () => void;
  setEmailErrorMessage: (errorMessage: string | null) => void;
} => {
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(null);

  const hasEmail = email.length > 0;
  const isEmailValid = validationRules.email.regex.test(email);

  const getEmailValidation = () => {
    if (isEmailValid || !hasEmail) return null;

    return validationRules.email.errorMessage;
  };

  const handleEmailBlur = () => {
    const emailValidationMessage = getEmailValidation();
    setEmailErrorMessage(emailValidationMessage);
  };

  return {
    emailErrorMessage,
    hasEmail,
    handleEmailBlur,
    setEmailErrorMessage,
  };
};
