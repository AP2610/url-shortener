'use client';

import { buttonStyles } from '@/components/ui/button/button-styles';
import { ButtonVariants } from '@/components/ui/button/types';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';

type LinkVariants = ButtonVariants | 'inline';

const LinkStyles = {
  ...buttonStyles,
};

type MyLinkProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
  variant?: LinkVariants;
  showIcon?: boolean;
  isRounded?: boolean;
  target?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const MyLink = ({ children, href, className, target, variant = 'inline', isRounded = true, ...props }: MyLinkProps) => {
  const isInlineVariant = variant === 'inline';

  const classes = cn(
    {
      [LinkStyles.variants[variant as ButtonVariants]]: true,
      [LinkStyles.nonIconButtonStyles]: !isInlineVariant && variant !== 'icon-button',
      'rounded-md': isRounded && !isInlineVariant,
    },
    className,
  );

  return (
    <Link href={href as string} className={classes} target={target || '_self'} {...props}>
      {children}
    </Link>
  );
};
