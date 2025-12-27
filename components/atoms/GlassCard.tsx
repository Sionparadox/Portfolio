import { cn } from '@/lib/utils';

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
};
const GlassCard = ({ children, className }: GlassCardProps) => {
  return (
    <div
      className={cn(
        'bg-glass-background border-glass-border hover:bg-glass-slate shadow-glass-shadow relative overflow-hidden rounded-3xl border shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-(--glass-shadow-hover)',
        className
      )}
    >
      <div className='pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-white/25 to-transparent opacity-50 mix-blend-soft-light dark:from-white/10 dark:to-transparent' />

      <div>{children}</div>
    </div>
  );
};

export default GlassCard;
