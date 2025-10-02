'use client';

import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../atoms/Button';

interface DropdownMenuContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextType | null>(null);

const useDropdownMenuContext = () => {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) throw new Error('DropdownMenu is not initialized');
  return ctx;
};

const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((v) => !v);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    };
    if (isOpen) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [isOpen]);

  return (
    <DropdownMenuContext.Provider value={{ isOpen, open, close, toggle }}>
      <div ref={ref} className='relative'>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};

const DropdownMenuTrigger = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { toggle, isOpen } = useDropdownMenuContext();
  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={toggle}
      aria-haspopup='true'
      aria-expanded={isOpen}
      className={className}
      asChild
    >
      {children}
    </Button>
  );
};

const DropdownMenuContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { isOpen } = useDropdownMenuContext();
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'bg-card text-card-foreground absolute right-0 z-50 mt-2 flex w-48 flex-col overflow-hidden rounded-md border shadow-lg',
        className
      )}
      role='menu'
    >
      {children}
    </div>
  );
};

const DropdownMenuLabel = ({
  children,
  inset,
  className,
}: {
  children: React.ReactNode;
  inset?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'text-muted-foreground px-3 py-1.5 text-sm font-medium',
        inset && 'pl-8',
        className
      )}
      role='presentation'
    >
      {children}
    </div>
  );
};

const DropdownMenuSeparator = ({ className }: { className?: string }) => {
  return (
    <div className={cn('bg-border my-1 h-px', className)} role='separator' />
  );
};

const DropdownMenuItem = ({
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
  const { close } = useDropdownMenuContext();
  const Comp = asChild ? Slot : 'div';
  const handleClick = () => {
    onSelect?.();
    close();
  };
  return (
    <Comp
      onClick={handleClick}
      className={cn(
        'hover:bg-accent hover:text-primary flex w-full cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm',
        className
      )}
      role='menuitem'
    >
      {children}
    </Comp>
  );
};

DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Label = DropdownMenuLabel;
DropdownMenu.Separator = DropdownMenuSeparator;
DropdownMenu.Item = DropdownMenuItem;

export default DropdownMenu;
