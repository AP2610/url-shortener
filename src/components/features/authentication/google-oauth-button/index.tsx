'use client';

import { Connection as ClerkConnection } from '@clerk/elements/common';
import { SiGoogle } from 'react-icons/si';
import * as ClerkSignUp from '@clerk/elements/sign-up';
import * as ClerkSignIn from '@clerk/elements/sign-in';
import { type AuthenticationType } from '@/components/features/authentication/types';

const OAuthButton = ({ type }: { type: AuthenticationType }) => {
  return (
    <ClerkConnection className="btn-base btn-secondary w-full rounded-md" name="google">
      <SiGoogle className="mr-6" />
      {type === 'login' ? 'Login' : 'Sign up'} with Google
    </ClerkConnection>
  );
};

interface GoogleOAuthButtonProps {
  type: AuthenticationType;
}

export const GoogleOAuthButton = ({ type }: GoogleOAuthButtonProps) => {
  return type === 'login' ? (
    <ClerkSignIn.Root>
      <ClerkSignIn.Step name="start">
        <OAuthButton type={type} />
      </ClerkSignIn.Step>
    </ClerkSignIn.Root>
  ) : (
    <ClerkSignUp.Root>
      <ClerkSignUp.Step name="start">
        <OAuthButton type={type} />
      </ClerkSignUp.Step>
    </ClerkSignUp.Root>
  );
};
