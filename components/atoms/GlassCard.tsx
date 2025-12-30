import { cn } from '@/lib/utils';

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
};

const GlassCard = ({ children, className }: GlassCardProps) => {
  return (
    <div
      className={cn(
        'bg-glass-background hover:bg-glass-slate shadow-glass-shadow relative overflow-hidden rounded-3xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-(--glass-shadow-hover)',
        className
      )}
    >
      <div
        className='pointer-events-none absolute inset-0 rounded-3xl'
        style={{
          padding: '1px',
          background: `
            conic-gradient(from -45deg at 15% 15%,
              rgba(255, 255, 255, 0.4) 0deg,
              transparent 120deg,
              rgba(255, 255, 255, 0.3) 180deg,
              transparent 240deg,
              rgba(255, 255, 255, 0.4) 360deg)
          `,
          WebkitMask: `
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0)
          `,
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      <div className='pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-white/25 to-transparent to-60% opacity-50 mix-blend-soft-light dark:from-white/20 dark:to-transparent' />

      {children}
    </div>
  );
};

export default GlassCard;
