import { cn } from '@/lib/utils';

type AccentTitleProps = {
  as?: 'h1' | 'h2' | 'h3';
  text?: string;
  accentText?: string;
  text2?: string;
  color?: 'primary' | 'neon';
  description?: string;
  className?: string;
};

const colorClasses = {
  primary: 'from-secondary to-primary bg-linear-to-tr ',
  neon: 'bg-linear-to-tr from-cyan-500 to-purple-500 ',
};
const sizeClasses = {
  h1: 'text-3xl font-black md:text-5xl',
  h2: 'text-2xl font-bold md:text-4xl',
  h3: 'text-xl font-semibold md:text-3xl',
};

const AccentTitle = ({
  as: Component = 'h1',
  text = '',
  accentText = '',
  text2 = '',
  color = 'primary',
  description = '',
  className = '',
}: AccentTitleProps) => {
  return (
    <div>
      <Component
        className={cn('text-foreground', sizeClasses[Component], className)}
      >
        {text}{' '}
        <span
          className={cn(colorClasses[color], 'bg-clip-text text-transparent')}
        >
          {accentText}
        </span>{' '}
        {text2}
      </Component>
      {description && (
        <p className='text-muted-foreground mt-2 text-lg leading-relaxed'>
          {description}
        </p>
      )}
    </div>
  );
};

export default AccentTitle;
