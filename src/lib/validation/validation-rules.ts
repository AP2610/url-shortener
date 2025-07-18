export const validationRules = {
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
