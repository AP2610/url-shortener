'use client';

import { Button } from '@/components/ui/button';
import { ButtonVariants } from '@/components/ui/button/types';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { type OAuthStrategy } from '@clerk/types';
import { ClerkAPIError } from '@clerk/types';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { useState } from 'react';
import { ErrorList } from '@/components/ui/errors/error-list';
import { AuthenticationType } from '@/components/features/authentication/types';

interface OAuthSignInButtonProps {
  type: AuthenticationType;
  oAuthStrategy: OAuthStrategy;
  children: React.ReactNode;
  buttonVariant?: ButtonVariants;
}

export const OAuthButton = ({ type, oAuthStrategy, children, buttonVariant = 'secondary' }: OAuthSignInButtonProps) => {
  const [errors, setErrors] = useState<ClerkAPIError[]>();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();

  if (!signIn) {
    return null;
  }

  const continueWithOAuth = async (strategy: OAuthStrategy) => {
    setErrors(undefined);
    const redirectUrl = type === 'signin' ? '/sign-in/sso-callback' : '/sign-up/sso-callback';
    const redirectUrlComplete = '/';

    try {
      if (type === 'signin') {
        await signIn?.authenticateWithRedirect({
          strategy,
          redirectUrl,
          redirectUrlComplete,
        });
      } else {
        await signUp?.authenticateWithRedirect({
          strategy,
          redirectUrl,
          redirectUrlComplete,
        });
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        setErrors(error.errors);
      }

      console.error(JSON.stringify(error, null, 2));
    }
  };

  return (
    <>
      <Button variant={buttonVariant} onClick={() => continueWithOAuth(oAuthStrategy)} className="w-full">
        {children}
      </Button>

      {errors?.length && <ErrorList<ClerkAPIError> errors={errors} />}
    </>
  );
};
