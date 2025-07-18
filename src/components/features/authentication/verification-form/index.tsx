'use client';

import { useState } from 'react';

interface VerificationFormProps {
  handleVerify: (e: React.FormEvent<HTMLFormElement>, code: string) => void;
}

// TODO: Add loading state when submitting the form
// TODO: Style the form
// TODO: Handle paste in OTP field. Create 6 inputs, pasting into each one. Create hidden input for whole code.
export const VerificationForm = ({ handleVerify }: VerificationFormProps) => {
  const [code, setCode] = useState('');

  return (
    <>
      <h1>Verify your email</h1>
      <form onSubmit={(e) => handleVerify(e, code)}>
        <label id="code">Enter your verification code</label>
        <input value={code} id="code" name="code" onChange={(e) => setCode(e.target.value)} />
        <button type="submit">Verify</button>
      </form>
    </>
  );
};
