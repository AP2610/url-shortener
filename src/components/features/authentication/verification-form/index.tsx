'use client';

import { DotLoader } from '@/components/ui/animation/dot-loader';
import { Button } from '@/components/ui/button';
import { CodeInput } from '@/components/ui/forms/code-input';
import { Heading } from '@/components/ui/heading';

interface VerificationFormProps {
  handleVerify: (e: React.FormEvent<HTMLFormElement>, code: string) => void;
  isLoading: boolean;
}

export const VerificationForm = ({ handleVerify, isLoading }: VerificationFormProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const code = formData.get('code') as string;
    handleVerify(event, code);
  };

  return (
    <form className="w-full space-y-8 p-8 md:w-90" onSubmit={handleSubmit}>
      <Heading level="h2">Verify your email</Heading>

      <label className="mb-4 block" htmlFor="code">
        Enter your verification code
      </label>

      <CodeInput length={6} hiddenInputName="code" />

      <Button variant="primary" className="w-full" disabled={isLoading}>
        {isLoading ? <DotLoader color="white" /> : 'Verify'}
      </Button>
    </form>
  );
};
