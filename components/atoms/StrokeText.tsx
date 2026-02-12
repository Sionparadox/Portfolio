const StrokeText = ({ children }: { children: string }) => {
  return (
    <span className='isolate inline-grid'>
      <span
        className='-z-10 col-start-1 row-start-1 font-semibold select-none'
        style={{
          WebkitTextStroke: '3px var(--color-stroke)',
          paintOrder: 'stroke fill',
        }}
        aria-hidden='true'
      >
        {children}
      </span>

      <span className='from-primary to-secondary col-start-1 row-start-1 bg-linear-to-tr bg-clip-text font-semibold text-transparent'>
        {children}
      </span>
    </span>
  );
};

export default StrokeText;
