import { IconType } from 'react-icons';
import Link from 'next/link';

interface ExploreCardProps {
  title: string;
  description: string;
  icon: IconType;
  link: string;
}

const ExploreCard = ({
  title,
  description,
  icon: Icon,
  link,
}: ExploreCardProps) => {
  return (
    <Link
      href={link}
      className='group relative isolate block h-full w-full lg:min-h-56 lg:max-w-64'
    >
      <div className='bg-foreground/30 group-hover:bg-primary absolute inset-0 -z-1 border opacity-0 blur-lg transition-colors duration-300 md:opacity-100' />
      <div className='bg-card text-card-foreground relative flex h-full w-full items-center gap-4 rounded-2xl border p-4 sm:flex-col sm:items-center sm:gap-6 sm:p-6'>
        <div className='text-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-lg [&_svg]:h-6 [&_svg]:w-6'>
          <Icon />
        </div>
        <div className='flex flex-col gap-2 sm:items-center sm:text-center'>
          <h3 className='text-foreground text-lg font-bold'>{title}</h3>
          <p className='text-sm'>{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ExploreCard;
