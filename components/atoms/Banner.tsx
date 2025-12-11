import { cn } from '@/lib/utils';

type BannerProps = {
  children: React.ReactNode;
  className?: string;
};

const Banner = ({ children, className }: BannerProps) => {
  return (
    <div
      className={cn(
        'relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] w-screen',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Banner;
