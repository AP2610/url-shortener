'use client';

import { cn } from '@/lib/utils/cn';
import { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
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
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isPassword = props.type === 'password';
  const inputType = isPassword && showPassword ? 'text' : props.type;

  const shouldFloatLabel = isFocused || hasValue;

  useEffect(() => {
    if (inputRef.current && props.autoFocus) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(event);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(event);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(event.target.value.length > 0);
    props.onChange?.(event);
  };

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
