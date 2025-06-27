'use client';

import { cn } from '@/lib/utils/cn';
import { ButtonHTMLAttributes } from 'react';
import { buttonStyles } from './button-styles';
import { ButtonVariants } from './types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: ButtonVariants;
  isRounded?: boolean;
  scrollTo?: string;
  disabled?: boolean;
}

export const Button = ({ children, className, onClick, variant = 'primary', isRounded = true, ...props }: ButtonProps) => {
  const classes = cn(
    {
      [buttonStyles.variants[variant]]: true,
      [buttonStyles.nonIconButtonStyles]: variant !== 'icon-button',
      'rounded-md': isRounded,
      'cursor-not-allowed opacity-50': 'disabled' in props && props.disabled,
    },
    className,
  );

  return (
    <button className={classes} onClick={onClick} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
};
