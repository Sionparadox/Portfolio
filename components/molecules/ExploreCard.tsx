import { IconType } from 'react-icons';
import Link from 'next/link';
import GlassCard from '../atoms/GlassCard';

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
      className='group relative isolate block lg:min-h-48 lg:max-w-64'
    >
      <GlassCard className='flex h-full w-full gap-2 p-4 sm:flex-col sm:p-6'>
        <div className='text-muted-foreground flex w-fit items-center justify-center rounded-sm bg-white/20 p-3 transition-colors duration-300 group-hover:bg-linear-to-br group-hover:from-purple-600/50 group-hover:to-blue-500/50 group-hover:text-cyan-300 dark:bg-white/5'>
          <Icon className='size-6' />
        </div>
        <div>
          <h3 className='w-fit text-lg font-bold transition-colors duration-300 group-hover:bg-linear-to-r group-hover:from-cyan-500 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent'>
            {title}
          </h3>
          <p className='text-muted-foreground group-hover:text-foreground text-sm leading-relaxed transition-colors duration-300'>
            {description}
          </p>
        </div>
      </GlassCard>
    </Link>
  );
};

export default ExploreCard;
