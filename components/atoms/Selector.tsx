'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectorProps {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

const Selector = ({ value, options, onChange }: SelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || options[0]?.label;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='bg-card focus:ring-primary flex min-w-[120px] items-center justify-between gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors focus:ring focus:outline-none'
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          className={cn(
            isOpen ? 'rotate-180' : '',
            'transition-transform duration-300'
          )}
        />
      </button>

      {isOpen && (
        <div className='bg-card absolute right-0 z-10 mt-2 w-full min-w-[120px] overflow-hidden rounded-lg border shadow-lg'>
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                'w-full px-4 py-2 text-left text-sm transition-colors',
                value === option.value
                  ? 'bg-foreground text-background'
                  : 'hover:bg-accent hover:text-accent-foreground'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Selector;
