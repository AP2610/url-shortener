'use client';

import { validationRules } from '@/lib/validation/validation-rules';
import { useEffect, useState } from 'react';

export const usePasswordValidation = (
  password: string,
): {
  passwordErrorMessage: string | null;
  getPasswordValidation: () => string | null;
} => {
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(null);

  const { specialCharacter, length, number } = validationRules.password;
  const hasMinLength = password.length >= length.min;
  const hasSpecialCharacter = specialCharacter.regex.test(password);
  const hasNumber = number.regex.test(password);
  const isPasswordValid = hasMinLength && hasSpecialCharacter && hasNumber;

  // Update the password error message when the password changes
  useEffect(() => {
    const passwordValidationMessage = getPasswordValidation();
    setPasswordErrorMessage(passwordValidationMessage);
  }, [password]);

  const getPasswordValidation = () => {
    if (password.length === 0) return null;
    if (isPasswordValid) return null;

    const errorMessages = [];
    if (!hasMinLength) errorMessages.push(length.errorMessage);
    if (!hasSpecialCharacter) errorMessages.push(specialCharacter.errorMessage);
    if (!hasNumber) errorMessages.push(number.errorMessage);

    return `Password must contain ${errorMessages.join(', ')}`;
  };

  return {
    passwordErrorMessage,
    getPasswordValidation,
  };
};
