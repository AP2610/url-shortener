'use client';

import { useFloatingLabel } from '@/hooks/use-floating-label';
import { cn } from '@/lib/utils/cn';
import { InputHTMLAttributes, useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { Button } from '../../button';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  validationMessage?: string | null;
  manualAutoFocus?: boolean;
}

export const Input = ({
  label,
  containerClassName,
  inputClassName,
  labelClassName,
  validationMessage,
  onBlur,
  onFocus,
  onChange,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  // Need to use a hook to handle the label floating state due to mobile behavior
  const { inputRef, shouldFloatLabel, handleFocus, handleBlur, handleChange } = useFloatingLabel({
    autoFocus: props.autoFocus,
    onFocus,
    onBlur,
    onChange,
  });

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
          className={cn(
            'peer w-full appearance-none px-4 pt-7 pb-3 text-light-gray transition-all focus:outline-none',
            inputClassName,
          )}
          type={inputType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          ref={inputRef}
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
            'absolute left-4 text-dark-gray transition-all',
            shouldFloatLabel ? 'top-4 -translate-y-1/2 text-[11px]' : 'top-1/2 -translate-y-1/2 text-base',
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
