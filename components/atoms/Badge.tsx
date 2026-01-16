import { cn } from '@/lib/utils';

type BadgeProps = {
  label: string;
  className?: string;
  variant?: 'default' | 'inverted';
};

const Badge = ({ label, className, variant = 'default' }: BadgeProps) => {
  const variantClasses = {
    default: 'bg-muted text-foreground',
    inverted: 'bg-foreground text-background border-white dark:border-black',
  };
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        variantClasses[variant],
        className
      )}
    >
      <p>{label}</p>
    </div>
  );
};

export default Badge;
