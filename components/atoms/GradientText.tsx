type GradientTextProps = {
  children: React.ReactNode;
  baseColor?: string;
  gradientColor?: string;
  degree?: number;
  className?: string;
};

const GradientText = ({
  children,
  baseColor = 'var(--color-secondary)',
  gradientColor = 'var(--color-primary)',
  degree = 90,
  className,
}: GradientTextProps) => {
  return (
    <span
      className={className}
      style={{
        background: `linear-gradient(${degree}deg, ${baseColor}, ${gradientColor})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {children}
    </span>
  );
};

export default GradientText;
