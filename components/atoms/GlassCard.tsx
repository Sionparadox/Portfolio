const GlassCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative overflow-hidden rounded-3xl border border-white/35 bg-white/10 p-6 shadow-lg shadow-blue-900/20 backdrop-blur-sm dark:bg-slate-950/10 dark:shadow-slate-950/45'>
      <div className='pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-white/65 to-transparent opacity-50 mix-blend-soft-light dark:from-white/35 dark:to-transparent'></div>

      <div>{children}</div>
    </div>
  );
};
export default GlassCard;
