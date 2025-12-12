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

const DropdownMenu = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
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
      <div ref={ref} className={cn('relative', className)}>
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
      size='iconSm'
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
        'bg-card/90 text-foreground absolute right-0 z-50 mt-2 flex w-48 flex-col overflow-hidden rounded-md border shadow-lg backdrop-blur-md',
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
        'hover:bg-accent hover:text-primary flex w-full cursor-pointer items-center gap-2 rounded-sm px-3 py-6 text-lg font-semibold',
        className
      )}
      role='menuitem'
    >
      {children}
    </Comp>
  );
};

// 커스텀 컴포넌트 삽입 영역 (Footer, 버튼 등)
const DropdownMenuFooter = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn('border-border border-t px-3 py-2', className)}
      role='presentation'
    >
      {children}
    </div>
  );
};

// 자유로운 커스텀 영역 (Separator 없이)
const DropdownMenuCustom = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('px-3 py-2', className)} role='presentation'>
      {children}
    </div>
  );
};

DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Label = DropdownMenuLabel;
DropdownMenu.Separator = DropdownMenuSeparator;
DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.Footer = DropdownMenuFooter;
DropdownMenu.Custom = DropdownMenuCustom;

export default DropdownMenu;
