import { cn } from '@/lib/utils';

type AccentTitleProps = {
  text?: string;
  accentText?: string;
  description?: string;
  className?: string;
};
const AccentTitle = ({
  text = '',
  accentText = '',
  description = '',
  className = '',
}: AccentTitleProps) => {
  return (
    <div>
      <h1
        className={cn(
          'text-foreground text-3xl font-black md:text-5xl',
          className
        )}
      >
        {text}{' '}
        <span className='from-secondary to-primary bg-linear-to-tr bg-clip-text text-transparent'>
          {accentText}
        </span>
      </h1>
      {description && (
        <p className='text-muted-foreground mt-2 text-lg leading-relaxed'>
          {description}
        </p>
      )}
    </div>
  );
};

export default AccentTitle;
