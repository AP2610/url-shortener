'use client';

import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { PiSignOutFill } from 'react-icons/pi';

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; right: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    setIsOpen(!isOpen);

    getMenuPosition();
  };

  const getMenuPosition = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const menuTop = buttonRect.bottom;

      setMenuPosition({ top: menuTop, right: 0 + buttonRect.width / 2 });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && menuRef.current && event.target !== menuRef.current && event.target !== buttonRef.current) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="icon-button"
        title="User"
        className="rounded-full bg-primary p-2 transition-colors hover:bg-primary/80"
        onClick={handleClick}
      >
        <FaUser className="pointer-events-none text-white" />
      </Button>

      <AnimatePresence>
        {isOpen && menuPosition && (
          <motion.div
            ref={menuRef}
            className="absolute top-[calc(100%+10px)] z-[9999] min-w-[200px] space-y-4 rounded-md bg-blue-black p-6"
            style={{ right: menuPosition.right }}
            initial={{ opacity: 0, y: -10, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, x: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <Button variant="secondary" className="flex w-full items-center">
              <PiSignOutFill className="pointer-events-none mr-2 h-5 w-5" />
              Logout
            </Button>

            <Button variant="tertiary" className="w-full">
              Change Password
            </Button>

            <Button variant="danger" className="w-full">
              Delete Account
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
