import FullScreenDotLoader from '@/components/ui/loaders/full-screen-dot-loader';
import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';

export const SSOCallbackPage = () => {
  return (
    <>
      <FullScreenDotLoader />
      <AuthenticateWithRedirectCallback />

      <div id="clerk-captcha" />
    </>
  );
};
