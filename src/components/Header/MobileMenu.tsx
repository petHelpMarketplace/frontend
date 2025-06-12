// src/components/Header/MobileMenu.tsx

import React, { useEffect, useRef, useCallback } from 'react';
import Modal from '@/shared/components/UI/Modal';
import { LangSwitch } from '@/components/Header/LangSwitch';
import { Navigation } from '@/components/Header/Navigation';
import { UserActions } from '@/components/Header/UserActions';
import clsx from 'clsx';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
};

const MobileMenu = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
}: MobileMenuProps) => {
  // Reference to the menu container (for focus management)
  const menuRef = useRef<HTMLDivElement>(null);
  // Reference to the element that was focused before menu opened (for focus restoration)
  const prevActiveElement = useRef<HTMLElement | null>(null);

  // Effect: When menu opens, trap focus in the menu and restore previous focus on close
  useEffect(() => {
    if (isOpen) {
      // Save currently focused element so we can restore it later
      prevActiveElement.current = document.activeElement as HTMLElement;

      // Wait until menu is rendered, then focus the first interactive element inside
      setTimeout(() => {
        if (menuRef.current) {
          const focusableElements =
            menuRef.current.querySelectorAll<HTMLElement>(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
          if (focusableElements.length > 0) {
            focusableElements[0].focus();
          } else {
            // If no interactive elements, focus menu container itself
            menuRef.current.focus();
          }
        }
      }, 0);
    } else {
      // On close: restore focus to the previously focused element
      if (prevActiveElement.current) {
        prevActiveElement.current.focus();
      }
    }
  }, [isOpen]);

  // Callback: Trap Tab/Shift+Tab navigation within the menu while open
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;

      // Handle tab focus loop inside menu
      if (event.key === 'Tab' && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          // If Shift+Tab on first element, move focus to last
          if (
            document.activeElement === firstFocusable ||
            document.activeElement === menuRef.current
          ) {
            lastFocusable?.focus();
            event.preventDefault();
          }
        } else {
          // If Tab on last element, move focus to first
          if (document.activeElement === lastFocusable) {
            firstFocusable?.focus();
            event.preventDefault();
          }
        }
      }
    },
    [isOpen]
  );

  // Effect: Attach/detach keydown event for focus trap while menu is open
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // If menu is not open, render nothing
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={clsx(
        'px-9 pt-[93px] pb-[26px] max-w-[90vw] flex flex-col overflow-y-auto'
      )}
    >
      <div
        ref={menuRef}
        className="relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        tabIndex={-1}
      >
        <h2 id="mobile-menu-title" className="sr-only">
          Mobile Menu
        </h2>

        <UserActions
          onLogin={onLogin}
          onRegister={onRegister}
          className="flex flex-col items-start gap-6 mb-12"
        />

        <div className="flex flex-row items-center justify-center mx-auto gap-9">
          <LangSwitch />
          <Navigation />
        </div>
      </div>
    </Modal>
  );
};

export default MobileMenu;
