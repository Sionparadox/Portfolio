import { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';
import Input from '../atoms/Input';

type LabelInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  multiline?: boolean;
  wrapperClassName?: string;
};

const LabelInput = forwardRef<HTMLInputElement, LabelInputProps>(
  (
    { label, error, className, multiline, wrapperClassName, id, ...props },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className={cn('flex flex-col gap-1 text-left', wrapperClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className='text-foreground text-md font-medium'
          >
            {label}
          </label>
        )}
        <Input
          ref={ref}
          id={inputId}
          className={cn(error && 'border-destructive', className)}
          multiline={multiline}
          {...props}
        />
        <p className='text-destructive min-h-5 text-sm'>{error}</p>
      </div>
    );
  }
);

LabelInput.displayName = 'LabelInput';

export default LabelInput;
