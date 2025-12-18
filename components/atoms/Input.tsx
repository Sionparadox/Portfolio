import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  multiline?: boolean;
};

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ className, multiline, ...props }, ref) => {
    const baseStyles = cn(
      'border-input bg-background w-full rounded-lg border px-3 py-2 text-sm transition-colors outline-none',
      'focus:border-primary',
      'placeholder:text-muted-foreground',
      className
    );

    if (multiline) {
      return (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={cn(baseStyles, 'resize-none')}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      );
    }

    return (
      <input
        ref={ref as React.Ref<HTMLInputElement>}
        className={baseStyles}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
