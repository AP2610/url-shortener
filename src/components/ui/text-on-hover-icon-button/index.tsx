'use client';

import { cn } from '@/lib/utils/cn';
import { motion } from 'motion/react';
import { useState } from 'react';

interface TextOnHoverIconButtonProps {
  icon: React.ElementType;
  buttonLabel: string;
  className: string;
  onClick: () => void;
}

export const TextOnHoverIconButton = ({ icon, buttonLabel, className, onClick }: TextOnHoverIconButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const IconComponent = icon;

  return (
    <motion.button
      className={cn('btn-base w-auto min-w-[64px] rounded-md', className)}
      onClick={onClick}
      whileHover={{ width: '100%' }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <IconComponent
        className={cn('pointer-events-none block h-5 w-5 flex-shrink-0', {
          'mr-2': isHovered,
        })}
      />

      <motion.span
        className="pointer-events-none"
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: isHovered ? 'auto' : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
      >
        {buttonLabel}
      </motion.span>
    </motion.button>
  );
};
