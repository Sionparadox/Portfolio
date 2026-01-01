'use client';

import { ExperienceRadioType } from '@/types/radioGroup';
import { cn } from '@/lib/utils';

type ExperienceRadioProps = {
  value: ExperienceRadioType;
  onChange: (value: ExperienceRadioType) => void;
};

const gliderStyle = {
  experience: 'translate-x-0',
  education: 'translate-x-[100%]',
  certifications: 'translate-x-[200%]',
};

const options: ExperienceRadioType[] = [
  'experience',
  'education',
  'certifications',
];

const ExperienceRadio = ({ value, onChange }: ExperienceRadioProps) => {
  return (
    <div
      className='bg-glass-background shadow-glass-shadow border-glass-border text-muted-foreground relative flex w-full max-w-3xl overflow-hidden rounded-3xl border text-sm font-semibold shadow-lg backdrop-blur-sm sm:text-lg'
      role='radiogroup'
      aria-label='Experience type selection'
    >
      {options.map((optionValue) => (
        <div key={optionValue} className='flex w-1/3 shrink-0'>
          <input
            type='radio'
            id={optionValue}
            name='experience-radio'
            className='hidden'
            checked={value === optionValue}
            onChange={() => onChange(optionValue)}
            aria-checked={value === optionValue}
          />
          <label
            htmlFor={optionValue}
            className={cn(
              'relative z-2 flex w-full cursor-pointer items-center justify-center px-4 py-2 tracking-wide capitalize transition-colors duration-300',
              value === optionValue && 'text-foreground'
            )}
          >
            {optionValue}
          </label>
        </div>
      ))}
      <div
        className={cn(
          'gradient-neon-bg absolute top-0 bottom-0 z-1 w-1/3 rounded-3xl transition-transform duration-600',
          gliderStyle[value]
        )}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.37, 1.95, 0.66, 0.56)',
          boxShadow:
            '0 0 10px var(--glass-shadow) inset, 0 0 18px color-mix(in oklch, var(--neon) 80%, transparent)',
        }}
      />
    </div>
  );
};

export default ExperienceRadio;
