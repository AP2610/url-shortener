'use client';

import { useFloatingLabel } from '@/hooks/use-floating-label';
import { cn } from '@/lib/utils/cn';
import { InputHTMLAttributes, useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { Button } from '../../button';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  validationMessage?: string | null;
  manualAutoFocus?: boolean;
}

export const Input = ({
  label,
  id,
  containerClassName,
  inputClassName,
  labelClassName,
  validationMessage,
  inputRef,
  onBlur,
  onFocus,
  onChange,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { type: inputTypeFromProps, ...restProps } = props;

  // Need to use a hook to handle the label floating state due to mobile behavior
  const { shouldFloatLabel, handleFocus, handleBlur, handleChange } = useFloatingLabel({
    autoFocus: props.autoFocus,
    onFocus,
    onBlur,
    onChange,
  });

  const isPassword = inputTypeFromProps === 'password';
  const inputType = isPassword && showPassword ? 'text' : inputTypeFromProps;

  return (
    <>
      <div
        className={cn(
          'relative w-full rounded-sm border-2 border-dark-gray bg-blue-black focus-within:border-primary',
          containerClassName,
        )}
      >
        <input
          id={id}
          required
          className={cn(
            'peer w-full appearance-none px-4 pt-7 pb-3 text-light-gray transition-all focus:outline-none',
            inputClassName,
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          ref={inputRef}
          type={inputType}
          {...restProps}
        />

        {inputTypeFromProps === 'password' && (
          <Button
            type="button"
            variant="icon-button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-4 z-10 -translate-y-1/2 text-dark-gray transition-all hover:text-light-gray"
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
          htmlFor={id}
        >
          {label}
        </label>
      </div>

      {validationMessage && <p className="text-sm text-red">{validationMessage}</p>}
    </>
  );
};
