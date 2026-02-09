'use client';

import * as Portal from '@radix-ui/react-portal';
import { Slot } from '@radix-ui/react-slot';
import { useAtomValue } from 'jotai';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { mountedAtom } from '../../atoms/mounted';
import { cn } from '../../lib/utils';
import HamburgerButton from '../atoms/HamburgerButton';

interface SidebarContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

const useSidebarContext = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('Sidebar is not initialized');
  return ctx;
};

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((v) => !v);

  // 페이지 변경 시 사이드바 닫기
  useEffect(() => {
    //eslint-disable-next-line react-hooks/set-state-in-effect
    close();
  }, [pathname]);

  // ESC 키로 닫기
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };
    if (isOpen) document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <SidebarContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
};

const SidebarTrigger = ({ className }: { className?: string }) => {
  const { toggle, isOpen } = useSidebarContext();
  const mounted = useAtomValue(mountedAtom);

  return (
    <>
      <div
        className={cn('flex h-10 w-10 items-center justify-center', className)}
        aria-hidden='true'
        style={{ opacity: mounted ? 0 : 1 }}
      >
        <HamburgerButton />
      </div>
      {mounted && (
        <Portal.Root>
          <div
            className={cn(
              'fixed z-101 flex h-10 w-10 items-center justify-center',
              'top-3 right-4',
              'sm:hidden',
              className
            )}
          >
            <HamburgerButton isOpen={isOpen} onClick={toggle} />
          </div>
        </Portal.Root>
      )}
    </>
  );
};

const SidebarContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { isOpen, close } = useSidebarContext();

  return (
    <AnimatePresence>
      {isOpen && (
        <Portal.Root>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-100 bg-black/50 backdrop-blur-sm'
            onClick={close}
            aria-hidden='true'
          />

          {/* Sidebar */}
          <motion.div
            className={cn(
              'bg-card/90 text-foreground fixed top-0 right-0 z-100 h-dvh w-full max-w-md overflow-y-auto shadow-2xl backdrop-blur-md',
              className
            )}
            role='dialog'
            aria-modal='true'
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              duration: 0.5,
              ease: [0.77, 0.2, 0.05, 1.0],
            }}
          >
            <div className='flex h-full flex-col'>{children}</div>
          </motion.div>
        </Portal.Root>
      )}
    </AnimatePresence>
  );
};

const SidebarHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between border-b p-4',
        className
      )}
    >
      {children}
    </div>
  );
};

const SidebarNav = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <nav
      className={cn('flex flex-1 flex-col gap-2 px-4 py-8', className)}
      role='navigation'
    >
      {children}
    </nav>
  );
};

const SidebarItem = ({
  children,
  onSelect,
  className,
  asChild,
}: {
  children: React.ReactNode;
  onSelect?: () => void;
  className?: string;
  asChild?: boolean;
}) => {
  const { close } = useSidebarContext();
  const Comp = asChild ? Slot : 'div';
  const handleClick = () => {
    onSelect?.();
    close();
  };
  return (
    <Comp
      onClick={handleClick}
      className={cn(
        'hover:bg-accent hover:text-primary flex w-full cursor-pointer items-center gap-2 rounded-md px-6 py-6 text-xl font-semibold transition-colors',
        className
      )}
      role='menuitem'
    >
      {children}
    </Comp>
  );
};

const SidebarFooter = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn('border-t p-6', className)}>{children}</div>;
};

Sidebar.Trigger = SidebarTrigger;
Sidebar.Content = SidebarContent;
Sidebar.Header = SidebarHeader;
Sidebar.Nav = SidebarNav;
Sidebar.Item = SidebarItem;
Sidebar.Footer = SidebarFooter;

export default Sidebar;
