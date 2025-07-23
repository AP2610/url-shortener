import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';

export const SSOCallbackPage = () => {
  return (
    <>
      <AuthenticateWithRedirectCallback />

      <div id="clerk-captcha" />
    </>
  );
};
