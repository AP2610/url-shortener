'use client';

import { cn } from '@/lib/utils/cn';
import { InputHTMLAttributes, useState } from 'react';
import { Button } from '../../button';
import { IoEyeOff, IoEye } from 'react-icons/io5';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  validationMessage?: string | null;
}

export const Input = ({ label, containerClassName, inputClassName, labelClassName, validationMessage, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = props.type === 'password';
  const inputType = isPassword && showPassword ? 'text' : props.type;

  return (
    <>
      <div
        className={cn(
          'relative w-full rounded-sm border-2 border-dark-gray bg-blue-black focus-within:border-primary',
          containerClassName,
        )}
      >
        <input
          required
          placeholder=""
          className={cn(
            'peer w-full appearance-none px-4 pt-7 pb-3 text-light-gray transition-all focus:outline-none',
            inputClassName,
          )}
          type={inputType}
          {...props}
        />

        {props.type === 'password' && (
          <Button
            variant="icon-button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-dark-gray transition-all hover:text-light-gray"
          >
            {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
          </Button>
        )}

        <label
          className={cn(
            'absolute left-4 text-dark-gray transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-4 peer-focus:-translate-y-1/2 peer-focus:text-[11px] peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:text-[11px]',
            labelClassName,
          )}
          htmlFor={props.name}
        >
          {label}
        </label>
      </div>

      {validationMessage && <p className="text-sm text-red">{validationMessage}</p>}
    </>
  );
};
