// src/components/Header/MobileMenu.tsx

import React, { useEffect, useRef, useCallback } from 'react';
import Modal from '@/components/Ui/Modal/Modal';
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

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const prevActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      prevActiveElement.current = document.activeElement as HTMLElement;

      setTimeout(() => {
        if (menuRef.current) {
          const focusableElements =
            menuRef.current.querySelectorAll<HTMLElement>(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
          if (focusableElements.length > 0) {
            focusableElements[0].focus();
          } else {
            menuRef.current.focus();
          }
        }
      }, 0);
    } else {
      if (prevActiveElement.current) {
        prevActiveElement.current.focus();
      }
    }
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === 'Tab' && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (
            document.activeElement === firstFocusable ||
            document.activeElement === menuRef.current
          ) {
            lastFocusable?.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable?.focus();
            event.preventDefault();
          }
        }
      }
    },
    [isOpen]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={clsx(
        'rounded-3xl px-[35px] py-[24px] w-[345px] max-w-[90vw] flex flex-col overflow-y-auto'
      )}
    >
      <div
        ref={menuRef}
        className="relative"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        tabIndex={-1}
      >
        <h2 id="mobile-menu-title" className="sr-only">
          Mobile Menu
        </h2>
        {/* Кнопка закриття від Modal.tsx вже рендериться, тому її не потрібно дублювати тут. */}
        {/*
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="absolute top-6 right-4"
        >
          <svg className="w-[14px] h-[14px] fill-fire shadow-inset-thin [stroke-width:1.5]">
            <use href="/icons.svg#icon-close-btn" />
          </svg>
        </button>
        */}

        <div className="mb-12 pt-[59px]">
          <UserActions
            onLogin={onLogin}
            onRegister={onRegister}
            className="flex flex-col items-start gap-6"
          />
        </div>
        <div className="flex flex-row items-center justify-center mx-auto gap-9">
          <LangSwitch />
          <Navigation />
        </div>
      </div>
    </Modal>
  );
};

export default MobileMenu;
