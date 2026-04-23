import { cn } from '@/lib/utils';

type BadgeProps = {
  label: string;
  className?: string;
  variant?: 'default' | 'inverted' | 'primary';
};

const Badge = ({ label, className, variant = 'default' }: BadgeProps) => {
  const variantClasses = {
    default: 'bg-muted text-foreground',
    inverted: 'bg-foreground text-background border-white dark:border-black',
    primary: 'bg-primary text-primary-foreground',
  };
  return (
    <div
      className={cn(
        'inline-flex cursor-default items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        variantClasses[variant],
        className
      )}
    >
      <p>{label}</p>
    </div>
  );
};

export default Badge;
