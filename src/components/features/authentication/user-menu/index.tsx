'use client';

import { DotLoader } from '@/components/ui/animation/dot-loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/forms/input';
import { Heading } from '@/components/ui/heading';
import { Modal } from '@/components/ui/modal';
import { useModal } from '@/hooks/use-modal';
import { deleteUser } from '@/server-functions/auth/delete-user';
import { useClerk } from '@clerk/nextjs';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { PiSignOutFill } from 'react-icons/pi';

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; right: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { signOut } = useClerk();
  const { isOpen: isDeleteAccountModalOpen, showModal: showDeleteAccountModal, closeModal: closeDeleteAccountModal } = useModal();

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && menuRef.current && event.target !== menuRef.current && event.target !== buttonRef.current) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && menuRef.current && event.target !== menuRef.current && event.target !== buttonRef.current) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const handleDeleteAccountSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const confirmation = formData.get('delete-confirmation');

    if (confirmation === 'DELETE') {
      try {
        setIsLoading(true);
        const deleteResponse = await deleteUser();

        if (deleteResponse.success) {
          signOut({ redirectUrl: '/' });
        } else {
          setError(deleteResponse.message);
        }
      } catch (error) {
        setError('An error occurred while deleting your account. Please try again.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteAccountClick = () => {
    showDeleteAccountModal();
  };

  const handleMenuButtonClick = () => {
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

  return (
    <>
      <div className="relative">
        <Button
          ref={buttonRef}
          variant="icon-button"
          title="User"
          className="rounded-full bg-primary p-2 transition-colors hover:bg-primary/80"
          onClick={handleMenuButtonClick}
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
              <Button variant="secondary" className="flex w-full items-center" onClick={() => signOut({ redirectUrl: '/' })}>
                <PiSignOutFill className="pointer-events-none mr-2 h-5 w-5" />
                Logout
              </Button>

              <Button variant="tertiary" className="w-full">
                Change Password
              </Button>

              <Button variant="danger" onClick={handleDeleteAccountClick} className="w-full">
                Delete Account
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Modal isOpen={isDeleteAccountModalOpen} closeModal={closeDeleteAccountModal}>
        <div className="w-64 space-y-8 p-2">
          <Heading level="h2">Are you sure?</Heading>

          <form className="w-full space-y-8" onSubmit={handleDeleteAccountSubmit}>
            <Input id="delete-confirmation" name="delete-confirmation" label="Enter 'DELETE' to confirm" type="text" required />

            <Button variant="danger" type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <DotLoader color="white" /> : 'Delete Account'}
            </Button>
          </form>

          {error && <p className="text-red">{error}</p>}
        </div>
      </Modal>
    </>
  );
};
